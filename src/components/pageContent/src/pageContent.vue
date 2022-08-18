<template>
  <div class="page-content">
    <an-table
      :listData="dataList"
      :listCount="dataCount"
      v-bind="contentTableConfig"
      v-model:page="pageInfo"
    >
      <template #headerHandler>
        <el-button
          type="primary"
          icon="Plus"
          v-if="isCreate"
          @click="handleNewClick"
          >新增</el-button
        >
        <el-button type="primary" icon="Refresh" v-if="isQuery">刷新</el-button>
      </template>
      <template #createAt="scope">
        {{ $filters.formatTime(scope.row.createAt) }}
      </template>
      <template #updateAt="scope">
        {{ $filters.formatTime(scope.row.updateAt) }}
      </template>
      <template #handler="scope">
        <el-button
          type="primary"
          link
          size="small"
          icon="Edit"
          v-if="isUpdate"
          @click="handleEditClick(scope.row)"
          >编辑</el-button
        >
        <el-button
          v-if="isDelete"
          type="danger"
          link
          size="small"
          icon="Delete"
          @click="handleDeleteClick(scope.row)"
          >删除</el-button
        >
      </template>
      <template
        v-for="slot in slotLists"
        :key="slot.prop"
        v-slot:[slot.prop]="scope"
      >
        <slot :name="slot.prop" :row="scope.row">{{
          scope.row[slot.prop]
        }}</slot>
      </template>
    </an-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
import { useStore } from '@/store'
import AnTable from '@/baseUi/table'
import { usePermission } from '@/hooks/usePermission'

export default defineComponent({
  props: {
    contentTableConfig: {
      type: Object,
      required: true
    },
    pageName: {
      type: String,
      required: true
    }
  },
  components: {
    AnTable
  },
  emits: ['newBtnClick', 'editBtnClick'],
  setup(props, { emit }) {
    // 判断按钮权限
    const isCreate = usePermission(props.pageName, 'create')
    const isUpdate = usePermission(props.pageName, 'update')
    const isDelete = usePermission(props.pageName, 'delete')
    const isQuery = usePermission(props.pageName, 'query')

    const store = useStore()
    const pageInfo = ref({
      currentPage: 1,
      pageSize: 10
    })
    const getPageData = (queryInfo: any = {}) => {
      if (!isQuery) return
      store.dispatch('systemModule/getPageListAction', {
        pageName: props.pageName,
        queryInfo: {
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo
        }
      })
    }
    getPageData()
    watch(
      pageInfo,
      () => {
        getPageData()
      },
      {
        deep: true
      }
    )
    const dataList = computed(() =>
      store.getters['systemModule/pageListData'](props.pageName)
    )
    const dataCount = computed(() =>
      store.getters['systemModule/pageListDataCount'](props.pageName)
    )

    // 遍历表格列可自定义插槽项
    const slotLists = props.contentTableConfig.propList.filter((value: any) => {
      if (value.prop === 'createAt') return false
      if (value.prop === 'updateAt') return false
      if (value.prop === 'handler') return false
      return true
    })

    // 表格按钮操作
    const handleDeleteClick = (rowData: any) => {
      store.dispatch('systemModule/deletePageDataAction', {
        pageName: props.pageName,
        id: rowData.id
      })
    }
    const handleNewClick = () => {
      emit('newBtnClick')
    }
    const handleEditClick = (rowData: any) => {
      emit('editBtnClick', rowData)
    }

    return {
      dataList,
      dataCount,
      getPageData,
      pageInfo,
      slotLists,
      isCreate,
      isUpdate,
      isDelete,
      isQuery,
      handleDeleteClick,
      handleNewClick,
      handleEditClick
    }
  }
})
</script>

<style scoped lang="less">
.page-content {
  padding: 20px 20px 0px;
  border-top: 20px solid #f5f5f5;
}
</style>
