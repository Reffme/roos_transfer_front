<script setup lang="ts">
  import { useVModels } from '@vueuse/core'
  import { useDadataStore } from '@/stores/dadata'
  import BaseRemoteSelect from '@/components/base/BaseRemoteSelect.vue'
  import {RemoteOption} from "@/models/RemoteOption";

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

  const options = defineModel<RemoteOption<Record<string, unknown> | string>[]>('options')

  const searchHandler = async (query?: string) => {
    options.value = (await getAddressSuggestions(query)).map((item) => ({
      label: item.value,
      value: item.value,
    }))
    return options.value
  }

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
    :name="name"
    hide-label
    :label
    :input-options="options"
    :search-handler="searchHandler"
    @update:value="onUpdateHandler"
  />
</template>
