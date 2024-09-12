<script setup lang="ts">
import BaseFormInput from '@/components/base/BaseFormInput.vue'
import {NButton, NCheckbox, NTooltip, useDialog, useMessage} from 'naive-ui'
import BaseFormDatePicker from '@/components/base/BaseFormDatePicker.vue'
import PathInput from '@/components/PathInput.vue'
import {useForm} from 'vee-validate'
import type {ValidationRule} from '@/models/ValidationRule'
import type {DeliveryRequest} from '@/models/DeliveryRequest'
import type {ChildSeatInfo, TransferRequest} from '@/models/TransferRequest'
import {computed, ref} from 'vue'
import type {Car} from '@/models/CarType'
import { Info } from 'lucide-vue-next';
import {useTransferStore} from "@/stores/transfer";
import {useDeliveryStore} from "@/stores/delivery";
import FormTabs from "@/components/FormTabs.vue";
import {RemoteOption} from "@/models/RemoteOption";
import BaseFormTimePicker from "@/components/base/BaseFormTimePicker.vue";
import ModalChildSeat from "@/components/ModalChildSeat.vue";
import {useModalsStore} from "@/stores/modals";
import {ModalName} from "@/models/ModalName";
import BaseFormInputNumber from "@/components/base/BaseFormInputNumber.vue";
import {covenantText, expressInfoText} from "@/utils/const/constText";

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

const onSubmitModal = (data: ChildSeatInfo) => {
  boosterSeatCount.value = data.boosterSeatCount
  childSeatCount.value = data.childSeatCount
  infantSeatCount.value = data.infantSeatCount
  personSeatAvailable.value = data.personSeatAvailable
}

const sendMessage = (type: 1 | 2| 3) => {
  const messages: Record<1|2|3, () => void> = {
    1: () => message.error('Вы уже оформили заявку'),
    2: () => message.warning('Выберите транспорт'),
    3: () => message.success('Успешно оформлено')
  }
  messages[type]()


}

const { handleSubmit } = useForm<DeliveryRequest & TransferRequest>({
  validationSchema: schema
})

const onConfirmClickHandler = handleSubmit(
    async (
        values) => {
      const data = {...values, isImmediate: isImmediate.value, isExpressDelivery: isExpressDelivery.value}
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
                childSeats: {
                  boosterSeatCount: boosterSeatCount.value,
                  childSeatCount: childSeatCount.value,
                  infantSeatCount: infantSeatCount.value,
                  personSeatAvailable: personSeatAvailable.value,
                }
              })
            }
            sendMessage(3)
          } catch {
            sendMessage(1)
      }
          },
        })
    })


</script>

<template>
  <div class="flex flex-col w-full h-screen">
    <header class="w-full h-20 flex items-center justify-center">
      <h1 class="text-3xl font-bold">RooS Transfer</h1>
    </header>


    <!-- Контейнер формы, выровненный по центру -->
    <main class="flex-grow flex justify-center items-center p-4">
      <form
        class="w-[750px] flex flex-col justify-between max-md:h-full h-[800px] pt-4 max-md:overflow-y-scroll rounded-xl shadow-custom p-6 custom-scrollbar"
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
            <NCheckbox v-model:checked="isImmediate" class="max-md:hidden px-2 w-2/3 py-1">Как можно скорее</NCheckbox>
            <BaseFormDatePicker name="date" label="Дата отправки" class="w-full"/>
            <BaseFormTimePicker name="time" label="Время отправки" class="w-full" />
          </div>
          <div class="flex max-md:flex-col max-md:items-start max-md:w-full">
            <NCheckbox v-model:checked="isImmediate" class="max-md:flex px-2 hidden w-full flex-row py-1">Как можно скорее</NCheckbox>
             <div class="max-md:flex flex-col hidden"><NTooltip trigger="click">
              <template #trigger>
                <div class="flex items-center justify-evenly w-full">
                  <NCheckbox v-model:checked="isExpressDelivery" class="flex px-2 w-[185px] w flex-row py-1">Экспресс поездка</NCheckbox>
                  <Info class="w-1/4"/>
                </div>
              </template>
              <div class="flex w-60">{{expressInfoText}}</div>
            </NTooltip></div>
            <div class="max-md:hidden flex w-full">
            <NTooltip trigger="hover">
              <template #trigger>
                <div class="flex items-center w-full">
                  <NCheckbox v-model:checked="isExpressDelivery" class="flex px-2 w-[165px] flex-row py-1">Экспресс поездка</NCheckbox>
                  <Info class="w-1/4"/>
                </div>
              </template>
              <div class="flex w-96">{{expressInfoText}}</div>
            </NTooltip>
            </div>
            <NButton v-if="currentTab === 'transfer'" type="success" @click="open(ModalName.ChildSeats)" class="w-2/3 max-md:hidden">Добавить детские кресла</NButton>
          </div>
          <NCheckbox v-show="currentTab === 'delivery'" v-model:checked="withTrailer" class="flex px-2 w-full flex-row py-1">Перевозка груза с прицепом</NCheckbox>
          <div v-show="currentTab === 'transfer'" class="max-md:flex flex-col hidden">
            <BaseFormInputNumber :init-values="boosterSeatCount" @update:value="boosterSeatCount = $event" name="boosterSeatCount" class="w-full" placeholder="Бустеры" />
            <BaseFormInputNumber :init-values="childSeatCount" @update:value="childSeatCount = $event" name="childSeatCount" class="w-full" placeholder="Автокресла" />
            <BaseFormInputNumber :init-values="infantSeatCount" @update:value="infantSeatCount = $event" name="infantSeatCount" class="w-full" placeholder="Автолюльки для младенцев" />
              <NCheckbox v-model:checked="personSeatAvailable" class="flex px-2 w-full flex-row">Есть свое детское кресло</NCheckbox>
          </div>
          <BaseFormInput hide-label name="comment" label="Комментарий" />
        </div>
        <NButton type="success" attr-type="submit" class="w-full">Заказать</NButton>
      </form>
      <ModalChildSeat
          :boosterSeatCount="boosterSeatCount"
          :childSeatCount="childSeatCount"
          :infantSeatCount="infantSeatCount"
          :personSeatAvailable="personSeatAvailable"
          @onSubmit="onSubmitModal"
      />
    </main>
  </div>
</template>