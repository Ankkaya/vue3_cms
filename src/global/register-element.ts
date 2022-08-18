import {
  ElButton,
  ElInput,
  ElTable,
  ElTabPane,
  ElForm,
  ElFormItem,
  ElLink,
  ElCheckbox,
  ElContainer,
  ElAside,
  ElHeader,
  ElMain,
  ElMenu,
  ElSubMenu,
  ElMenuItem,
  ElMenuItemGroup
} from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { App } from 'vue'
const components = [
  ElButton,
  ElInput,
  ElTable,
  ElTabPane,
  ElForm,
  ElFormItem,
  ElLink,
  ElCheckbox,
  ElContainer,
  ElAside,
  ElHeader,
  ElMain,
  ElMenu,
  ElSubMenu,
  ElMenuItem,
  ElMenuItemGroup
]
export default function registerApp(app: App) {
  for (const component of components) {
    app.component(component.name, component)
  }

  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
}
