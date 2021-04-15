<template>
  <div class="ugg-deg-page">
    <div class="container">
      <div>
        <div class="line">
          <my-chart v-if="hasData" :chart-data="chartData"></my-chart>
        </div>
        <div class="line">
          <my-chart v-if="hasData" :chart-data="avgTxNumData"></my-chart>
          <my-chart v-if="hasData" :chart-data="newOldAvgTxNum"></my-chart>
        </div>
        <div class="line">
          <my-chart v-if="hasData" :chart-data="txValue"></my-chart>
          <my-chart v-if="hasData" :chart-data="avgTxValue"></my-chart>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import myChart from "../components/charts";
import txNum from "../../assets/js/txNum.json";
import AvgTxNum from "../../assets/js/AvgTxNum.json";
import newOldAvgTxNum from "../../assets/js/NewOldAvgTxNum.json";
import txValue from "../../assets/js/TxValue.json";
import avgTxValue from "../../assets/js/AvgTxValue.json";

export default {
  components: {
    myChart,
  },
  data() {
    return {
      chartData: {},
      avgTxNumData: {},
      newOldAvgTxNum: {},
      txValue: {},
      avgTxValue: {},
      hasData: false,
      hasAvgData: false,
    };
  },
  mounted() {
    this.chartData = this.formatData(txNum);
    this.avgTxNumData = this.formatData(AvgTxNum);
    this.newOldAvgTxNum = this.formatData(newOldAvgTxNum);
    this.txValue = this.formatData(txValue);
    this.avgTxValue = this.formatData(avgTxValue);
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
.ugg-deg-page {
  .container {
    display: flex;
    align-items: center;
   
    justify-content: center;

    .line {
      display: flex;
       justify-content: center;
      margin-bottom: 30px;
    }
  }
}
</style>
