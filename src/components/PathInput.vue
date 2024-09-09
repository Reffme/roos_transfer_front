<script setup lang="ts">

import {MapPinCheck, MapPinHouse} from "lucide-vue-next";
import {NTimeline, NTimelineItem} from "naive-ui";
import NSelectAddressRemote from "@/components/selectRemote/NSelectAddressRemote.vue";
</script>

<template>
  <NTimeline :icon-size="22" class="px-1 pr-2">
    <NTimelineItem type="info" class="pb-4">
      <template #icon>
        <MapPinHouse color="#FDEC8BFF"/>
      </template>
      <NSelectAddressRemote without-form-item name="from" label="Откуда"/>
    </NTimelineItem>
    <NTimelineItem type="success" class="pb-4">
      <template #icon>
        <MapPinCheck color="#FDEC8BFF"/>
      </template>
      <NSelectAddressRemote without-form-item name="to" label="Куда"/>
    </NTimelineItem>
  </NTimeline>
</template>

<style scoped>

</style>