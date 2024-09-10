<script setup lang="ts">
import {NFormItem, NTimePicker} from 'naive-ui'
import { useField } from 'vee-validate'
import { computed, ref } from 'vue'
import { FormValidationStatus } from 'naive-ui/es/form/src/interface'

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


const validationStatus = computed<FormValidationStatus | undefined>(() =>
    firstErrorMsg.value ? 'error' : undefined,
)

const handleConfirm = () => {
  firstValue.value = formattedValue.value
}

</script>

<template>
  <NFormItem class="px-2" :validation-status="validationStatus">
    <NTimePicker
        v-model:formatted-value="formattedValue"
        class="w-full"
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
