<script lang="ts" setup name="XTable">
import { PropType, useSlots, inject } from "vue"
import type { body } from '../tableType'
const props = defineProps({
    data: {
        type: Array as PropType<body[]>,
        default: []
  }
})
const slotList = Object.keys(useSlots());
const loopKey:string[] = Object.keys(props.data[0]);
loopKey.shift() //将id弹出
type raw = {
  bodyChange: Function,
  ids: String
}
const {bodyChange, ids}:raw = inject('raw') as raw
</script>
<template>
  <div class="table-body-wapper">
    <table class="table-body" border="0" cellpadding="0" cellspacing="0">
      <tbody>
        <tr v-for="item in props.data" :class="{ actived: ids && item?.id == ids }" @click="bodyChange(item.id+'')">
          <td v-for="iterator in loopKey">
            <span v-if="!slotList.includes(iterator)">{{ item[iterator] }}</span>
            <slot :name="iterator"></slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template> 
<style lang="scss" scoped>
.table-body-wapper {
  overflow: hidden;
  flex: 1;
  padding: 5px 0;

  .table-body {
    border-collapse: separate;
    width: 100%;

    tbody {
      flex-direction: column;
      border-radius: 0 0 6px 6px;
      display: flex;

      tr {
        line-height: 30px;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        
        border-radius: 5px;
        td {
          padding: 4px 11px;
          min-width: 70px;
          flex: 1;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        &:hover {
          background-color: #e6e6e6;
          cursor: pointer;
        }
      }

      .actived {
        background-color: #d7d7d7;
      }
    }
  }
}
</style>
