<template>
  <div>
    <div id="main" style="width: 400px; height: 300px" ref="myCharts"></div>
  </div>
</template>

<script>
export default {
  props: {
    chartData: Object,
  },
  data() {
    return {};
  },
  mounted() {
    this.drawChart();
  },
  methods: {
    drawChart() {
      const myChart = this.$echarts.init(this.$refs.myCharts);

      // 指定图表的配置项和数据
      const option = {
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: this.chartData.yAxis,
        },
        grid: {
          left: "0%",
      
    
          containLabel: true,
        },
        toolbox: {
          feature: {
            // saveAsImage: {},
          },
        },
        xAxis: {
            name: "time Window ID",
          nameLocation: "middle",
          nameTextStyle: {
            lineHeight: 40,
          },
          type: "category",
          boundaryGap: false,
          data: this.chartData.xAxis,
          
        },
        yAxis: {
          name: "Num",
          type: "value",
        },
        series: [
          {
            name: this.chartData.yAxis[0],
            type: "line",
            stack: "总量",
            data: this.chartData.arr[0],
          },
          {
            name: this.chartData.yAxis[1],
            type: "line",
            stack: "总量",
            data: this.chartData.arr[1],
          },
          {
            name: this.chartData.yAxis[2],
            type: "line",
            stack: "总量",
            data: this.chartData.arr[2],
          },
        ],
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
  },
};
</script>

<style>
</style>