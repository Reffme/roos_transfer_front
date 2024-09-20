<script setup lang="ts">

import {MapPinCheck, MapPinHouse} from "lucide-vue-next";
import {NTimeline, NTimelineItem} from "naive-ui";
import NSelectAddressRemote from "@/components/selectRemote/NSelectAddressRemote.vue";
import {RemoteOption} from "@/models/RemoteOption";

const fromOptions = defineModel<RemoteOption<Record<string, unknown> | string>[]>('fromOption')
const toOptions = defineModel<RemoteOption<Record<string, unknown> | string>[]>('toOption')

</script>


<template>
  <NTimeline :icon-size="22" class="px-1 mb-5 pr-2">
    <NTimelineItem type="info" class="pb-4">
      <template #icon>
        <div><MapPinHouse color="#706f6f"/></div>
      </template>
      <template #header><NSelectAddressRemote v-model:options="fromOptions"  name="from" label="Откуда"/></template>
    </NTimelineItem>
    <NTimelineItem type="success">
      <template #icon>
        <MapPinCheck color="#706f6f"/>
      </template>
      <template #header><NSelectAddressRemote v-model:options="toOptions" name="to" label="Куда"/></template>
    </NTimelineItem>
  </NTimeline>
</template>

<style scoped>

</style>