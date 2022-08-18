<template>
  <div class="user">
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @searchBtnClick="handleSearchClick"
    ></page-search>
    <page-content
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      pageName="menu"
    ></page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { usePageSearch } from '@/hooks/usePageSearch'
import PageSearch from '@/components/pageSearch'
import PageContent from '@/components/pageContent'
import searchFormConfig from './config/search.config'
import contentTableConfig from './config/content.config'
export default defineComponent({
  name: 'menu',
  components: {
    PageSearch,
    PageContent
  },
  setup() {
    const [pageContentRef, handleSearchClick, handleResetClick] =
      usePageSearch()
    return {
      searchFormConfig,
      contentTableConfig,
      handleResetClick,
      handleSearchClick,
      pageContentRef
    }
  }
})
</script>

<style scoped lang="less"></style>
