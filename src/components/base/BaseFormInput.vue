<script setup lang="ts">
  import { NFormItem, NInput } from 'naive-ui'
  import { useField } from 'vee-validate'
  import { computed, ref, toRef, watch } from 'vue'
  import { FormValidationStatus } from 'naive-ui/es/form/src/interface'

  const props = defineProps<{
    name: string
    label?: string
    rows?: number
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
  <NFormItem :label="label" :validation-status="errorStatus">
    <NInput
      :value="value"
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
