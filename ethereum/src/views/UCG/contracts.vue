<template>
  <div class="uug-gini-page">
    <div class="container">
      <div>
        <div class="line">
          <div class="box">
            <div class="title">合约调用演化</div>
            <my-chart v-if="hasData" :chart-data="contractCalled" ></my-chart>
          </div>
          <div class="box flex-1">分析结果</div>
        </div>
        <div class="line">
          <div class="box">
            <div class="title">名字2</div>
            <my-chart v-if="hasData" :chart-data="ucgValue"></my-chart>
          </div>
          <div class="box flex-1">分析结果</div>
        </div>

         <div class="line">
          <div class="box">
            <div class="title">名字3</div>
            <my-chart v-if="hasData" :chart-data="calledByEOAOrContract"></my-chart>
          </div>
          <div class="box flex-1">分析结果</div>
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
