<script setup lang="ts">
import BaseModal from '@/components/base/BaseModal.vue'
import {ModalName} from '@/models/ModalName'

import {useModalsStore} from '@/stores/modals'
import {NCheckbox} from "naive-ui";
import {ref} from "vue";
import BaseFormInputNumber from "@/components/base/BaseFormInputNumber.vue";
import type {AdditionalServicesInfo} from "@/models/TransferRequest";

const props = defineProps<AdditionalServicesInfo>()

const emit = defineEmits<{'onSubmit': [values: AdditionalServicesInfo]}>()

const boosterSeatCount = ref<number| undefined>(props.boosterSeatCount)
const childSeatCount = ref<number| undefined>(props.childSeatCount)
const infantSeatCount = ref<number| undefined>(props.infantSeatCount)
const dogCarrierCount = ref<number| undefined>(props.dogCarrierCount)
const dogMatCount = ref<number| undefined>(props.dogMatCount)
const ownDogCarrier = ref<boolean>(props.ownDogCarrier)
const personSeatAvailable = ref<boolean>(props.personSeatAvailable)
const onSubmitClick = () => {
  emit('onSubmit', {
    boosterSeatCount: boosterSeatCount.value,
    childSeatCount: childSeatCount.value,
    infantSeatCount: infantSeatCount.value,
    personSeatAvailable: personSeatAvailable.value,
    dogCarrierCount: dogCarrierCount.value,
    dogMatCount: dogMatCount.value,
    ownDogCarrier: ownDogCarrier.value
  })
  close(ModalName.ChildSeats)
}

const { close } = useModalsStore()
</script>

<template>
  <BaseModal
      :name="ModalName.ChildSeats"
      title="Дополнительные услуги"
      submit-button-title="Принять"
      @on-submit-click="onSubmitClick"
  >
    <div class="flex gap-2">
    <BaseFormInputNumber :init-values="boosterSeatCount" @update:value="boosterSeatCount = $event" name="boosterSeatCount" class="w-full" placeholder="Бустеры" />
    <BaseFormInputNumber :init-values="childSeatCount" @update:value="childSeatCount = $event" name="childSeatCount" class="w-full" placeholder="Автокресла" />
    </div>
    <div class="flex gap-2">
    <BaseFormInputNumber :init-values="infantSeatCount" @update:value="infantSeatCount = $event" name="infantSeatCount" class="w-full" placeholder="Автолюльки для младенцев" />
    <NCheckbox v-model:checked="personSeatAvailable" class="flex px-2 w-full flex-row pt-1">Есть свое детское кресло</NCheckbox>
    </div>
    <BaseFormInputNumber :init-values="dogCarrierCount" @update:value="dogCarrierCount = $event" name="dogCarrierCount" class="w-full" placeholder="Переноски для собак" />
    <div class="flex gap-2">
      <BaseFormInputNumber :init-values="dogMatCount" @update:value="dogMatCount = $event" name="dogMatCount" class="w-full" placeholder="Подстилки для собак" />
      <NCheckbox v-model:checked="ownDogCarrier" class="flex px-2 w-full flex-row pt-1">Есть своя переноска для собаки</NCheckbox>
    </div>
  </BaseModal>
</template>
