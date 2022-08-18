<template>
  <div class="pie-echart">
    <an-echart :options="options"></an-echart>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue'
import AnEchart from '@/baseUi/echart'
import * as echarts from 'echarts'
const props = defineProps<{
  xLabels: string[]
  values: any[]
}>()
const options = computed(() => {
  let yMax = 500
  let dataShadow = []

  for (let i = 0; i < props.values.length; i++) {
    dataShadow.push(yMax)
  }

  const option = {
    title: {
      text: '特性示例：渐变色 阴影 点击缩放',
      subtext: 'Feature Sample: Gradient Color, Shadow, Click Zoom'
    },
    xAxis: {
      data: props.xLabels,
      axisLabel: {
        inside: true,
        color: '#fff'
      },
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      },
      z: 10
    },
    yAxis: {
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: '#999'
      }
    },
    dataZoom: [
      {
        type: 'inside'
      }
    ],
    series: [
      {
        type: 'bar',
        showBackground: true,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#83bff6' },
            { offset: 0.5, color: '#188df0' },
            { offset: 1, color: '#188df0' }
          ])
        },
        emphasis: {
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#2378f7' },
              { offset: 0.7, color: '#2378f7' },
              { offset: 1, color: '#83bff6' }
            ])
          }
        },
        data: props.values
      }
    ]
  }

  return option
  // Enable data zoom when user click bar.
  // const zoomSize = 6
  // myChart.on('click', function (params) {
  //   console.log(dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)])
  //   myChart.dispatchAction({
  //     type: 'dataZoom',
  //     startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
  //     endValue:
  //       dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
  //   })
  // })
})
</script>

<style scoped></style>
