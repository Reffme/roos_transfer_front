<script setup lang="ts">
import {
  NButton,
  NIcon,
  NLayout,
  NLayoutContent, NLayoutHeader,
} from 'naive-ui'
import IconLogo from '@/assets/logo.svg?component'
import VKIcon from '@/assets/vk.svg?component'
import { Phone } from 'lucide-vue-next';
import TGIcon from '@/assets/tg.svg?component'
import WSIcon from '@/assets/ws.svg?component'
  import { CSSProperties } from 'vue'
  const layoutContentStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
  } as CSSProperties

</script>

<template>
  <NLayout class="h-full w-full" :content-style="layoutContentStyle">
    <NLayoutHeader :bordered="true">
      <header class="w-full h-24 gap-4 px-8 flex items-center justify-between">
        <div class="w-1/3 flex items-center gap-4">
          <NIcon :size="70" ><IconLogo/></NIcon>
        </div>
        <div class="flex flex-col items-center">
        <h1 class="text-3xl flex  items-center justify-center min-w-[200px] font-bold w-full">RooS Transfer</h1>
        <p ><a class="flex items-center text-[#2C7CB0] gap-1" href="tel:88007002188"><NIcon><Phone :strokeWidth="2.1" /></NIcon>8 800 700 21 88</a></p>
        </div>
        <div class="w-1/3 max-md:items-end justify-center items-end flex-col flex py-2">
          <NButton text><a href="https://vk.com/id101765329"><NIcon :size="28"><VKIcon/></NIcon></a></NButton>
          <NButton text><a href="https://t.me/+SnU16Q1Td64xYmE6"><NIcon :size="28"><TGIcon/></NIcon></a></NButton>
          <NButton class="pr-0.5" text><a href="https://wa.me/message/V34EXZ6PYRAAK1"><NIcon color="#00e577" :size="24"><WSIcon/></NIcon></a></NButton>
        </div>
      </header>
    </NLayoutHeader>
    <NLayout>
      <NLayoutContent
        class="flex flex-col"
        :content-style="{ display: 'flex' }"
      >
        <div class="flex w-full flex-col">
        <div
          class="flex flex-col overflow-y-auto w-full h-full bg-appLayoutDefaultBackground-light overflow-x-hidden"
        >
          <router-view></router-view>
        </div>
        </div>
      </NLayoutContent>
    </NLayout>
  </NLayout>
</template>
