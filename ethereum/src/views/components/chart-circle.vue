<template>
  <div>
    <div id="main" style="width: 100%; height: 250px" ref="myCharts"></div>
  </div>
</template>

<script>
export default {
  props: {
    chartData: Array,
  },
  mounted() {
    this.drawChart();
  },
  methods: {
    drawChart() {
      var myChart = this.$echarts.init(this.$refs.myCharts);

      var option = {
        tooltip: {
          trigger: "item",
        },
        legend: {
          bottom: "0",
          left: "center",
           
        },
        series: [
          {
            name: "value",
            type: "pie",
            radius: ["30%", "50%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 5,
              borderColor: "#fff",
              borderWidth: 2,
            },
            label: {
              formatter: "{d}%",
            },
            emphasis: {
              label: {
                fontWeight: "bold",
                fontSize:"18"
              },
            },

            labelLine: {
              show: true,
            },
            data: this.chartData,
          },
        ],
      };

      myChart.setOption(option);
    },
  },
};
</script>