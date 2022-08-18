<template>
  <div class="an-table">
    <div class="header">
      <slot name="header">
        <div class="title">{{ title }}</div>
        <div class="handler">
          <slot name="headerHandler"></slot>
        </div>
      </slot>
    </div>
    <el-table
      :data="listData"
      border
      style="width: 100%"
      v-bind="childrenProps"
    >
      <el-table-column
        v-if="showSelection"
        type="selection"
        align="center"
        width="60"
      ></el-table-column>
      <el-table-column
        v-if="showIndex"
        type="index"
        label="#"
        align="center"
        width="60"
      ></el-table-column>
      <template v-for="item in propList" :key="item.prop">
        <el-table-column v-bind="item" align="center" show-overflow-tooltip>
          <template #default="scope">
            <slot :name="item.prop" :row="scope.row">
              {{ scope.row[item.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="footer" v-if="showPagination">
      <slot name="footer">
        <el-pagination
          v-model:currentPage="pageData.currentPage"
          v-model:page-size="pageData.pageSize"
          :page-sizes="[10, 20, 30, 40]"
          small
          background="#f3f3f3"
          layout="total, sizes, prev, pager, next, jumper"
          :total="listCount"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue'
import { IUserTable } from './types'
export default defineComponent({
  props: {
    title: {
      type: String,
      default: ''
    },
    listData: {
      type: Array,
      required: true
    },
    listCount: {
      type: Number,
      required: true
    },
    propList: {
      type: Array as PropType<IUserTable[]>,
      required: true
    },
    showIndex: {
      type: Boolean,
      default: false
    },
    showSelection: {
      type: Boolean,
      default: false
    },
    showPagination: {
      type: Boolean,
      default: true
    },
    pageInfo: {
      type: Object,
      default: () => ({
        currentPage: 1,
        pageSize: 10
      })
    },
    childrenProps: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['update:page'],
  setup(props, { emit }) {
    const pageData = ref({ ...props.pageInfo })
    const handleSizeChange = (pageSize: number) => {
      pageData.value.pageSize = pageSize
    }
    const handleCurrentChange = (currentPage: number) => {
      pageData.value.currentPage = currentPage
    }
    watch(
      pageData,
      (newValue) => {
        emit('update:page', newValue)
      },
      { deep: true }
    )
    return {
      handleSizeChange,
      handleCurrentChange,
      pageData
    }
  }
})
</script>

<style scoped lang="less">
.header {
  display: flex;
  height: 45px;
  padding: 0 5px;
  justify-content: space-between;
  align-items: center;
  .title {
    font-size: 20px;
    font-weight: 700;
  }
}
.footer {
  display: flex;
  justify-content: flex-end;
  padding: 10px;
}
</style>
