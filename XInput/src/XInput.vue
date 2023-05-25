<script lang="ts" setup name="XInput">
import { XTransition } from '../../XTransition';
import { ref, computed, useSlots, watch, inject, Ref } from 'vue'
import { icon } from '../../Xicon/'
const t: any = inject('i18n')
const props = defineProps({
    readonly: {
        type: Boolean,
        default: false,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    placeholder: {
        type: String,
        default: "",
    },
    type: {
        type: String,
        default: "text",
    },
    modelValue: {
        type: String,
        default: ""
    },
    suffixIcon: {
        type: String,
        default: ""
    },
    regex: {
        type: RegExp,
        default: /^/
    },
    tips: { //正则校验未过时提示
      type: String,
      default: ''
    },
    maxLength: {
      type: Number,
      defalult: 99999
    }
})
const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void
    (e: 'input', value: string): void
    (e: 'blur', event: Event): void
    (e: 'focus', event: Event): void
    (e: 'handleIcon'): void
}>();
const inputRef:Ref = ref('')
const passwordVisible = ref(false)
const inputValue = ref('')
const isBlur = ref(false)
const warning = ref(false)
const slot = useSlots()
const handleInput = (e: Event) => {
    const { value } = e.target as HTMLInputElement;
    emit('update:modelValue', value)
    emit('input', value)
}
const handleBlur = (e: Event) => {
    isBlur.value = true;
    emit('blur', e)
}
const handleFocus = (e: Event) => {
    isBlur.value = false;
    warning.value = false
    emit('focus', e)
}
const handleIcon = () => {
    emit('handleIcon')
}
const handePasswordVisible = () => {
    passwordVisible.value = !passwordVisible.value;
}
const setWarning = (flag: boolean) => {
  warning.value = flag
}
const clearInput = () => {
  emit('update:modelValue', '')
}
const focusInput = () => {
  inputRef.value.focus()
}
const suffixVisible = computed(() => {
    return (slot.suffix || props.type == 'password' || props.suffixIcon)
})
const isPassVerify = computed<boolean>(() => {
    return props.regex && isBlur.value ? props.regex.test(inputValue.value) : true
})
const renderInputType = computed<string>(() => {
    return props.type == 'password' && passwordVisible.value ? 'text' : props.type
})
watch(() => props.modelValue, (newVal) => {
    inputValue.value = newVal
}, {
    immediate: true
})


defineExpose({
    isPassVerify,
    inputValue: computed(() => inputValue.value),
    setWarning,
    focusInput,
    clearInput
})
</script>

<template>
    <div class="tos-input">
        <input ref="inputRef" @input="handleInput" @blur="handleBlur" @focus="handleFocus" :type="renderInputType"
            :disabled="props.disabled" :placeholder="props.placeholder" :readonly="props.readonly" :value="inputValue" :maxlength="props.maxLength" :class="['tos-input-inner',(!isPassVerify || warning)&&'error',suffixVisible && 'space']">
        <span class="tos-input-suffix" v-if="suffixVisible">
            <slot name="suffix"></slot>
            <icon v-if="props.type == 'password'" @click="handePasswordVisible"
                :name="passwordVisible ? 'iconOpeneyes' : 'iconCloseeyes'"></icon>
            <icon @click="handleIcon" :name="props.suffixIcon" v-if="props.suffixIcon && !slot.suffix"></icon>
        </span>
        <XTransition animation=".3s height ease-in">
          <div class="input-tips" v-show="!isPassVerify">
            <p class="tips" v-show="!(props.modelValue && !props.tips)">{{ props.modelValue ? props.tips : t('global.not_null')}}</p>
          </div>
        </XTransition>
    </div>
</template>
<style lang="scss" scoped>
.tos-input {
    position: relative;

    &-inner {
        border: 1px solid rgb(230, 230, 230);
        width: 100%;
        height: 30px;
        padding: 0 8px;
        box-sizing: border-box;
        border-radius: 8px;
        outline: none;
    }

    &-suffix {
        cursor: pointer;
        position: absolute;
        right: 0;
        padding: 0 7px;
        display: inline-flex;
        align-items: center;
        height: 30px;
        margin: auto;
    }

    & .input-tips {
      // position: relative;
      overflow: hidden;
      height: 0;
      // padding-top: 4px;
      .tips {
        padding-top: 4px;
        color: #a0a0a0;
      }
    }

    .error {
        border: 2px solid rgb(250, 209, 209)
    }

    .space {
        padding-right: 23px;
    }
}

input::-webkit-inner-spin-button {
    display: none;
}

input[type="text"]:not(:read-only):focus {
    border-color: #ddd;
}

input:disabled {
    //禁用后 背景灰色并且鼠标变为ban字样
    color: lightgray;
    cursor: not-allowed;
}

input[readonly="readonly"] {
    cursor: default; //默认指针为箭头指针
}
</style>
