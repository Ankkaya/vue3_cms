<template>
  <div class="pie-echart">
    <an-echart :options="options"></an-echart>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue'
import AnEchart from '@/baseUi/echart'

const props = defineProps<{
  xLabels: string[]
  values: any[]
}>()
const options = computed(() => {
  return {
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: props.xLabels
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        stack: '总量',
        name: '分别销量',
        data: props.values,
        type: 'line',
        areaStyle: {}
      }
    ]
  }
})
</script>

<style scoped></style>
