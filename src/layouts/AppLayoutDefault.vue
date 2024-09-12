<script setup lang="ts">
  import {
    NLayout,
    NLayoutContent,
    NBackTop,
  } from 'naive-ui'
  import { CSSProperties } from 'vue'
  const layoutContentStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
  } as CSSProperties

</script>

<template>
  <NLayout class="h-full w-full" :content-style="layoutContentStyle">
    <NLayout has-sider>
      <NLayoutContent
        class="flex flex-col pb-4"
        :content-style="{ display: 'flex' }"
      >
        <div
          class="app-content flex flex-1 flex-col overflow-y-visible w-full h-full bg-appLayoutDefaultBackground-light overflow-x-hidden"
        >
          <router-view></router-view>
        </div>
        <NBackTop :bottom="80" />
      </NLayoutContent>
    </NLayout>
  </NLayout>
</template>
