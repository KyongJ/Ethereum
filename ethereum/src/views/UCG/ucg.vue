<template>
  <div class="uug-gini-page">
    <div class="container">
      <div class="chart">
        <div class="line">
          <div class="box">
            <div class="title">合约数量演化</div>
            <my-chart v-if="hasData" :chart-data="contractNum" ></my-chart>
          </div>
          <div class="box flex-1">从图来看，智能合约的发展也经历了三个阶段。
            与UUG不同的是，“爆发”的时间变得更短了，且在“退烧”后又迎来了新的一次爆发。
            </div>
        </div>
        <div class="line">
          <div class="box">
            <div class="title">合约创建数量演化趋势</div>
            <my-chart v-if="hasData" :chart-data="contractCreated"></my-chart>
          </div>
          <div class="box flex-1">显示了重新繁荣主要是由Contract引起的。
            EOAs创建的合同数量与Contract创建的合同数量整体趋势几乎没有差别，除了最后两个时间窗周期。</div>
        </div>
       
        
                
      </div>
    </div>
  </div>
</template>

<script>
import myChart from "../components/charts";
import contractNum from "../../assets/js/contractNum.json";
import contractCreated from "../../assets/js/ContractCreated.json";


export default {
  components: {
    myChart,
  },
  data() {
    return {
      contractNum: {},
      contractCreated: {},
     
      hasData: false,
    };
  },
  mounted() {
    this.contractNum = this.formatData(contractNum);
    this.contractCreated = this.formatData(contractCreated);

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
.uug-gini-page {
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
