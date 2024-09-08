<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import AppLayoutDefault from "@/layouts/AppLayoutDefault.vue";
import {computed, type CSSProperties} from "vue";
import {dateRuRU, ruRU} from "naive-ui";

const providerClassObject = computed(() => ({
  'h-full': true,
}))

const messageProviderStyle: CSSProperties = {
  top: '9px',
}
</script>

<template>
  <NConfigProvider
      :class="providerClassObject"
      :locale="ruRU"
      :date-locale="dateRuRU"
  >
    <NDialogProvider>
      <NMessageProvider :container-style="messageProviderStyle">
        <AppLayoutDefault>
          <router-view></router-view>
        </AppLayoutDefault>
      </NMessageProvider>
    </NDialogProvider>
  </NConfigProvider>
</template>
