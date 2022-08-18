<template>
  <div class="role">
    <page-search
      @resetBtnClick="handleResetClick"
      @searchBtnClick="handleSearchClick"
      :searchFormConfig="searchFormConfig"
    ></page-search>
    <page-content
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      pageName="role"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    ></page-content>
    <page-modal
      ref="pageModalRef"
      :defaultInfo="defaultInfo"
      :modalConfig="modalConfig"
      :otherInfo="otherInfo"
      :pageName="'role'"
    >
      <div class="menu">
        <el-tree
          ref="elTreeRef"
          :props="{ children: 'children', label: 'name' }"
          node-key="id"
          :data="menuList"
          show-checkbox
          @check="handleCheckClick"
        />
      </div>
    </page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, nextTick } from 'vue'
import { useStore } from '@/store'
import { usePageSearch } from '@/hooks/usePageSearch'
import { usePageModal } from '@/hooks/usePageModal'
import PageSearch from '@/components/pageSearch'
import PageContent from '@/components/pageContent'
import PageModal from '@/components/pageModal'
import searchFormConfig from './config/search.config'
import contentTableConfig from './config/content.config'
import modalConfig from './config/modal.config'
import { ElTree } from 'element-plus'
import { mapMenuToLeafKeys } from '@/utils/mapMenus'
export default defineComponent({
  name: 'role',
  components: {
    PageSearch,
    PageContent,
    PageModal
  },
  setup() {
    const [pageContentRef, handleSearchClick, handleResetClick] =
      usePageSearch()

    // 编辑事件回调
    const elTreeRef = ref<InstanceType<typeof ElTree>>()
    const editCallback = (item: any) => {
      const leafKeys = mapMenuToLeafKeys(item.menuList)
      nextTick(() => {
        elTreeRef.value?.setCheckedKeys(leafKeys)
      })
    }
    const [pageModalRef, handleEditData, handleNewData, defaultInfo] =
      usePageModal(undefined, editCallback)

    // 获取权限列表
    const store = useStore()
    const menuList = computed(() => store.state.entireMenu)

    const otherInfo = ref({})
    const handleCheckClick = (data1: any, data2: any) => {
      console.log(data2)
      const checkKeys = data2.checkedKeys
      const halfCheckKeys = data2.halfCheckedKeys
      const menuList = [...checkKeys, ...halfCheckKeys]
      console.log(menuList)

      otherInfo.value = { menuList }
      console.log(otherInfo.value)
      console.log(otherInfo)
    }
    return {
      searchFormConfig,
      contentTableConfig,
      handleSearchClick,
      handleResetClick,
      pageContentRef,
      pageModalRef,
      modalConfig,
      handleNewData,
      handleEditData,
      defaultInfo,
      menuList,
      handleCheckClick,
      otherInfo,
      elTreeRef
    }
  }
})
</script>

<style scoped lang="less">
.menu {
  margin-left: 20px;
}
</style>
