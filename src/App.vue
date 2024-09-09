<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppLayoutDefault from "@/layouts/AppLayoutDefault.vue";
import {computed, type CSSProperties} from "vue";
import {dateRuRU, NConfigProvider, ruRU} from "naive-ui";
import {overrideNaiveUiTheme} from "@/utils/const/overrideNaiveUiTheme";

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
      :theme-overrides="overrideNaiveUiTheme"
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
