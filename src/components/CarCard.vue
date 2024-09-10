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
  return new URL(`../assets/${name}`,`${import.meta.url}`)
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
  if (selectedCar.value?.type === props.type){
    resultClass += ' animate-pulse'
  }
  return  resultClass
})

</script>

<template>
  <div class="h-16 w-[31%]">
    <div @click="onSelect"
         :class="cardClass"
         :style="{borderColor: (selectedCar?.type === type)? '#000000':'#e0e0e0'}"
         class="px-1 py-2 h-16  bg-[#FFFFFF] border-2 flex rounded-xl w-full"
    >
      <NImage preview-disabled :src="getImageUrl(imageMap[type])"/>
      <div class="flex justify-center gap-1 flex-col">
        <p class="pl-2">{{ type }}</p>
        <div class="flex gap-2.5 flex-row">
          <div class="flex gap-1 items-center"><User/> {{ passenger }}</div>
          <div class="flex gap-1 items-center"><Briefcase/> {{ baggage }}</div>
        </div>
      </div>
    </div>
    <div v-show="disabled" class="h-16 relative top-[-64px] rounded-xl bg-[#605D5D54]"/>
  </div>
</template>