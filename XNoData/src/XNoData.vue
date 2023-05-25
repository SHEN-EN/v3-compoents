<script lang="ts" setup name="XNoData">
// import { inject } from 'vue'
// const t:any = inject('i18n')

const props = defineProps({
  desc: {
    type: String,
    defatult: ''
  }
})

</script>

<template>
  <div class="tos-nodata">
    <img src="@/assets/svgs/Empty.svg"/>
    <p class="desc" v-show="props.desc">{{ props.desc }}</p>
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.tos-nodata {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  img {
    width: 235px;
  }
  .desc {
    line-height: 20px;
    margin: 5px 0;
  }
}

</style>
