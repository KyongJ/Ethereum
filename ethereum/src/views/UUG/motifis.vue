<template>
  <div class="ugg-motifis-page">
    <div class="container">
      <div class="chart">
        <div class="line">
          <div class="box flex-1">
            <div class="title">闭合三元组总数演化趋势</div>
            <my-chart v-if="hasData" :chart-data="sumData"></my-chart>
          </div>
          <div class="box flex-1">分析结果</div>
        </div>
        <div class="line">
          <div class="box">
            <div class="title">闭合三元组占比演化趋势</div>
            <my-chart v-if="hasData" :chart-data="proData"></my-chart>
          </div>
          <div class="box flex-1">分析结果</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import myChart from "../components/charts";
import closedTripletData from "../../assets/js/closedTriplet.json";



export default {
  components: {
    myChart,
  },
  data() {
    return {
      chartData: {},
      sumData:{},
      proData:{},
      hasData: false,
      hasAvgData: false,
    };
  },
  mounted() {
    this.chartData = this.formatData(closedTripletData);

    console.log(this.chartData  )
    this.sumData={...this.chartData};

    this.sumData.yAxis=[this.chartData.yAxis[0]];
    this.sumData.arr=[this.chartData.arr[0]]

    this.proData={...this.chartData};
    this.proData.yAxis=[this.chartData.yAxis[1]];
    this.proData.arr=[this.chartData.arr[1]]

    // this.$axios
    //   .get("https://api.coindesk.com/v1/bpi/currentprice.json")
    //   .then((res) => {
    //     console.log(res);
    //   });
  },
  methods: {
    formatData(oriData) {
      let { data } = oriData;
      data = data.data;

      let chartData = {};
      let obj = {};
      let xAxis = [];

      data.forEach((item) => {
        xAxis.push(item.timeWindow);
        for (let key in item) {
          if (key != "id" && key != "timeWindow") {
            if (!obj[key]) {
              obj[key] = [item[key]];
            } else {
              obj[key].push(item[key]);
            }
          }
        }
      });
      chartData.xAxis = xAxis;
      chartData.yAxis = Object.keys(obj);
      chartData.arr = Object.values(obj);
      this.hasData = true;
      return chartData;
    },
  },
};
</script>

<style lang="scss" scoped>
.ugg-motifis-page {
  color: #444;
  .flex-1 {
    flex: 1;
  }
     .chart {
      width: 80%;
    }
  .container {
    display: flex;
    align-items: center;
    justify-content: space-around;

    .chart {
      width: 80%;
    }

    .line {
      display: flex;
      margin-bottom: 30px;
    }

    .title {
      text-align: center;
      font-weight: bold;
      margin-bottom: 10px;
    }

    .box {
      margin-right: 30px;
      padding: 30px;
      margin-bottom: 30px;
      background-color: white;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
        0 4px 6px -2px rgba(0, 0, 0, 0.05);
    }
  }
}
</style>
