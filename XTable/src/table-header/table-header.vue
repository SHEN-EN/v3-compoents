<script lang="ts" setup>
import type { PropType } from 'vue';
import type { header } from "../tableType"
const props = defineProps({
    columns: {
        type: Array as PropType<header>,
        default: []
    }
})
</script>
<template>
    <div class="table-header-wapper">
        <table class="table-header" border="0" cellpadding="0" cellspacing="0">
            <thead>
                <tr>
                    <th v-for="(item) in props.columns">{{ item.title }}</th>
                </tr>
            </thead>
        </table>
    </div>
</template> 
<style lang="scss" scoped>
.table-header-wapper {
    display: flex;

    .table-header {
        table-layout: fixed;
        border-collapse: separate;
        height: 40px;
        color: #a0a0a0;
        width: 100%;

        thead {
            position: relative;
            border-radius: 6px 6px 0 0;

            tr {
                text-align: left;
                display: flex;
                height: 100%;
                align-items: center;

                th {
                    min-width: 70px;
                    padding: 0 11px;
                    cursor: pointer;
                    flex: 1;
                }
            }

            &::after {
                content: "";
                height: 1px;
                position: absolute;
                bottom: 3px;
                width: 99%;
                left: 0;
                right: 0;
                margin: auto;
                background: #e6e6e6;
            }
        }

    }
}
</style>
 