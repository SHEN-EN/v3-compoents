<script lang="ts" setup>
import type { CSSProperties, Ref } from 'vue'
import { ref, onMounted, computed } from "vue"
import { icon } from "../../Xicon"
import { messageProps, getLastInstanceOffset } from "./instance";
import { useResizeObserver } from "@account/hooks";
const props = defineProps(messageProps);
const messageTypeEnum = ref({
    "success": "iconnormal",
    "info": "iconNotifications",
    "warning": "iconwarning",
    "error": "iconClose1",
})
const isVisibility = ref(false);
const height = ref(0);
const messageRef:Ref = ref(null);
const close = () => {
    isVisibility.value = false;
}
const timeOut = () => {
    isVisibility.value = true;
    setTimeout(() => {
        close()
    }, props.duration);
}
const lastOffset = computed<number>(() => {
    return getLastInstanceOffset(props.id)
})
const currentOffset = computed<number>(() => {
    return lastOffset.value + props.offset;
})
const customStyle = computed<CSSProperties>(() => {
    return {
        top: `${currentOffset.value}px`
    }
})
const bottom = computed<number>(() => {
    return currentOffset.value + height.value
})
onMounted(() => {
    timeOut()
    useResizeObserver(messageRef.value, () => {
        if (isVisibility.value) {
            height.value = messageRef.value!.getBoundingClientRect().height;
        }
    })
})
defineExpose({
    bottom
})
</script>
<template>
    <transition name="message-fade" @before-leave="onClose" @after-leave="onDestroy">
        <div v-show="isVisibility" :class="['message', props.type, customClass]" ref="messageRef" :style="customStyle">
            <icon :name="messageTypeEnum[props.type]"></icon>
            <p class="message-content">{{ props.content }}</p>
        </div>
    </transition>
</template>
<style lang="scss" scoped>
.message-fade-enter-from,
.message-fade-leave-to {
    opacity: 0;
    transform: translate(-50%, -100%) !important;
}

.message-fade-enter-active {
    transition: all 0.3s ease-out;
}

.info {
    background-color: #f4f4f5;
    border-color: #e9e9eb;
    color: #909399;

}

.success {
    background-color: #f0f9eb;
    border-color: #e1f3d8;
    color: #67c23a;
}

.warning {
    background-color: #fdf6ec;
    border-color: #faecd8;
    color: #e6a23c;
}

.error {
    background-color: #fef0f0;
    border-color: #fde2e2;
    color: #f56c6c;
}

.message {
    display: flex;
    align-items: center;
    position: fixed;
    left: 50%;
    top: 20px;
    width: fit-content;
    border-radius: 6px;
    transform: translateX(-50%);
    transition: opacity .3s, transform .3s, top .4s;
    padding: 15px 19px;
    z-index: 999;
    &-content {
        margin-left: 10px;
    }
}
</style>
