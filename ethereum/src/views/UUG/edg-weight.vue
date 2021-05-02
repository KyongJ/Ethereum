<template>
  <div class="ugg-deg-page">
    <div class="container">
      <div>
        <div class="line">
          <div class="box">
            <div class="title">交易总数演化图</div>
            <my-chart v-if="hasData" :chart-data="chartData"></my-chart>
          </div>
          <div class="box flex-1">分析结果</div>
        </div>
        <div class="box">
          <div class="line">
            <div>
              <div class="title">平均交易数演化图</div>
              <my-chart v-if="hasData" :chart-data="avgTxNumData"></my-chart>
            </div>
            <div>
              <div class="title">新老节点平均交易数</div>
              <my-chart v-if="hasData" :chart-data="newOldAvgTxNum"></my-chart>
            </div>
          </div>
          <div>分析结果</div>
        </div>
        <div class="line box">
          <div>
            <div class="title">交易总值演化图</div>
            <my-chart v-if="hasData" :chart-data="txValue"></my-chart>
          </div>
          <div>
            <div class="title">平均交易值演化图</div>
            <my-chart v-if="hasData" :chart-data="avgTxValue"></my-chart>
          </div>
        </div>
                <div class="line">
          <div class="box">
            <div class="title">交易家住分布CDF图</div>
            <my-chart v-if="hasData" :chart-data="txvalueCdf"></my-chart>
          </div>
          <div class="box flex-1">分析结果</div>
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
import txvalueCdf from "../../assets/js/txvalueCdf(2).json";

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
      txvalueCdf:{},
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
    this.txvalueCdf = this.formatData2(txvalueCdf);
    console.log(this.txvalueCdf)
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
     formatData2(oriData) {
      let { data } = oriData;
      data = data.data;

      let chartData = {};
      let obj = {};
      let xAxis = [];

      data.forEach((item) => {
        xAxis.push(item.txvalue);
        for (let key in item) {
          if (key != "id" && key != "txvalue") {
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
  color: #444;
  .flex-1 {
    flex: 1;
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
