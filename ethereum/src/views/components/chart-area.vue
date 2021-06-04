<template>
  <div>
    <div id="main" style="width: 100%; height: 350px" ref="myCharts"></div>
  </div>
</template>
<script>
export default {
  props: {
    chartData: Object,
  },
  mounted() {

    this.drawChart();
  },
  methods: {
    drawChart() {
      var myChart = this.$echarts.init(this.$refs.myCharts);
      var option = {
        color: ["#5E77FF", "#00DDFF", "#37A2FF", "#FF0087", "#FFBF00"],
        title: {
          text: "用户总数、交易总数时间走势图",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        legend: {
          data: this.chartData.yAxis,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: this.chartData.xAxis,
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: this.chartData.yAxis[0],
            type: "line",
            stack: "总量",
            smooth: true,
            lineStyle: {
              width: 3,
              type: "solid",
            },
            showSymbol: false,

            areaStyle: {
              opacity: 0.8,
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#5E77FF",
                },
                {
                  offset: 1,
                  color: "rgba(255, 255, 255,0.1)",
                },
              ]),
            },
            emphasis: {
              focus: "series",
            },
            data: this.chartData.arr[0],
          },
          {
            name: this.chartData.yAxis[1],
            type: "line",
            stack: "总量",
            smooth: true,
            lineStyle: {
              width: 3,
              type: "solid",
            },
            showSymbol: false,

            areaStyle: {
              opacity: 0.8,
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#5E77FF",
                },
                {
                  offset: 1,
                  color: "rgba(255, 255, 255,0.1)",
                },
              ]),
            },
            emphasis: {
              focus: "series",
            },
            data: this.chartData.arr[1],
          },
        ],
      };
      myChart.setOption(option);
    },
  },
};
</script>