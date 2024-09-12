<script setup lang="ts">
import { useField } from 'vee-validate'
import { computed, toRef } from 'vue'
import { NFormItem, NInputNumber } from 'naive-ui'
import { FormValidationStatus } from 'naive-ui/es/form/src/interface'

const props = defineProps<{
  name: string
  placeholder?: string
  disabled?: boolean
  min?: number
  initValues?: number
  max?: number
}>()

const emit = defineEmits<{
  'update:value': [value: number | undefined]
}>()


const { value, errorMessage, handleChange } = useField<
    number | undefined
>(toRef(props, 'name'), undefined, {
  label: ' ',
  initialValue: props.initValues
})

const errorStatus = computed<FormValidationStatus | undefined>(() => {
  if (errorMessage.value) {
    return 'error'
  }
  return undefined
})

const handleUpdateInput = (inputData: number | null) => {
  if (!inputData && inputData !== 0) {
    handleChange(undefined)
  } else {
    handleChange(inputData)
  }
  emit('update:value', value.value)
}

value.value && (value.value = Number(value.value))
</script>

<template>
  <NFormItem class="px-2"  :validation-status="errorStatus">
    <NInputNumber
        :value="
        typeof value !== 'undefined' && typeof value !== 'object'
          ? Number(value)
          : null
      "
        class="w-full"
        :placeholder="placeholder"
        :disabled="disabled"
        :min="0"
        :max="max"
        clearable
        @update:value="handleUpdateInput"
    />
    <template #feedback>
      {{ errorMessage }}
    </template>
  </NFormItem>
</template>
