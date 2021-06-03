<template>
  <div>
    <div id="main" style="width: 400px; height: 300px" ref="myCharts"></div>
  </div>
</template>

<script>
export default {
  props: {
    chartData: Object,
    xLabel:String,
    yLabel:String
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
          name: this.xLabel||"time Window ID",
          nameLocation: "middle",
          nameTextStyle: {
            lineHeight: 40,
          },
          type: "category",
          boundaryGap: false,
          data: this.chartData.xAxis,
        }, //纵坐标使用科学计数法表示
        yAxis: {
          name: this.yLabel||"Num",
          axisLabel: {
            formatter: function (value) {
              var res = value.toString();
              var numN1 = 0;
              var numN2 = 1;
              var num1 = 0;
              var num2 = 0;
              var t1 = 1;
              for (var k = 0; k < res.length; k++) {
                if (res[k] == ".") t1 = 0;
                if (t1) num1++;
                else num2++;
              }

              if (Math.abs(value) < 1 && res.length > 4) {
                for (var i = 2; i < res.length; i++) {
                  if (res[i] == "0") {
                    numN2++;
                  } else if (res[i] == ".") continue;
                  else break;
                }
                var v = parseFloat(value);
                v = v * Math.pow(10, numN2);
                return v.toString() + "e-" + numN2;
              } else if (num1 > 4) {
                if (res[0] == "-") numN1 = num1 - 2;
                else numN1 = num1 - 1;
                var val = parseFloat(value);
                val = val / Math.pow(10, numN1);
                if (num2 > 4) val = val.toFixed(4);
                return val.toString() + "e" + numN1;
              } else return parseFloat(value);
            },
          },
        },
        series: [
          {
            name: this.chartData.yAxis[0],
            type: "line",
            // stack: "总量",
            smooth:true,
            data: this.chartData.arr[0],
          },
          {
            name: this.chartData.yAxis[1],
            type: "line",
            // stack: "总量",
             smooth:true,
            data: this.chartData.arr[1],
          },
          {
            name: this.chartData.yAxis[2],
            type: "line",
            // stack: "总量",
             smooth:true,
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