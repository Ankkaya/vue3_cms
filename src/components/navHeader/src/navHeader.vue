<template>
  <div class="nav-header">
    <div class="header-icon">
      <el-icon :size="30" @click="handleClick">
        <component :is="isFold ? 'Fold' : 'Expand'"></component>
      </el-icon>
    </div>
    <div class="content">
      <an-breadcrumb :breadcrumbs="breadcrumbs" />
      <user-info />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import UserInfo from './userInfo.vue'
import AnBreadcrumb from '@/baseUi/breadcrumb'
import { useStore } from '@/store'
import { pathMenuToBreadcrumbs } from '@/utils/mapMenus'
import { useRoute } from 'vue-router'

export default defineComponent({
  emits: ['foldChange'],
  components: {
    UserInfo,
    AnBreadcrumb
  },
  setup(props, { emit }) {
    const isFold = ref(false)
    const handleClick = () => {
      isFold.value = !isFold.value
      emit('foldChange', isFold.value)
    }

    const route = useRoute()
    const store = useStore()
    const userMenus = store.state.loginModule.userMenus
    const breadcrumbs = computed(() => {
      return pathMenuToBreadcrumbs(userMenus, route.path)
    })
    return {
      isFold,
      handleClick,
      breadcrumbs
    }
  }
})
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  .header-icon {
    padding-top: 5px;
  }
  .content {
    flex: 1;
    padding: 0 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
