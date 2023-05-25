<script lang="ts" setup name="XRadio">
import { useSlots } from 'vue';


const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  value: {
    type: String,
    require: true
  }
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: string): void
}>();

const slot = useSlots()

const handlerChange = (e: Event) => {
  const { value } = e.target as HTMLInputElement
  emit('update:modelValue', value)
  emit('change', value)
}

</script>

<template>
  <label :class="['tos-radio']">
    <input class="radio_input" type="radio" :disabled="props.disabled" :value="props.value"
      :checked="props.modelValue == props.value" @change="handlerChange" />
    <span class="radio_title">
      <slot>
        {{ props.label }}
      </slot>
    </span>
  </label>
</template>

<style lang="scss" scoped>
.tos-radio {
  display: inline-flex;
  align-items: center;
  height: 30px;
  margin-right: 30px;
  cursor: pointer;

  .radio_input {
    height: 16px;
    width: 16px;
    margin-right: 14px;
    cursor: inherit;
    // &:disabled {
    //   cursor: not-allowed;
    // }
    // &:disabled + .radio_title{
    //   cursor: not-allowed;
    // }
  }

}
.tos-radio:has(>.radio_input:disabled){
  cursor: not-allowed;
}


</style>
