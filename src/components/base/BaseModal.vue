<script setup lang="ts" >
  import { NModal, NButton, NFormItem } from 'naive-ui'
  import { computed, CSSProperties } from 'vue'
  import { useModalsStore } from '@/stores/modals'
  import { ModalName } from '@/models/ModalName'
  import { whenever } from '@vueuse/core'

  const props = defineProps<{
    name: ModalName
    title?: string
    submitButtonTitle?: string
    hiddenButton?: boolean
    cancelButtonTitle?: string
    classModal?: string
    sid?: string
    closeActive?: boolean
  }>()

  const emit = defineEmits<{
    onSubmitClick: []
    onEnter: []
    onLeave: []
  }>()

  const showUpdateHandler = () => {
    emit('onLeave')
    close(props.name)
  }

  const bodyStyle: CSSProperties = {
    width: '50%',
  }

  const { close, isModalOpen } = useModalsStore()
  const isOpened = computed(() => isModalOpen(props.name, props.sid))

  whenever(isOpened, () => {
    emit('onEnter')
  })
</script>

<template>
  <NModal
    :show="isOpened"
    preset="card"
    :class="`mb-8 mt-8 ${classModal}`"
    :title="title"
    :style="bodyStyle"
    :on-update:show="showUpdateHandler"
  >
    <form @submit.prevent="emit('onSubmitClick')">
      <slot name="default"></slot>
      <NFormItem
        v-if="!hiddenButton"
        class="mt-6 w-full"
        :show-label="false"
        :show-feedback="false"
      >
        <slot name="action">
          <div class="flex w-full gap-2.5">
            <NButton
              class="flex-1"
              :secondary="!closeActive"
              :type="closeActive ? 'primary' : undefined"
              @click="close(name)"
            >
              {{ cancelButtonTitle || 'Отмена' }}
            </NButton>
            <slot name="button"></slot>
            <NButton
              class="flex-1"
              attr-type="submit"
              :secondary="closeActive"
              :type="closeActive ? 'tertiary' : 'success'"
            >
              {{ submitButtonTitle }}
            </NButton>
          </div>
        </slot>
      </NFormItem>
    </form>
  </NModal>
</template>
