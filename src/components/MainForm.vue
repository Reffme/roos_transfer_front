<script setup lang="ts">

import {ModalName} from "@/models/ModalName";
import {covenantText, expressInfoText, isImmediateText, withTrailerText} from "@/utils/const/constText";
import type {DeliveryRequest} from "@/models/DeliveryRequest";
import type {AdditionalServicesInfo, TransferRequest} from "@/models/TransferRequest";
import type {ValidationRule} from "@/models/ValidationRule";
import {computed, ref} from "vue";
import type {Car} from "@/models/CarType";
import {useTransferStore} from "@/stores/transfer";
import { Info } from 'lucide-vue-next';
import {useDeliveryStore} from "@/stores/delivery";
import {useModalsStore} from "@/stores/modals";
import {NButton, NCheckbox, NTooltip, useDialog, useMessage} from "naive-ui";
import {RemoteOption} from "@/models/RemoteOption";
import {useForm} from "vee-validate";
import BaseFormTimePicker from "@/components/base/BaseFormTimePicker.vue";
import BaseFormDatePicker from "@/components/base/BaseFormDatePicker.vue";
import FormTabs from "@/components/FormTabs.vue";
import BaseFormInput from "@/components/base/BaseFormInput.vue";
import BaseFormInputNumber from "@/components/base/BaseFormInputNumber.vue";
import ModalChildSeat from "@/components/ModalChildSeat.vue";
import PathInput from "@/components/PathInput.vue";

type ValidationSchema = Record<keyof DeliveryRequest & TransferRequest, ValidationRule>
const currentTab = ref('transfer')
const selectedCar = ref<Car>()
const isImmediate = ref()
const isExpressDelivery = ref()

const boosterSeatCount = ref<number>()
const childSeatCount = ref<number>()
const infantSeatCount = ref<number>()
const personSeatAvailable = ref<boolean>()
const withTrailer = ref<boolean>()
const dogCarrierCount = ref<number>()
const dogMatCount = ref<number>()
const ownDogCarrier = ref<boolean>()
const schema = computed<Partial<ValidationSchema>>(() => ({
  from: {
    required: true
  },
  date: {
    required: !isImmediate.value
  },
  to: {
    required: true
  },
  personCount: {
    required: !(currentTab.value === 'delivery')
  },
  phoneNumber: {
    required: true,
    phoneNumber: true,
  },
  time: {
    required: !isImmediate.value
  },
  comment: {
    required: currentTab.value === 'delivery'
  }
}))



const { createTransferOrder } = useTransferStore()
const { createDeliveryOrder } = useDeliveryStore()
const {open} = useModalsStore()
const dialog = useDialog()
const message = useMessage()

const fromOptions = ref<RemoteOption<Record<string, unknown> | string>[]>([])
const toOptions = ref<RemoteOption<Record<string, unknown> | string>[]>([])

const onSubmitModal = (data: AdditionalServicesInfo) => {
  boosterSeatCount.value = data.boosterSeatCount
  childSeatCount.value = data.childSeatCount
  infantSeatCount.value = data.infantSeatCount
  personSeatAvailable.value = data.personSeatAvailable
  dogCarrierCount.value = data.dogCarrierCount
  dogMatCount.value = data.dogMatCount
  ownDogCarrier.value = data.ownDogCarrier
}

const sendMessage = (type: 1 | 2| 3, text?: string) => {
  const messages: Record<1|2|3, () => void> = {
    1: () => message.error(text || 'Что-то пошло не так'),
    2: () => message.warning(text || 'Выберите транспорт'),
    3: () => message.success(text || 'Успешно оформлено')
  }
  messages[type]()


}

const { handleSubmit } = useForm<DeliveryRequest & TransferRequest>({
  validationSchema: schema
})

const onUpdateImmediateState = (status: boolean) => {
  if (status){
    sendMessage(3, 'Водитель сможет прибыть в течении часа')
  }
}

