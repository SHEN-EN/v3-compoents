<script lang="ts" setup name="Xicon">
import { computed } from "vue"
import type { CSSProperties } from "vue";
import "@account/font"
const props = defineProps({
    name: {
        type: String,
    },
    color: {
        type: String,
    },
    size: {
        type: String,
        default: "12"
    },
    svgIcon: {
      type: Boolean,
      default: false
    }
});
const style = computed<CSSProperties>(() => {
    const { size, color } = props;
    if (!size && !color) return {}
    return {
        fontSize: `${size}px`,
        color
    }
})
</script>

<template>
  <i v-if="!svgIcon" :style="style" :class="['iconfont', name]"></i>
  <svg v-else :style="style" aria-hidden="true">
    <use :xlink:href="`#${name}`"></use>
  </svg>
</template>
<style lang="scss" scoped>
.iconfont{
    height: fit-content;
}
</style>
