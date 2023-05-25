<script lang="ts" setup name="XCollapse">
import { ref, computed } from 'vue';
import { icon } from '../../Xicon/';
import { XTransition } from '../../XTransition/';
const isVisible = ref(false);
const emit = defineEmits<{
    (e: 'handleClick'): void
    (e: 'update:modelValue', value: string): void
}>();
const props = defineProps({
    collapsekey: {
        type: String,
        default: ""
    },
    modelValue: {
        type: String,
        default: ""
    }
})
const rotateArrow = computed(() => {
    return isVisible.value ? 'transform: rotate(180deg)' : 'transform: rotate(0deg)'
})
const visibleChange = () => {
    isVisible.value = !isVisible.value;
}
const handleClick = () => {
    emit('handleClick');
    emit('update:modelValue', props.collapsekey == props.modelValue ? '' : props.collapsekey)
}
</script>

<template>
    <div :class="['tos-collapse', props.collapsekey == props.modelValue && 'actived']" @click="handleClick">
        <div class="tos-collapse__wrap">
            <div class="collapse-image">
                <slot name="image"></slot>
            </div>
            <div class="collapse-content">
                <div class="content-title">
                    <slot name="title"></slot>
                </div>
                <div class="content-status">
                    <slot name="status"></slot>
                </div>
            </div>
            <div class="collapse-arrow">
                <icon name="iconarrow_down_blue" @click="visibleChange" :style="rotateArrow"></icon>
            </div>
        </div>
        <XTransition>
            <div class="tos-collapse__visible" v-show="isVisible">
                <slot name="content"></slot>
            </div>
        </XTransition>

    </div>
</template>
<style lang="scss" scoped>
.actived {
    background-color: #d7d7d7 !important;

    &:hover {
        background-color: #d7d7d7;
    }
}

.tos-collapse {
    background-color: #ffffff;
    box-shadow: 1px 1px 3px rgb(119 115 115 / 50%);
    border-radius: 6px;
    // height: 100%;
    width: 100%;
    margin-bottom: 10px;
    // cursor: pointer;

    .tos-collapse__wrap {
        display: flex;
        align-items: center;
        width: 100%;
        height: 78px;

        .collapse-image {
            width: 48px;
            height: 48px;
            background-color: #fff;
            flex: inherit;
            margin-left: 12px;
        }

        .collapse-content {
            flex: 22;
            display: flex;
            flex-direction: column;
            margin-left: 20px;
            justify-content: space-evenly;
            height: 100%;
        }

        .collapse-arrow {
            flex: inherit;
            position: relative;
            height: 100%;

            .iconfont {
                cursor: pointer;
                position: absolute;
                top: 18px;
                right: 12px;
                transition: all .3s linear;
            }
        }
    }

    .tos-collapse__visible {
        box-sizing: border-box;
        height: 0px;
        padding: 0 0 0px 80px;
        overflow: hidden;
    }

    &:hover {
        background-color: #e6e6e6;
        cursor: pointer;
    }
}
.tos-collapse:hover {
  background-color: #e6e6e6;
}
.active {
  background-color:  #d7d7d7 !important;
}
</style>
