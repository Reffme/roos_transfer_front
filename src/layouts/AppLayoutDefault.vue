<script setup lang="ts">
import {
  NButton,
  NIcon,
  NLayout,
  NLayoutContent, NLayoutFooter, NLayoutHeader,
} from 'naive-ui'
import IconLogo from '@/assets/logo.svg?component'
import VKIcon from '@/assets/vk.svg?component'
import { Phone } from 'lucide-vue-next';
import TGIcon from '@/assets/tg.svg?component'
  import { CSSProperties } from 'vue'
import router from "@/router";
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
          <div class="flex max-md:hidden flex-col">
            <p ><a class="flex items-center text-[#2C7CB0]" href="tel:1234567890"><NIcon><Phone /></NIcon>+7 903 903 15 23</a></p>
            <p><a class="flex items-center text-[#2C7CB0]" href="tel:1234567890"><NIcon><Phone /></NIcon>+7 991 435 77 07</a></p>
            <p><a class="flex items-center text-[#2C7CB0]" href="tel:1234567890"><NIcon><Phone /></NIcon>+7 923 442 78 24</a></p>
          </div>
        </div>
        <h1 class="text-3xl flex  items-center justify-center min-w-[225px] font-bold w-full">RooS Transfer</h1>
        <div class="w-1/3 max-md:items-start justify-center items-end gap-2 flex-col flex">
          <NButton text><a href="https://vk.com/id101765329"><NIcon :size="32"><VKIcon/></NIcon></a></NButton>
          <NButton text><a href="https://t.me/+SnU16Q1Td64xYmE6"><NIcon :size="32"><TGIcon/></NIcon></a></NButton>
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
        <div class="max-md:flex items-center justify-center gap-2 p-2 hidden flex-wrap">
          <p class="w-[150px]"><a class="flex items-center text-[#2C7CB0]" href="tel:1234567890"><NIcon><Phone /></NIcon>+7 903 903 15 23</a></p>
          <p class="w-[150px]"><a class="flex items-center text-[#2C7CB0]" href="tel:1234567890"><NIcon><Phone /></NIcon>+7 991 435 77 07</a></p>
          <p class="w-[150px]"><a class="flex items-center text-[#2C7CB0]" href="tel:1234567890"><NIcon><Phone /></NIcon>+7 923 442 78 24</a></p>
        </div>
        </div>
      </NLayoutContent>
    </NLayout>
  </NLayout>
</template>
