/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// volar 检测严格，模板中使用 script 中未声明变量
declare let $store: any

declare let $filters: any

declare module '*.json'
