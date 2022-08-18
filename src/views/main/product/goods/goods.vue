<template>
  <div class="goods">
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @searchBtnClick="handleSearchClick"
    ></page-search>
    <page-content
      :contentTableConfig="contentTableConfig"
      pageName="goods"
      ref="pageContentRef"
    >
      <template #status="scope">
        <el-tag :type="scope.row.enable === 0 ? 'danger' : 'success'">{{
          scope.row.status ? '启用' : '禁用'
        }}</el-tag>
      </template>
      <template #imgUrl="scope">
        <el-image
          style="width: 60px; height: 60px"
          :src="scope.row.imgUrl"
          :preview-src-list="[scope.row.imgUrl]"
        />
      </template>
    </page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { usePageSearch } from '@/hooks/usePageSearch'
import PageContent from '@/components/pageContent'
import PageSearch from '@/components/pageSearch'
import contentTableConfig from './config/content.config'
import searchFormConfig from './config/search.config'
export default defineComponent({
  name: 'goods',
  components: {
    PageContent,
    PageSearch
  },
  setup() {
    const [pageContentRef, handleSearchClick, handleResetClick] =
      usePageSearch()
    return {
      contentTableConfig,
      searchFormConfig,
      handleResetClick,
      handleSearchClick,
      pageContentRef
    }
  }
})
</script>

<style scoped></style>
