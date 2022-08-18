<template>
  <div class="box-card">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>{{ title }}</span>
        </div>
      </template>
      <div class="card-item">
        <slot></slot>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  setup() {
    return {}
  }
})
</script>

<style scoped lang="less">
.box-card {
  &:deep(.el-card__header) {
    padding: 10px 20px !important;
  }
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 30px;
  }
  .card-item {
    margin-bottom: 10px;
  }
}
</style>
