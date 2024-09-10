<script setup lang="ts">
import BaseFormInput from '@/components/base/BaseFormInput.vue'
import {NButton, NTabPane, NTabs} from 'naive-ui'
import CarCard from '@/components/CarCard.vue'
import { carsOptions } from '@/utils/const/constOptions'
import BaseFormDatePicker from '@/components/base/BaseFormDatePicker.vue'
import PathInput from '@/components/PathInput.vue'
import BaseFormInputNumber from '@/components/base/BaseFormInputNumber.vue'
import { useForm } from 'vee-validate'
import type { ValidationRule } from '@/models/ValidationRule'
import type { DeliveryRequest } from '@/models/DeliveryRequest'
import type { TransferRequest } from '@/models/TransferRequest'
import {computed, ref} from 'vue'
import type { Car } from '@/models/CarType'
import {useTransferStore} from "@/stores/transfer";
import {useDeliveryStore} from "@/stores/delivery";
import FormTabs from "@/components/FormTabs.vue";
import {RemoteOption} from "@/models/RemoteOption";
import BaseFormTimePicker from "@/components/base/BaseFormTimePicker.vue";

type ValidationSchema = Record<keyof DeliveryRequest & TransferRequest, ValidationRule>
const currentTab = ref('transfer')
    const schema = computed<Partial<ValidationSchema>>(() => ({
  from: {
    required: true
  },
  date: {
    required: true
  },
  to: {
    required: true
  },
  personCount: {
    required: true
  },
  phoneNumber: {
    required: true,
    phoneNumber: true,
  },
  time: {
    required: true
  },
  comment: {
    required: currentTab.value === 'delivery'
  }
}))

const { createTransferOrder } = useTransferStore()
const { createDeliveryOrder } = useDeliveryStore()

const fromOptions = ref<RemoteOption<Record<string, unknown> | string>[]>([])
const toOptions = ref<RemoteOption<Record<string, unknown> | string>[]>([])

const { handleSubmit } = useForm<DeliveryRequest & TransferRequest>({
  validationSchema: schema
})

const onConfirmClickHandler = handleSubmit(
    async (
        values) => {
      if (currentTab.value === 'delivery') {
        await createDeliveryOrder(values)
      } else {
        await createTransferOrder(values)
      }
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
        class="w-[750px] flex flex-col justify-between h-[800px] pt-4 max-md:overflow-y-scroll rounded-xl shadow-custom p-6 custom-scrollbar"
        @submit.prevent="onConfirmClickHandler"
      >
        <div>
          <FormTabs v-model:çurrent-tab="currentTab"><PathInput v-model:from-option="fromOptions" v-model:to-option="toOptions" /></FormTabs>
        <BaseFormInput hide-label name="comment" label="Комментарий" />
          <BaseFormInput
              name="phoneNumber"
              label="Номер телефона"
              mask="+7##########"
              get-unmasked-value
          />
        <div class="flex"><BaseFormDatePicker name="date" label="Дата отправки" class="w-2/3"/><BaseFormTimePicker name="time" label="Дата отправки" class="w-1/3" /></div>
        </div>
        <NButton type="success" attr-type="submit" class="w-full">Заказать</NButton>
      </form>
    </main>
  </div>
</template>