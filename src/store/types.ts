import { ILoginState } from './login/types'
import { ISystemState } from './main/system/type'
import { IDashboardState } from './main/analysis/types'
export interface IRootState {
  entireDepartment: any[]
  entireRole: any[]
  entireMenu: any[]
}

export interface IRootWithModule {
  loginModule: ILoginState
  systemModule: ISystemState
  dashboardModule: IDashboardState
}

export type IStoreType = IRootState & IRootWithModule
