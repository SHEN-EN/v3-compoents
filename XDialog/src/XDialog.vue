<script lang="ts" setup name="XDialog">
import { ref, onMounted, onUpdated, Ref } from "vue";
import { XMark } from "../../XMark"
import { icon } from '../../Xicon/'
import { useDraggable } from "@account/hooks";
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  modelValue: {
    type: Boolean,
    default: false
  },
  showClose: {
    type: Boolean,
    default: true
  },
  showMark: {
    type: Boolean,
    default: true
  },
  allowDraggable: {
    type: Boolean,
    default: true
  },
  bodyHeight: {
    type: String,
    default: 'auto'
  }
})
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>();

const dialog:Ref = ref(HTMLElement);
const dialogHeader:Ref = ref(HTMLElement);

const closeDialog = () => {
  emit('update:modelValue', false)
}

const body = ref()

onMounted(() => {
  useDraggable(dialog, dialogHeader, props.allowDraggable)
})

onUpdated(() => {
  if(body.value) body.value.style.height = props.bodyHeight
})
</script>
<template>
  <div>
    <XMark :markStatus="props.modelValue" v-if="props.showMark"></XMark>
    <div class="tos-dialog" ref="dialog" v-if="props.modelValue">
      <div :class="['dialog-header', !props.allowDraggable && 'notAllowDraggable']" ref="dialogHeader">
        <div class="dialog-title">{{ props.title }}</div>
        <div class="dialog-close" v-if="props.showClose" @click="closeDialog">
          <icon name="iconReject"></icon>
        </div>
      </div>
      <div ref="body" class="dialog-body">
        <slot name="body"></slot>
      </div>
      <div class="dialog-footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template> 
<style lang="scss" scoped>
.tos-dialog {
  width: 620px;
  box-shadow: rgb(119 115 115 / 50%) 1px 1px 10px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 101;
  border-radius: 8px;
  background: #fff;

  .dialog-header {
    position: relative;
    height: 70px;
    overflow: hidden;
    cursor: move;

    .dialog-title {
      padding: 22px 40px 6px 20px;
      line-height: 30px;
      overflow: hidden;
      word-break: break-all;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      white-space: break-spaces;
      font-size: 18px;
      // font-weight: 600;
      text-align: center;
    }

    .dialog-close {
      width: 37px;
      height: 24px;
      cursor: pointer;
      background-size: 9px 9px;
      position: absolute;
      z-index: 5;
      right: 0;
      top: 0;
      border-top-right-radius: 8px;
      text-align: center;
      line-height: 24px;

      &:hover {
        background-color: #e6e6e6;
      }
    }
  }

  .notAllowDraggable {
    cursor: default;
  }

  .dialog-body {
    min-height: 100px;
    flex: 1;
    padding: 0 30px;
    display: flex;
    flex-direction: column;
  }

  .dialog-footer {
    padding: 6px 20px;
    height: 30px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
  }
}
</style>
