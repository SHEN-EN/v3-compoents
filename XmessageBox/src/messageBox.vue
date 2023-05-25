<script lang="ts" setup>
import { ref, onMounted, Directive, nextTick, computed, Ref } from "vue"
import { icon } from '../../Xicon/'
import { XButton } from '../../XButton/';
import {XMark} from '../../index'
import { messageBoxProps, Action } from "./instance"
import { ClickOutside } from "@account/directives"
import { useDraggable } from "@account/hooks"
// import i18n from "/src/utils/i18n";
// const t:any = i18n.global.t
// console.log('ttt', t('global.login'))

const vClickOutside: Directive = ClickOutside
const props = defineProps(messageBoxProps);
const actionEvent = ref('');
const messageBox:Ref = ref(null);
const messageBoxHeader:Ref = ref(null);
const isVisible = ref(false);
const convertIcon = computed<string>(() => {
    if (!props.icon) {
        const enumsIcon = {
          "success": "iconnormal",
          "info": "iconNotifications",
          "warning": "iconwarning",
          "error": "iconClose1",
        }
        return enumsIcon[props.type]
    } else {
        return props.icon
    }
})
const handlerAction = (action: Action<string>) => {
    actionEvent.value = action;
    isVisible.value = false;
}
const handlerClose = () => {
    handlerAction("close")
}
onMounted(() => {
    isVisible.value = true;
    nextTick(() => {
        useDraggable(messageBox, messageBoxHeader, props.draggable);
    })
})
defineExpose({
    actionEvent
})
</script>
<template>
  <div>
    <transition name="fade-in-mark">
      <XMark :markStatus="isVisible"></XMark>
    </transition>
    <transition name="fade-in-linear" @after-leave="props.onVanish">
        <div :class="['message-box', props?.customClass]" v-show="isVisible" v-click-outside="handlerClose"
        ref="messageBox">
              
              <div :class="['message-box__header', props.draggable && 'allow__draggable']" ref="messageBoxHeader">
                  <div class="message-box__title">
                      {{ props.title }}
                  </div>
                  <div :class="['messgae-box__close', type]">
                      <icon style="font-size: 18px;" :name="convertIcon"></icon>
                  </div>
              </div>
              <div class="message-box__content">
                  {{ props.message }}
              </div>
              <div class="message-box__action">
                  <XButton action="cancel" @handleClick="handlerAction" v-if="props?.showCancleButton" >{{ props.cancelButtonText }}</XButton>
                  <XButton type="primary" v-if="props?.showConfirmButton" action="confirm" @handleClick="handlerAction">{{ props.confirmButtonText }}
                  </XButton>
              </div>
          </div>
    </transition>
  </div>
</template>
<style lang="scss" scoped>
.fade-in-linear-enter-active {
    -webkit-animation: msgbox-fade-in .3s;
    animation: msgbox-fade-in .3s
}

.fade-in-linear-leave-active {
    animation: msgbox-fade-in .3s reverse
}

.fade-in-mark-enter-active {
  animation: markAnimation .3s;
}
.fade-in-mark-leave-active {
  animation: markAnimation .3s reverse;
}

@keyframes markAnimation {
    0% {
         opacity: 0;
    }

    100% {
      opacity: 1;
    }
}

@keyframes msgbox-fade-in {
    0% {
        transform: translate3d(0, -20px, 0);
        opacity: 0
    }

    100% {
        transform: translate3d(0, 0, 0);
        opacity: 1
    }
}
.info {
    color: #909399;
}

.success {
    color: #67c23a;
}

.warning {
    color: #e6a23c;
}

.error {
    color: #f56c6c;
}
.message-box {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    width: 420px;
    height: fit-content;
    background-color: #ffffff;
    box-shadow: 0px 0px 12px rgba(0, 0, 0, .12);
    border-radius: 6px;
    z-index: 101;

    &__header {
        display: flex;
        justify-content: space-between;
        padding: 15px;

        .message-box__title {
            font-size: 18px;
        }

        .messgae-box__close {
            cursor: pointer;
        }
    }

    .allow__draggable {
        cursor: move;
    }

    .message-box__content {
        padding: 10px 15px;
        color: #606266;
        font-size: 14px;
    }

    .message-box__action {
        padding: 5px 15px 10px;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-end;
        align-items: center;
    }
}
</style>
