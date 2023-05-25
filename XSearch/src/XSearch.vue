<script lang="ts" setup name="XSearch">
import { ref, watch } from 'vue'
import { icon } from '../../Xicon'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  //搜索框是否可收缩
  scaling: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    default: ""
  },
  throttleTime: {
    type: Number,
    default: 1000
  }
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'input', value: string): void
  (e: 'focus', event: Event): void
  (e: 'blur', event: Event): void
  (e: 'keyup', event: Event): void
}>();

let isScaling = ref(props.scaling)
let inputValue = ref('')

const handleInput = (e: Event) => {
  const { value } = e.target as HTMLInputElement;
  emit('update:modelValue', value)
  emit('input', value)
}

const handleFocus = (e: Event) => {
  emit('focus', e)
}

const handleBlur = (e: Event) => {
  emit('blur', e)
}

const handleKeyup = (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    emit('blur', e)
  } else {
    emit('keyup', e)
  }
}

const handerIcon = (e: Event) => {
  if (props.scaling) {
    isScaling.value = !isScaling.value
  }
}

const throttle = (function () {
  let timer:any = null;
  return function (callback:any, ms:number, params:any) {
    clearTimeout(timer);
    timer = setTimeout(callback, ms, params);
  };
})();

watch(() => props.modelValue, (newVal) => {
  inputValue.value = newVal
}, {
  immediate: true
})
</script>

<template>
  <div class="tos-search" :title="props.placeholder">
    <input ref="input" type="text" class="seachInput" :class="{ isScaling: props.scaling ? isScaling : false }"
      :value="inputValue" :disabled="props.disabled" :placeholder="props.placeholder"
      @input="throttle(handleInput, props.throttleTime, $event)" @blur="handleBlur" @focus="handleFocus" @keyup="handleKeyup" />
    <div class="searchIcon" @click="handerIcon">
      <icon :name="'iconSearch'" size="18"></icon>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tos-search {
  display: inline-flex;
  justify-content: flex-end;
  overflow: hidden;
  min-width: 28px;

  .seachInput {
    border: 1px solid rgb(230, 230, 230);
    width: 100%;
    height: 30px;
    padding: 0 28px 0 8px;
    box-sizing: border-box;
    border-radius: 8px;
    outline: none;
    // visibility: visible;
    transition: width .3s;
  }

  .isScaling {
    width: 0;
    padding: 0;
    border: none;
  }

  .searchIcon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    // right: 0px;
    width: 28px;
    height: 30px;
    cursor: pointer;
  }
}
</style>
