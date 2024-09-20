<script setup lang="ts">
import {type Car, CarType} from "@/models/CarType";
  import { User, Briefcase  } from 'lucide-vue-next';
  import {NImage} from "naive-ui";
import {computed} from "vue";

  const props = defineProps<Car &
      {
        disabled?:boolean
      }>()

const selectedCar = defineModel<Car>('selectedCar')

  const imageMap: Record<CarType, string> = {
    [CarType.Economy]: 'economy.png',
    [CarType.Comfort]: 'comfort.png',
    [CarType.ComfortPlus]: 'comfort.png',
    [CarType.Business]: 'business.png',
    [CarType.Premium]: 'premium.png',
    [CarType.VIP]: 'limousine.png',
    [CarType.SUV]: 'suv.png',
    [CarType.Minivan]: 'van.png',
    [CarType.CompactMinivan]: 'van.png',
    [CarType.Minibus]: 'minibus.png',
    [CarType.Bus]: 'buss.png',
  }


const getImageUrl = (name:string) => {
  return new URL(`../icons/${name}`,`${import.meta.url}`)
}

const onSelect = () => {
    if (selectedCar.value?.type === props.type){
      selectedCar.value = undefined
    }else {
      selectedCar.value = {...props}
    }
}

const cardClass = computed(() => {

  let resultClass = ''
  if (!props.disabled){
    resultClass += 'cursor-pointer'
  }
  else {
    resultClass += 'opacity-[45%]'
  }
  if (selectedCar.value?.type === props.type){
    resultClass += ' animate-pulse'
  }
  return  resultClass
})
</script>

<template>
  <div class="h-12 w-[28%] max-md:h-24 min-w-[128px]">
    <div @click="onSelect"
         :class="cardClass"
         :style="{borderColor: (selectedCar?.type === type)? '#000000':'#e0e0e0'}"
         class="px-1 py-2 h-12 transition-all max-md:gap-1 bg-[#FFFFFF] max-md:h-24 max-md:items-center border-2 flex max-md:justify-center max-sm:flex-col rounded-xl w-full"
    >
      <p class="pl-2 hidden max-sm:flex">{{ type }}</p>
      <NImage class="max-sm:w-[54%] max-md:w-[45%] w-1/2" preview-disabled :src="getImageUrl(imageMap[type])"/>
      <div class="flex py-2 justify-center max-md:gap-1 flex-col">
        <p class="pl-2 flex max-sm:hidden">{{ type }}</p>
        <div class="flex gap-2.5 flex-row">
          <div class="flex gap-1 items-center"><User :size="19"/> {{ passenger }}</div>
          <div class="flex gap-1 items-center"><Briefcase :size="19"/> {{ baggage }}</div>
        </div>
      </div>
    </div>
  </div>
</template>