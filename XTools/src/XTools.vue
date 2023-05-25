<script lang="ts" setup name="XTools">
import { icon } from '../../Xicon'
type toolType =  {
  icon: string
  title: string
  disabled: boolean
  type: string
}
const props = defineProps({
  toolList: {
    type: Array<toolType>,
    dafault: () => {
      return Array<toolType>;
      // {
      //   icon: icon图标
      //   title: hover名称
      //   disabled: 是否禁用
      //   type: 操作类型
      // }
    },
  },
})

const emit = defineEmits<{
  (e: 'handlerTool', value: string): void
}>();

const clickIcon = (type: string, disabled: boolean, index: number) => {
  if (disabled) return
  emit('handlerTool', type)
}


</script>

<template>
  <div class="tos-tools">
    <ul class="tool-list">
      <template v-for="(item, index) in props.toolList">
        <li :title="item.title" :class="['tool-list-item', { disable: item.disabled }]"
          @click.stop="clickIcon(item.type, item.disabled, index)">
          <icon :name="item.icon" size="18"></icon>
        </li>
      </template>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.tos-tools {
  display: inline-flex;

  .tool-list {
    display: flex;
    .tool-list-item {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 26px;
      height: 26px;
      margin: 2px;
      margin-left: 6px;
      cursor: pointer;
    }

    .disable {
      color: #d4d1cd;
      &:hover {
        cursor: not-allowed;
      }
    }
  }
}
</style>
