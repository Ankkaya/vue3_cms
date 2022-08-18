<template>
  <div class="page-search">
    <an-form v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <h2 class="header">条件搜索</h2>
      </template>
      <template #footer>
        <div class="btns">
          <el-button type="primary" @click="handleSearchClick">搜索</el-button>
          <el-button @click="handleResetClick">重置</el-button>
        </div>
      </template>
    </an-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import AnForm from '@/baseUi/form'
export default defineComponent({
  props: {
    searchFormConfig: {
      type: Object,
      required: true
    }
  },
  components: {
    AnForm
  },
  emits: ['resetBtnClick', 'searchBtnClick'],
  setup(props, { emit }) {
    const formItems = [...props.searchFormConfig.formItems]
    const formOriginData: any = {}

    for (const item of formItems) {
      formOriginData[item.field] = ''
    }

    const formData = ref(formOriginData)
    const handleSearchClick = () => {
      emit('searchBtnClick', formData.value)
    }
    const handleResetClick = () => {
      for (const key in formOriginData) {
        formData.value[key] = formOriginData[key]
      }
      emit('resetBtnClick')
    }
    return {
      formData,
      handleResetClick,
      handleSearchClick
    }
  }
})
</script>

<style scoped lang="less">
.header {
  text-align: center;
}

.btns {
  text-align: right;
  padding: 0 40px 20px 0;
}
</style>