const onConfirmClickHandler = handleSubmit(
    async (
        values) => {
      const data = {...values, isImmediate: isImmediate.value, isExpressDelivery: isExpressDelivery.value, phoneNumber: values.phoneNumber.length > 12? values.phoneNumber.slice(0,-1): values.phoneNumber}
      dialog.create({
        type: "info",
        content: covenantText,
        positiveText: 'Я соглашаюсь',
        negativeText: 'Я не соглашаюсь',
        onPositiveClick: async () => {
          try {
            if (currentTab.value === 'delivery') {
              await createDeliveryOrder({
                ...data,
                withTrailer: withTrailer.value
              })
            } else {
              if (!selectedCar.value){
                sendMessage(2)
                return
              }
              await createTransferOrder({
                ...data,
                carType: selectedCar.value.type,
                additionalServices: {
                  boosterSeatCount: boosterSeatCount.value,
                  childSeatCount: childSeatCount.value,
                  infantSeatCount: infantSeatCount.value,
                  personSeatAvailable: personSeatAvailable.value,
                  ownDogCarrier: ownDogCarrier.value,
                  dogMatCount: dogMatCount.value,
                  dogCarrierCount: dogCarrierCount.value,
                }
              })
            }
            sendMessage(3)
          } catch(error) {
            const e = error as {status: number}
            sendMessage(1, (e.status === 429 && 'Заявка уже оформлена') as string)
          }
        },
      })
    })
</script>

