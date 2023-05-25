<script lang="ts" setup name="XTable">
import { useAttrs, watch, ref, useSlots, provide } from "vue";
import tableHeader from "./table-header/table-header.vue";
import tableBody from "./table-body/table-body.vue";
import type { tableData } from "./tableType"
const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void
}>();
const props = defineProps({
    modelValue: {
        type: String,
        default: ""
    }
})
const { tableData } = useAttrs();
const columns = ref()
const data = ref()
const slots = useSlots();
watch(() => tableData, (newVal) => {
    const { header, body } = newVal as tableData;
    columns.value = header;
    data.value = body;
}, {
    immediate: true,
    deep: true
})

const bodyChange = (value:string) => {
  value = value == ids.value ? '' : value
  ids.value = value
  emit('update:modelValue', value)
}
let ids = ref(props.modelValue)
provide('raw', {bodyChange, ids})
</script>
<template>
    <div class="tos-table">
        <tableHeader :columns="columns"></tableHeader>
        <tableBody :data="data">
            <template v-for="(_,name) in slots" v-slot:[name]>
                <slot :name="name"></slot>
            </template>
        </tableBody>
    </div>
</template> 
<style lang="scss" scoped>
.tos-table {
    display: flex;
    flex-direction: column;
    box-shadow: 1px 1px 3px rgb(119 115 115 / 50%);
    width: fit-content;
    border-radius: 6px;
    background-color: #fff;
    padding: 0 20px;
    margin-bottom: 2px;
}
</style>
 

