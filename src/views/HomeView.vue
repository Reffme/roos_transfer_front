<script setup lang="ts">
import BaseFormInput from '@/components/base/BaseFormInput.vue'
import { NTabPane, NTabs } from 'naive-ui'
import CarCard from '@/components/CarCard.vue'
import { carsOptions } from '@/utils/const/constOptions'
import BaseFormDatePicker from '@/components/base/BaseFormDatePicker.vue'
import PathInput from '@/components/PathInput.vue'
import BaseFormInputNumber from '@/components/base/BaseFormInputNumber.vue'
import { useForm } from 'vee-validate'
import type { ValidationRule } from '@/models/ValidationRule'
import type { DeliveryRequest } from '@/models/DeliveryRequest'
import type { TransferRequest } from '@/models/TransferRequest'
import { ref } from 'vue'
import type { Car } from '@/models/CarType'

type ValidationSchema = Record<keyof DeliveryRequest & TransferRequest, ValidationRule>
const schema: Partial<ValidationSchema> = {
  date: {
    required: true
  },
  from: {
    required: true
  },
  to: {
    required: true
  }
}

const selectedCar = ref<Car>()

const onUpdatePersonCount = (value: number) => {
  if (value > (selectedCar.value?.passenger || 0)) {
    selectedCar.value = undefined
  }
}

const { handleSubmit, values } = useForm<DeliveryRequest & TransferRequest>({
  validationSchema: schema
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
        class="w-[750px] h-[800px] pt-4 overflow-y-scroll rounded-xl shadow-custom p-6 custom-scrollbar"
        @submit.prevent="handleSubmit"
      >
        <NTabs class="custom-tabs" type="segment" animated>
          <NTabPane display-directive="show" name="oasis" tab="ПОЕЗДКА">
            <PathInput />
            <BaseFormInputNumber
              name="personCount"
              placeholder="Количество пассажиров"
              @update:value="onUpdatePersonCount"
            />
            <div class="flex flex-wrap gap-4 px-4">
              <CarCard
                v-for="car in carsOptions"
                v-model:selected-car="selectedCar"
                :key="car.type"
                v-bind="car"
                :disabled="car.passenger < values.personCount"
              />
            </div>
          </NTabPane>
          <NTabPane display-directive="show" name="jay chou" tab="ДОСТАВКА">
            <PathInput />
          </NTabPane>
        </NTabs>
        <BaseFormInput hide-label name="comment" label="Комментарий" />
        <BaseFormInput hide-label name="phoneNumber" label="Номер телефона" />
        <BaseFormDatePicker name="date" label="Дата отправки" />
      </form>
    </main>
  </div>
</template>

<style scoped>

</style>