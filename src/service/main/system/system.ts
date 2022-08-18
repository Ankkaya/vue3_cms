import anRequest from '@/service'
import { IDataType } from '@/service/type'

export function getPageListData(url: string, queryInfo: any) {
  return anRequest.post<IDataType>({
    url: url,
    data: queryInfo
  })
}

export function deletePageData(url: string) {
  return anRequest.delete<IDataType>({
    url: url
  })
}

export function newPageData(url: string, newData: any) {
  return anRequest.post<IDataType>({
    url: url,
    data: newData
  })
}

export function editPageData(url: string, editData: any) {
  return anRequest.patch<IDataType>({
    url: url,
    data: editData
  })
}
