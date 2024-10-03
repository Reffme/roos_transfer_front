<script setup lang="ts">





import MainForm from "@/components/MainForm.vue";
import {NCard} from "naive-ui";
import { useHead } from '@vueuse/head'

const description ='RooS Transfer — транспортная компания, предлагающая пассажирские перевозки и доставку грузов по всей территории Российской Федерации. Комфортабельные поездки в аэропорты, междугородние маршруты и поездки с детьми. Чистый автопарк, профессиональные водители с лицензиями и гарантией безопасности. Забронируйте комфортный трансфер быстро и легко.'
const keywords =' roos transfer, рус трансфер, трансфер, пассажирские перевозки, доставка грузов, аэропорт, поездки по городу, междугородние поездки, автопарк, комфортные поездки, аренда авто с водителем, транспортные услуги, заказ трансфера, бронирование автомобиля, доставка в РФ, поездки с детьми, безопасные поездки, профессиональные водители'

useHead({
  title: 'Roos Transfer',
  meta: [
    { name: 'description', content: description },
    { name: 'keywords', content: keywords },
    { key: 'og-title', property: 'og:title', content: 'Roos Transfer' },
    { key: 'og-type', property: 'og:type', content: 'website' },
    { key: 'og-description', property: 'og:description', content: description },
  ],
});
</script>

<template>
  <div class="flex flex-col w-full ">
    <div class="flex h-full max-md:flex-col flex-row">
      <div class="w-[50%] max-md:hidden overflow-hidden bg-[red] h-[calc(100vh-97px)] pl-6 rounded-r-2xl flex flex-col items-center  skew-x-[-12deg] ml-[-7vw] mr-[2%]">
        <h1 class="text-6xl h-40 w-[850px] pr-[605px] items-center flex justify-center skew-x-12 text-[white]">О нас</h1>
        <NCard class="skew-x-12 w-[calc(40%+300px)] bg-[#282828D7] text-[white] flex flex-col">
          <div class="text-2xl mb-[20px]">Мы — транспортная компания, специализирующаяся на пассажирских перевозках и доставке грузов, не запрещенных на территории Российской Федерации. Предлагаем широкий спектр услуг, включая трансферы в аэропорты и из аэропортов, поездки с детьми, а также поездки по городу и межгород.</div>
          <div class="text-2xl mb-[20px]">Наш автопарк состоит из современных, чистых и регулярно обслуживаемых автомобилей, которые соответствуют всем стандартам безопасности и комфорта. Водители — профессионалы с опытом, проверенные на наличие всех необходимых документов и лицензий.</div>
          <div class="text-2xl">Мы гарантируем комфортные поездки и высокое качество обслуживания для каждого клиента.</div>
        </NCard>
      </div>
      <NCard class="w-full md:hidden bg-[#2C7CB0] text-[white] flex rounded-none flex-col">
        <h1 class="text-3xl">О Нас</h1>
        <div class="text-xl mb-[20px]">Мы — транспортная компания, специализирующаяся на пассажирских перевозках и доставке грузов, не запрещенных на территории Российской Федерации. Предлагаем широкий спектр услуг, включая трансферы в аэропорты и из аэропортов, поездки с детьми, а также поездки по городу и межгород.</div>
        <div class="text-xl mb-[20px]">Наш автопарк состоит из современных, чистых и регулярно обслуживаемых автомобилей, которые соответствуют всем стандартам безопасности и комфорта. Водители — профессионалы с опытом, проверенные на наличие всех необходимых документов и лицензий.</div>
        <div class="text-xl">Мы гарантируем комфортные поездки и высокое качество обслуживания для каждого клиента.</div>
      </NCard>
      <MainForm/>
    </div>
  </div>
</template>
