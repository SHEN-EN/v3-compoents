<script lang="ts" setup name="XCheckBox">

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  notCheckAll: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'change', value: boolean): void
}>();

const handlerChange = (e: Event) => {
  const { checked } = e.target as HTMLInputElement
  emit('update:modelValue', checked)
  emit('change', checked)
}
</script>

<template>
  <div :class="['tos-checkbox', { 'not-check': notCheckAll }]">
    <input type="checkbox" class="input_check" :disabled="props.disabled" :checked="props.modelValue"
      @change="handlerChange" />
    <span class="check_title">
      <slot></slot>
    </span>
  </div>
</template>

<style lang="scss" scoped>
.tos-checkbox {
  display: inline-flex;
  align-items: center;
  position: relative;

  .input_check {
    top: 1px;
    margin-right: 10px;
  }
  .check_title {
    font-size: 16px;
  }

  input[type="checkbox"] {
    width: 15px;
    height: 15px;
    // -webkit-appearance: none;
    background-color: transparent;
    border: 0;
    outline: 0 !important;
    color: #d8d8d8;
    position: relative;
    cursor: pointer;

    &:before {
      content: "";
      display: block;
      width: 15px;
      height: 15px;
      border: 1px solid #ddd;
      background-color: #fff;
      box-sizing: border-box;
      border-radius: 3px;
      position: absolute;
    }

    &:after {
      content: "";
      display: block;
      width: 0;
      height: 0;
      position: absolute;
      transform: rotate(-135deg) translate(-61%, 25%);
      transition: all .3s;
    }

    &:disabled {
      cursor: not-allowed;
    }

    &:checked:before {
      border: 1px solid #4693fe;
      background-color: #4693fe;
    }

    &:disabled:before {
      background-color: #e2e0e0;
    }

    &:checked:after {
      width: 4px;
      height: 9px;
      border-left: 2px solid rgb(255, 255, 255);
      border-top: 2px solid rgb(255, 255, 255);
    }
  }
}

.not-check {
  @extend .tos-checkbox;

  input[type="checkbox"]:checked:after {
    width: 0px;
    height: 11px;
    border-left: 2px solid white;
    border-top: 1px solid white;
    transform: rotate(-90deg) translate(-100%, 56%);
  }
}
</style>
