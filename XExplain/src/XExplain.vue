<script lang="ts" setup name="XExplain">
import { useSlots } from 'vue'

const slot = useSlots()
</script>

<template>
  <div class="tos-explain">
    <div class="title">
      <slot name="title"></slot>
    </div>
    <div class="content">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tos-explain {
  box-sizing: border-box;
  border: 1px solid #f0f0f0;
  box-shadow: #77737380 1px 1px 10px;;
  border-radius: 6px;
  padding: 10px 20px;
  margin: 20px 0;

  .title {
    line-height: 40px;
    font-weight: 600;
    font-size: 16px;
    color: #000;
  }

  .content {
    line-height: 22px;
    font-size: 14px;
    padding: 5px 0;
  }
}
</style>
