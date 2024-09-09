<script setup lang="ts">
import { NDatePicker, NFormItem } from 'naive-ui'
import { useField } from 'vee-validate'
import { computed, ref } from 'vue'
import dayjs from 'dayjs'
import { isArray } from 'radash'
import { FormValidationStatus } from 'naive-ui/es/form/src/interface'
import { watchOnce } from '@vueuse/core'

const props = defineProps<{
  name: string
  label?: string
  placeholder?: string
  clearable?: boolean
  disabled?: boolean
}>()

const { value: firstValue, errorMessage: firstErrorMsg } = useField<
    string | undefined
>(props.name, undefined, {
  label: ' ',
})
const formattedValue = ref<string>()


const initializeValue = () => {
  const dateFormat = 'DD.MM.YYYY'
  if (!firstValue.value) {
    formattedValue.value = undefined
    return
  }
  const first = dayjs(firstValue.value).format(dateFormat)
  if (!isArray(props.name)) {
    formattedValue.value = first
  }
}
const validationStatus = computed<FormValidationStatus | undefined>(() =>
    firstErrorMsg.value ? 'error' : undefined,
)

const handleConfirm = (
    newValue: number,
    newFormattedValue: string,
) => {
  formattedValue.value = newFormattedValue

    firstValue.value = dayjs(newValue).toISOString()
}

watchOnce(firstValue, () => {
  initializeValue()
})
initializeValue()
</script>

<template>
  <NFormItem class="px-2" :validation-status="validationStatus">
    <NDatePicker
        v-model:formatted-value="formattedValue"
        value-format="dd.MM.yyyy"
        class="w-full"
        type="date"
        :disabled="disabled"
        :placeholder="placeholder || label"
        :on-confirm="handleConfirm"
        :clearable="clearable"
        @update-value="handleConfirm"
    />
    <template #feedback>
      {{ firstErrorMsg }}
    </template>
  </NFormItem>
</template>
