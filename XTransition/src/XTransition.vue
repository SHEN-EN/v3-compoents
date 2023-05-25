<script lang="ts" setup name="XTransition">

const props = defineProps({
    height:{ //自定义高度
      type: Number,
      default: 0
    },
    animation:{ // 动画时间
      type: String,
      default: '.3s all ease-in'
    }
})

const beforeEnter = (el:HTMLElement) => {
  el.style.transition = props.animation;
}

const enter = (el:HTMLElement) => {
  if (el.scrollHeight !== 0) {
  let height = !(+props.height) ? el.scrollHeight : props.height;
    el.style.height = `${height}px`;
  } else {
    el.style.height = "auto";
  }
}
const afterEnter = (el:HTMLElement) =>{
    el.style.height = "auto";
}
const beforeLeave = (el:HTMLElement) => {
  let height = !(+props.height)?el.scrollHeight:props.height
  el.style.height = `${height}px`;
}
const leave = (el:HTMLElement) => {
  if (el.scrollHeight !== 0) {
    el.style.transition = ".3s height linear";
    el.style.height = "0px";
  }
}  



</script>

<template>
  <transition
    name="slide-toggle"
    @before-enter="beforeEnter"
    @enter="enter"
    @after-enter="afterEnter"
    @before-leave="beforeLeave"
    @leave="leave">
    <slot></slot>
  </transition>
</template>
