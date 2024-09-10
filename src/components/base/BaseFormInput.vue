<script setup lang="ts">
  import { NFormItem, NInput } from 'naive-ui'
  import { useField } from 'vee-validate'
  import { Mask } from 'maska'
  import { computed, toRef, watch } from 'vue'
  import { FormValidationStatus } from 'naive-ui/es/form/src/interface'

  const props = defineProps<{
    name: string
    label?: string
    hideLabel?: boolean
    rows?: number
    mask?: string
    disabled?: boolean
    loading?: boolean
    clearable?: boolean
  }>()

  const emit = defineEmits<{
    'update:value': [value: string]
  }>()

  const { value, errorMessage, handleChange } = useField<string>(
    toRef(props, 'name'),
    undefined,
    {
      label: ' ',
    },
  )

  const mask = new Mask({ mask: props.mask })


  const handleUpdateInput = (inputData?: string) => {
    if (!inputData) {
      handleChange(undefined)
      return
    }

    handleChange(inputData)
  }

  const errorStatus = computed<FormValidationStatus | undefined>(() => {
    if (errorMessage.value) {
      return 'error'
    }
    return undefined
  })

  watch(value, (newValue: string) => {
    handleUpdateInput(newValue)
    emit('update:value', newValue)
  })
</script>

<template>
  <NFormItem class="px-2" :validation-status="errorStatus">
    <NInput
      :value="(mask && value) ? mask.masked(value): value"
      :clearable="clearable"
      :placeholder="label"
      :disabled="disabled"
      :loading="loading"
      @update:value="handleUpdateInput"
    >
      <template #suffix>
        <slot name="suffix" />
      </template>
    </NInput>
    <template #feedback>
      {{ errorMessage }}
    </template>
  </NFormItem>
</template>
