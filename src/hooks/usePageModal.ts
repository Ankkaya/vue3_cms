import PageModal from '@/components/PageModal.vue'
import { ref } from 'vue'

type CallbackFn = (item?: any) => void
export function usePageModal(newCb?: CallbackFn, editCb?: CallbackFn) {
  const pageModalRef = ref<InstanceType<typeof PageModal>>()
  const handleNewData = () => {
    if (pageModalRef.value) {
      defaultInfo.value = {}
      pageModalRef.value.dialogVisible = true
    }
    newCb && newCb()
  }
  const defaultInfo = ref({})
  const handleEditData = (rowData: any) => {
    if (pageModalRef.value) {
      defaultInfo.value = { ...rowData }
      pageModalRef.value.dialogVisible = true
    }
    editCb && editCb(rowData)
  }
  return [pageModalRef, handleEditData, handleNewData, defaultInfo]
}
