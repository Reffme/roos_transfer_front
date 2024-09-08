<script setup lang="ts" generic="T">
  import { NFormItem, NSelect } from 'naive-ui'
  import { useDebounceFn } from '@vueuse/core'
  import { onMounted, ref, toRef, watch } from 'vue'
  import { RemoteOption } from '@/models/RemoteOption'
  import { useField } from 'vee-validate'
  import { isEqual } from 'radash'

  type PropsSearchHandler = (
    query?: string,
  ) => Promise<RemoteOption<Record<string, unknown> | string>[]>

  const props = defineProps<{
    initValue?: T
    name: string
    label?: string
    placeholder?: string
    disabled?: boolean
    searchHandler: PropsSearchHandler
    valueField?: string
    lateInit?: boolean
    searchDependency?: unknown
    uncontrolled?: boolean
    multiple?: boolean
  }>()

  const emit = defineEmits<{
    'update:value': [value: string | null | T | string[]]
    'update:global-value': [value: T]
  }>()
  const optionsFind = ref(false)
  const handleSearch = useDebounceFn(async (query?: string) => {
    if (isLoading.value) return
    isLoading.value = true
    let response: RemoteOption<Record<string, unknown> | string>[] = []
    try {
      response = await props.searchHandler(query)
      optionsFind.value = true
    } catch (e) {
      response = []
    }
    options.value = response
    isLoading.value = false
  }, 400)

  const fallbackOption = (value: unknown) => {
    let fullOption
    if (props.valueField) {
      fullOption = options.value.find(
        (option) =>
          typeof option.value === 'object' &&
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          option.value[props.valueField] === value,
      )
    }
    if (fullOption) return { ...fullOption }

    const label = options.value.find((option) => isEqual(option.value, value))
    return {
      label: label && label.label,
      value: value,
    }
  }

  // TODO: Плохо работает если valueField это array, нужно потыкать и пофиксить
  const handleUpdate = (
    optionValue: (typeof options.value)[number] | typeof options.value,
  ) => {
    const setNewValue = () => {
      if (props.multiple) {
        const manyValue = optionValue as typeof options.value
        // TODO: одни и те же значения можно выбирать несколько раз, надо пофиксить
        const result = manyValue.map((value) => {
          if (typeof value === 'string') {
            return value
          }
          return value[
            props.valueField as keyof (typeof options.value)[number]
          ] as string
        })
        return [...new Set(result)]
      } else {
        const onceValue = optionValue as (typeof options.value)[number]
        return onceValue[
          props.valueField as keyof (typeof options.value)[number]
        ] as string
      }
    }
    value.value = props.valueField ? setNewValue() : (optionValue as T)
    emit('update:global-value', optionValue as T)
  }

  const options = ref<RemoteOption<Record<string, unknown> | string>[]>([])
  const isLoading = ref(false)

  // Получаем начальные значения для select
  if (!props.lateInit) {
    handleSearch()
  }

  watch(
    () => props.searchDependency,
    (newValue, oldValue) => {
      if (newValue === undefined) return

      // Если новое значение зависимости null (дефолтное от vee-validate),
      // то сбрасываем опции
      if (newValue === null) {
        options.value = []
      }

      // Если новое значение есть, то ищем новые зависимые
      if (newValue) {
        handleSearch()
      }

      // Если старого значения не было, то и сбрасывать нечего, иначе меняем в обоих случаях
      if (oldValue) {
        value.value = null
        emit('update:value', null)
      }
    },
  )

  const { value, errorMessage } = useField<T | string | string[] | null>(
    toRef(props, 'name'),
    undefined,
    {
      label: ' ',
      controlled: !props.uncontrolled,
      initialValue: props.initValue ? props.initValue : undefined,
    },
  )

  // селект не будет кидать emit на начальное значение от vee-validate
  // поэтому кидаю его вручную
  watch(value, (value) => {
    emit('update:value', value)
  })

  //TODO: Фикс для того чтобы fallBackOptions корректно отрабатывал не уверен что это не приведёт к неожиданных ошибкам
  onMounted(async () => {
    await handleSearch()
  })
</script>

<template>
  <NFormItem
    :label="label"
    :validation-status="errorMessage ? 'error' : undefined"
    :show-feedback="!!label"
  >
    <NSelect
      v-if="optionsFind"
      v-model:value="value"
      clearable
      :options="options"
      :loading="isLoading"
      :render-option="renderOption"
      :fallback-option="fallbackOption"
      filterable
      remote
      :placeholder="placeholder || label"
      :disabled="disabled"
      :multiple="multiple"
      @search="handleSearch"
      @update:value="handleUpdate"
    />
    <NSelect
      v-else
      remote
      :loading="isLoading"
      disabled
      @search="handleSearch"
    />
    <template #feedback>
      {{ errorMessage }}
    </template>
  </NFormItem>
</template>
