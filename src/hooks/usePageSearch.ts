import PageContent from '@/components/pageContent'
import { ref } from 'vue'

export function usePageSearch() {
  const pageContentRef = ref<InstanceType<typeof PageContent>>()
  const handleSearchClick = (queryInfo: any) => {
    pageContentRef.value?.getPageData(queryInfo)
  }
  const handleResetClick = () => {
    pageContentRef.value?.getPageData()
  }
  return [pageContentRef, handleSearchClick, handleResetClick]
}
