<template>
  <div class="rose-echart">
    <an-echart :options="options"></an-echart>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue'
import AnEchart from '@/baseUi/echart'
import { IDataType } from '../types'

const props = defineProps<{
  roseData: IDataType[]
}>()
const options = computed(() => {
  return {
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    series: [
      {
        name: 'Nightingale Chart',
        type: 'pie',
        radius: [40, 120],
        center: ['50%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 8
        },
        data: props.roseData
      }
    ]
  }
})
</script>

<style scoped></style>
