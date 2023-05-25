<script lang="ts" setup name="XButton">
import { icon } from '../../Xicon/'

const props = defineProps({
    disabled: {
        type: Boolean,
        default: false,
    },
    type: {
        type: String,
        default: "default",
        //primary / success / danger / info / default
    },
    loading: {
        type: Boolean,
        default: false,
    },
    action: {
        type: String,
        default: "default"
    },
    buttonStyle: {
        type: Object,
        default: () => {
            return {}
        }
    }

})

const emit = defineEmits<{
    (e: 'handleClick', value: string): void
}>();

const handleClick = (e: Event) => {
    emit('handleClick', props.action)
}
</script>

<template>
    <div class="tos-button">
        <button class="tos-button-inner" :class="type" :disabled="loading ? true : disabled"
            :style="buttonStyle" @click.stop="handleClick">
            <icon class="icon-loading" name="iconspin_right" v-show="loading"></icon>
            <slot></slot>
        </button>
    </div>
</template>

<style lang="scss" scoped>
.tos-button {
    display: inline-flex;
    justify-content: center;
    &:not(:first-child) {
        margin-left: 12px;
    }
    &-inner {
        box-sizing: border-box;
        position: relative;
        min-width: 60%;
        height: 30px;
        line-height: 1;
        padding: 0 22px;
        border: 1px solid #e6e6e6;
        border-radius: 20px;
        color: #fff;
        white-space: nowrap;
        z-index: 1;
        transition: backgroud, color .5s;
    }

    &-inner:hover {
        cursor: pointer;
    }

    //除了第一个, 都添加margin-left
    // &:not(:first-child) .tos-button-inner {
    //     margin-left: 12px;
    // }

    button:disabled {
        background: #e6e6e6;
        color: #bbbbbb;
    }

    button:disabled:hover {
        cursor: not-allowed;
        background: #e6e6e6;
        color: #bbbbbb;
    }

    .default {
        background: #ffffff;
        color: #787878;

        &:hover {
            background: #e6e6e6;
            color: #3c3c3c;
        }
    }

    .primary {
        background: #0992f6;

        &:hover {
            background: #219ff8;
        }
    }

    .success {
        background: #94bf38;

        &:hover {
            background: #88bf14;
        }
    }

    .danger {
        background: #ea0001;

        &:hover {
            background: #e22e2e;
        }
    }

    .info {
        background: #e6e6e6;
        color: #787878;

        &:hover {
            background: #dfdede;
        }
    }
}

@keyframes rotating {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(1turn);
    }
}

.icon-loading {
    margin-right: 5px;
    animation: rotating 2s linear infinite;
}
</style>