<template>
  <div class="flex-grow max-md:w-full flex justify-center items-start max-md:px-0">
    <form
        class="w-[750px] max-md:w-full max-md:rounded-none flex flex-col justify-between max-md:h-full h-[820px] max-md:overflow-y-scroll rounded-xl shadow-custom p-6 custom-scrollbar"
        @submit.prevent="onConfirmClickHandler"
    >
      <div class="flex flex-col gap-2 max-md:overflow-y-scroll">
        <FormTabs v-model:selected-car="selectedCar" v-model:çurrent-tab="currentTab"><PathInput v-model:from-option="fromOptions" v-model:to-option="toOptions" /></FormTabs>
        <BaseFormInput
            name="phoneNumber"
            label="Номер телефона"
            mask="+7##########"
            get-unmasked-value
        />
        <div class="flex">
          <div class="flex max-md:hidden w-full">
            <NTooltip trigger="hover">
              <template #trigger>
                <div class="flex w-full">
                   <NCheckbox v-model:checked="isImmediate" @update-checked="onUpdateImmediateState" class="max-md:hidden pl-2 w-full">Как можно скорее</NCheckbox>
                  <Info class="w-1/4"/>
                </div>
              </template>
              <div class="flex w-60">{{isImmediateText}}</div>
            </NTooltip>
          </div>
          <BaseFormDatePicker :disabled="isImmediate" name="date" label="Дата отправки" class="w-full"/>
          <BaseFormTimePicker :disabled="isImmediate" name="time" label="Время отправки" class="w-full" />
        </div>
        <div class="flex max-md:flex-col max-md:items-start max-md:w-full">
          <div class="max-md:flex hidden w-full flex-row">
            <NTooltip trigger="click">
              <template #trigger>
                <div class="flex">
                <NCheckbox v-model:checked="isImmediate" @update-checked="onUpdateImmediateState" class="pl-2 w-[185px] flex-row py-1">Как можно скорее</NCheckbox>
                <Info class="w-1/4"/>
                </div>
              </template>
              <div class="flex w-60">{{isImmediateText}}</div>
            </NTooltip>
          </div>
          <div class="max-md:flex flex-col hidden">
            <NTooltip trigger="click">
            <template #trigger>
              <div class="flex items-center justify-evenly w-full">
                <NCheckbox v-model:checked="isExpressDelivery" class="flex px-2 w-[185px] w flex-row py-1">Экспресс поездка</NCheckbox>
                <Info class="w-1/4"/>
              </div>
            </template>
            <div class="flex w-60">{{expressInfoText}}</div>
          </NTooltip></div>
          <div class="max-md:hidden flex">
            <NTooltip trigger="hover">
              <template #trigger>
                <div class="flex items-center">
                  <NCheckbox v-model:checked="isExpressDelivery" class="flex px-2 w-[205px] flex-row py-1">Экспресс поездка</NCheckbox>
                  <Info class="w-1/4"/>
                </div>
              </template>
              <div class="flex w-60">{{expressInfoText}}</div>
            </NTooltip>
          </div>
          <NButton v-if="currentTab === 'transfer'" type="primary" @click="open(ModalName.ChildSeats)" class="w-2/3 max-md:hidden">Дополнительные услуги</NButton>
        </div>
        <div v-show="currentTab === 'delivery'" class="flex items-center w-full">
          <div class="max-md:flex flex-col hidden"><NTooltip trigger="click">
            <template #trigger>
              <div class="flex items-center justify-evenly w-full">
                <NCheckbox v-model:checked="isExpressDelivery" class="flex px-2 w-[185px] w flex-row py-1">Перевозка груза с прицепом</NCheckbox>
                <Info class="w-1/4"/>
              </div>
            </template>
            <div class="flex w-60">{{withTrailerText}}</div>
          </NTooltip></div>
          <div class="max-md:hidden flex w-full">
          <NTooltip trigger="hover">
            <template #trigger>
              <div class="flex items-center">
                <NCheckbox v-model:checked="withTrailer" class="flex px-2  w-[275px] flex-row py-1">Перевозка груза с прицепом</NCheckbox>
                <Info class="w-1/4"/>
              </div>
            </template>
            <div class="flex w-96">{{withTrailerText}}</div>
          </NTooltip>
          </div>
        </div>
        <div v-show="currentTab === 'transfer'" class="max-md:flex flex-col hidden">
          <BaseFormInputNumber :init-values="boosterSeatCount" @update:value="boosterSeatCount = $event" name="boosterSeatCount" class="w-full" placeholder="Бустеры" />
          <BaseFormInputNumber :init-values="childSeatCount" @update:value="childSeatCount = $event" name="childSeatCount" class="w-full" placeholder="Автокресла" />
          <BaseFormInputNumber :init-values="infantSeatCount" @update:value="infantSeatCount = $event" name="infantSeatCount" class="w-full" placeholder="Автолюльки для младенцев" />
          <NCheckbox v-model:checked="personSeatAvailable" class="flex px-2 w-full flex-row">Есть свое детское кресло</NCheckbox>
          <BaseFormInputNumber :init-values="dogCarrierCount" @update:value="dogCarrierCount = $event" name="dogCarrierCount" class="w-full" placeholder="Переноски для собак" />
          <BaseFormInputNumber :init-values="dogMatCount" @update:value="dogMatCount = $event" name="dogMatCount" class="w-full" placeholder="Подстилки для собак" />
          <NCheckbox v-model:checked="ownDogCarrier" class="flex px-2 w-full flex-row">Есть своя переноска для собаки</NCheckbox>
        </div>
        <BaseFormInput hide-label name="comment" class="mt-4" label="Комментарий" />
      </div>
      <NButton type="success" attr-type="submit" class="w-full bg-[#2C7CB0]" :style="{border: '#2C7CB0'}">Заказать</NButton>
    </form>
    <ModalChildSeat
        :boosterSeatCount="boosterSeatCount"
        :childSeatCount="childSeatCount"
        :infantSeatCount="infantSeatCount"
        :personSeatAvailable="personSeatAvailable"
        :dogCarrierCount="dogCarrierCount"
        :dogMatCount="dogMatCount"
        :ownDogCarrier="ownDogCarrier"
        @onSubmit="onSubmitModal"
    />
  </div>
</template>