<script lang="ts" setup name="XMark">

const props = defineProps({
  markStatus: {
    type: Boolean,
    default: false,
  }
})

const emit = defineEmits<{
  (e: 'handlerMark'): void
}>();



</script>

<template>
  <div class="tos-mark" v-if="props.markStatus" @click="emit('handlerMark')">
  </div>
</template>

<style lang="scss" scoped>
.tos-mark {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 100;
  border-radius: 6px;
}
</style>
