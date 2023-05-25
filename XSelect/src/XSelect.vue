<script lang="ts" setup name="XSelect">
import { XInput } from '../../XInput'
import { XTransition } from '../../XTransition'
import { computed, ref, PropType, useAttrs, Directive } from 'vue'
import { ClickOutside } from "@account/directives"
interface options {
  value: string
  label: string
  disabled?: boolean
}
const vClickOutside: Directive = ClickOutside
const props = defineProps({
  options: {
    type: Array as PropType<options[]>,
    default: [],
  },
})
const emit = defineEmits<{
  (e: 'change', item: options): void
  (e: 'handleVisibleChange'): void
  (e: 'update:modelValue', value: string): void
}>()
const isVisible = ref(false)
const selectedOptions = ref<options>({
  label: "",
  value: ""
})
const attrs = useAttrs();
const handleVisible = () => {
  isVisible.value = !isVisible.value;
  emit('handleVisibleChange')
}
const handleClick = (item: options) => {
  selectedOptions.value = item
  isVisible.value = false;
  emit('change', item);
  emit('update:modelValue', item.value)
}
const rendlerIconClass = computed<string>(() => {
  return isVisible.value ? 'reverse' : ''
})
const hiddenSelect = () => {
  isVisible.value = false
}
const renderModelValue = computed<string>(() => {
  if (attrs.modelValue) {
    selectedOptions.value = props.options.find(item => {
      return item.value == attrs.modelValue
    }) || {
      label: "",
      value: ""
    }
  } else {
    selectedOptions.value = props.options[0]
  }
  return (selectedOptions.value.label) as string
})
</script>
<template>
  <div class="tos-select" v-click-outside="hiddenSelect">
    <XInput :readonly="true" :disabled="!!attrs.disabled" v-model="renderModelValue" @click.stop.prevent="handleVisible">
      <template #suffix>
        <i :class="['iconfont iconarrow_down_blue', rendlerIconClass]"></i>
      </template>
    </XInput>
    <XTransition>
      <ul class="tos-select-dropdown" v-show="isVisible">
        <li
          :class="['tos-select-dropdown_item', { 'selected': selectedOptions['value'] == item['value'] }, { 'disabled': item['disabled'] }]"
          v-for="(item) in props.options" :key="item['value']" @click.stop.prevent="handleClick(item)">{{ item['label'] }}
        </li>
      </ul>
    </XTransition>
  </div>
</template> 
<style lang="scss" scoped>
.tos-select {
  position: relative;

  input {
    cursor: pointer;
  }

  .iconfont {
    transition: all 0.3s;
    transform: rotate(0deg);
  }

  .reverse {
    transform: rotate(180deg);
  }

  &-dropdown {
    position: absolute;
    width: 100%;
    z-index: 9;
    overflow: auto;
    max-height: 180px;
    height: 0;
    background-color: #fff;
    border-radius: 6px;
    box-shadow: 0 1px 3px rgb(0 0 0 / 30%);
    margin: 0 2px;

    .tos-select-dropdown_item {
      padding: 2px 5px;
      line-height: 26px;
      white-space: nowrap;
      text-overflow: ellipsis;
      cursor: pointer;
      margin: 0;

      &:hover {
        background: #ececec;
        color: #000;
      }
    }

    .selected {
      background: #ffffff;
      color: #000;
      font-weight: 600;
    }

    .disabled {
      cursor: not-allowed;
    }
  }
}</style>
 