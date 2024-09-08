<script setup lang="ts">
import BaseFormInput from "@/components/base/BaseFormInput.vue";
import NSelectAddressRemote from "@/components/selectRemote/NSelectAddressRemote.vue";
</script>

<template>
  <div class="w-full h-full">
    <form class="w-[500px]" @submit.prevent="console.log(22)">
    <BaseFormInput name="test1" label="test1"/>
      <NSelectAddressRemote name="test1" label="test2"/>

    </form>
  </div>
</template>
