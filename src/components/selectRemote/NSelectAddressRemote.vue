<script setup lang="ts">
  import { useVModels } from '@vueuse/core'
  import { useDadataStore } from '@/stores/dadata'
  import BaseRemoteSelect from '@/components/base/BaseRemoteSelect.vue'

  const props = defineProps<{
    address?: string
    name: string
    withoutFormItem?: boolean
    hideLabel?:boolean
    label?: string
  }>()

  const emit = defineEmits<{
    'update:modelValue': [value: {value: string, data: object}]
  }>()

  const searchHandler = async (query?: string) =>
      (await getAddressSuggestions(query)).map((item) =>({
        label: item.value,
        value: item
      }))

  const onUpdateHandler = (data:  {value: string, data: object}) => {

    if (address?.value !== undefined && data.value) {
      address.value = data.value
    }
  }

  const { address } = useVModels(props, emit)
  const { getAddressSuggestions } = useDadataStore()
</script>

<template>
  <BaseRemoteSelect
      hide-label
    :name="name"
    :label :without-form-item="withoutFormItem"
    :search-handler="searchHandler"
    @update:value="onUpdateHandler"
  />
</template>
