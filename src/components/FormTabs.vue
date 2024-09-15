<script setup lang="ts">

import {carsOptions} from "@/utils/const/constOptions";
import BaseFormInputNumber from "@/components/base/BaseFormInputNumber.vue";
import CarCard from "@/components/CarCard.vue";
import {ref} from "vue";
import type {Car} from "@/models/CarType";
import {NTabPane, NTabs} from "naive-ui";
import BaseFormInput from "@/components/base/BaseFormInput.vue";

const selectedCar = defineModel<Car>('selectedCar')
const personCount = ref(0)
const currentTab = defineModel('çurrentTab')
const onUpdatePersonCount = (value: number) => {
  personCount.value = value
  if (value > (selectedCar.value?.passenger || 0)) {
    selectedCar.value = undefined
  }
}
</script>

<template>
  <NTabs v-model:value="currentTab" class="custom-tabs" type="segment" animated>
    <NTabPane display-directive="if" name="transfer" tab="ПОЕЗДКА">
      <div class="py-2">
      <slot/>
        <div class="flex max-md:flex-col">
        <BaseFormInput hide-label class="w-full" name="tableName" label="Имя для таблички (необязательно)" />
      <BaseFormInputNumber
          name="personCount"
          class="w-full"
          :max="50"
          placeholder="Количество пассажиров"
          @update:value="onUpdatePersonCount"
      />
        </div>
      <div class="flex flex-wrap gap-2 justify-center">
        <CarCard
            v-for="car in carsOptions"
            v-model:selected-car="selectedCar"
            :key="car.type"
            v-bind="car"
            :disabled="car.passenger < personCount"
        />
      </div>
      </div>
    </NTabPane>
    <NTabPane display-directive="if" name="delivery" tab="ДОСТАВКА">
      <div class="py-2">
      <slot/>
      </div>
    </NTabPane>
  </NTabs>
</template>
