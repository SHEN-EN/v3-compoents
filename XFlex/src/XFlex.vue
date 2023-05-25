<script lang="ts" setup name="XFlex">
import { onMounted, useSlots, ref } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: false,
  },
  ratio: {
    type:  Number,
    default: 5
  },
  indent: {
    type: String,
    default: '0'
  }
})

const slot = useSlots()
const title = ref()
const content = ref()

const hasSlot = () => {
  if(slot.default) {
    title.value.style.width = (100 - props.ratio*10)+'%'
    content.value.style.width = (props.ratio*10)+'%'
    // content.value.style.flexGrow = props.ratio
  } else {
    title.value.style.width = '100%' 
    content.value.style.width = '0'
  }
}

onMounted(() => {
  hasSlot()
  document.querySelectorAll('.box').forEach((item:any) => {
    item.style.paddingLeft = props.indent + 'px'
  })
})

</script>

<template>
  <div class="tos-flex">
    <div ref="title" class="title">
      <span class="box">{{ props.title }}</span>
    </div>
    <div ref="content" class="content">
      <span class="box" v-if="slot.default" >
        <slot></slot>
      </span>
    </div>    
  </div>
</template>

<style lang="scss" scoped>
.tos-flex {
  display: flex;
  // justify-content: center;
  flex-wrap: nowrap;
  align-items: center;
  height: 24px;
  width: 100%;
  
  & .title, & .content {
    .box {
      flex-grow: 1;
    }
    display: inline-flex;
  }

  & .title {
    max-width: 50%;
  }
}
</style>
