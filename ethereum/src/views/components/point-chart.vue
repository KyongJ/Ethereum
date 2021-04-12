<template>
  <div>
    <div id="main" style="width: 400px; height: 300px" ref="myCharts"></div>
  </div>
</template>

<script>
import ecStat from "echarts-stat";
export default {
  props: {
    chartData: Object,
  },
  data() {
    return {};
  },
  mounted() {
    const EdgToNode = this.formatData(this.chartData);
    this.drawLinerRegression(EdgToNode);
  },
  methods: {
    formatData(data) {
      let arr = [];
      let right = data.arr[0];
      let left = data.arr[1];
      for (let i in right) {
        arr[i] = [left[i], right[i]];
      }
      return arr;
    },

    drawLinerRegression(arr) {
      const myChart = this.$echarts.init(this.$refs.myCharts);
      this.$echarts.registerTransform(ecStat.transform.regression);
      const option = {
        dataset: [
          {
            source: arr,
          },
          {
            transform: {
              type: "ecStat:regression",
              // 'linear' by default.
              // config: { method: 'linear', formulaOn: 'end'}
            },
          },
        ],
        // title: {
        //   text: "Linear Regression",
        //   left: "center",
        //   bottom: "0%",
        // },
        legend: {
          top: 5,
        },
        grid: {
          left: "0%",
      
    
          containLabel: true,
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
          },
        },
        xAxis: {
          name: "Nodes/sliding",
          nameLocation: "middle",
          nameTextStyle: {
            lineHeight: 40,
          },
          splitLine: {
            lineStyle: {
              type: "dashed",
            },
          },
        },
        yAxis: {
          name: "Edges/sliding",
          splitLine: {
            lineStyle: {
              type: "dashed",
            },
          },
        },
        series: [
          {
            name: "scatter",
            type: "scatter",
          },
          {
            name: "line",
            type: "line",
            datasetIndex: 1,
            symbolSize: 0.1,
            symbol: "circle",
            label: { show: true, fontSize: 16 },
            labelLayout: { dx: -20 },
            encode: { label: 2, tooltip: 1 },
          },
        ],
      };
      myChart.setOption(option);
    },
  },
};
</script>

<style>
</style>