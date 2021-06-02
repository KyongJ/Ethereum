<template>
  <div class="uug-gini-page">
    <div class="container">
      <div class="chart">
        <div class="line">
          <div class="box">
            <div class="title">度分布基尼系数</div>
            <my-chart v-if="hasData" :chart-data="giniData"  y-label="Degree"></my-chart>
          </div>
          <div class="box flex-1">UUG度的基尼系数如图3-12所示，横轴为滑动窗口序号。
            我们发现无论是总体度、入度还是出度基尼系数在0.4以上。
            这意味着无论在哪个时间段，节点的度分布都是不平衡的。
            在滑动图中，入度的基尼系数都小于出度的基尼系数，说明出度的分布比起入度更不平衡。
            总体度分布的基尼系数在[0.5,0.6]范围内波动。但没有任何迹象表明其基尼系数的走向。
            因此，我们可以得出结论，“以太坊交易网络在度分配方面，
            总是不公平的，但不会让富人变得更富。</div>
        </div>
       
        
                
      </div>
    </div>
  </div>
</template>

<script>
import myChart from "../components/charts";
import giniData from "../../assets/js/Gini.json";


export default {
  components: {
    myChart,
  },
  data() {
    return {
      giniData: {},
     
      hasData: false,
    };
  },
  mounted() {
    this.giniData = this.formatData(giniData);

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
