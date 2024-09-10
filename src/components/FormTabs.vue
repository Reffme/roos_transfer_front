<script setup lang="ts">

import {carsOptions} from "@/utils/const/constOptions";
import BaseFormInputNumber from "@/components/base/BaseFormInputNumber.vue";
import CarCard from "@/components/CarCard.vue";
import {ref} from "vue";
import type {Car} from "@/models/CarType";
import {NTabPane, NTabs} from "naive-ui";

const selectedCar = ref<Car>()
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
      <BaseFormInputNumber
          name="personCount"
          placeholder="Количество пассажиров"
          @update:value="onUpdatePersonCount"
      />
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
