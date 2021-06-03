<template>
  <div class="uug-gini-page">
    <div class="container">
      <div class="chart">
        <div class="line">
          <div class="box">
            <div class="title">合约调用与被调用数量演化</div>
            <my-chart v-if="hasData" :chart-data="contractCalled" ></my-chart>
          </div>
          <div class="box flex-1">显示了被调用的合约数量和合约调用
            都经历了与其他元素开发类似的三个阶段，
            即“缓慢启动”缓慢增长阶段，
            “爆发”快速增长阶段，以及“退烧”大幅降低阶段。</div>
        </div>
        <div class="line">
          <div class="box">
            <div class="title">平均调用值演化图</div>
            <my-chart v-if="hasData" :chart-data="ucgValue" y-label="ether"></my-chart>
          </div>
          <div class="box flex-1">显示了Contract调用契约的次数远远多于EOAs。我们可以得出结论，这些合同主要由Contract调用</div>
        </div>

         <div class="line">
          <div class="box">
            <div class="title">合约调用者数量演化</div>
            <my-chart v-if="hasData" :chart-data="calledByEOAOrContract"></my-chart>
          </div>
          <div class="box flex-1">EOA调用合约时，平均花费的以太比Contract更多</div>
        </div>
       
        
                
      </div>
    </div>
  </div>
</template>

<script>
import myChart from "../components/charts";
import contractCalled from "../../assets/js/contract_called.json";
import ucgValue from "../../assets/js/ucgValue.json";
import calledByEOAOrContract from "../../assets/js/calledByEOAOrContract.json";


export default {
  components: {
    myChart,
  },
  data() {
    return {
      contractCalled: {},
      ucgValue: {},
      calledByEOAOrContract: {},
     
      hasData: false,
    };
  },
  mounted() {
    this.contractCalled = this.formatData(contractCalled);
    this.ucgValue = this.formatData(ucgValue);
    this.calledByEOAOrContract = this.formatData(calledByEOAOrContract);

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
