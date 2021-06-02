<template>
  <div class="uug-graph-page">
    <div class="container">
      <div class="chart">
        <div class="line">
          <div class="box flex-1">
            <div class="title">UUG图大小演变图</div>
            <my-chart v-if="hasData" :chart-data="chartData"></my-chart>
          </div>
          <div class="box flex-1">以太坊的发展分为三个阶段：“缓慢启动”缓慢增长阶段（2015年8月5日∼2016年12月20日），
            “爆发”快速增长阶段（2016年12月20日∼2017年12月20日），以及“退烧”大幅降低阶段（2017年12月20日∼2018年6月20日）。
            与以太价格演化图相比，我推测UUG中节点数、边缘数以及新节点数的增长受到了以太价格的严重影响。
            即以太价格的上涨吸引了更多外部用户前来交易，而以太价格的下跌导致交易量的减少以及用户的流失。</div>
        </div>
        <div class="line">
          <div class="box flex-1">
            <div class="title">节点与边关系图</div>
            <point-chart v-if="hasData" :chart-data="chartData"></point-chart>
          </div>
          <div class="box flex-1">不同滑动时间窗下节点数与边数的相关性也是值得我们探究的。
            一般来说，随着时间的推移，随机图的变化会遵循一种版本关系
其中e(t)和n(t)表示t时刻图的边数和节点数,α是严格位于1到2之间的指数。本图正是展示了滑动窗口的这种相关性。请注意，R平方值非常接近1，表明我的模型非常适合本次实验。

            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import myChart from "../components/charts";
import pointChart from "../components/point-chart";
import demo from "../../assets/js/demo1.json";

export default {
  components: {
    myChart,
    pointChart,
  },
  data() {
    return {
      chartData: {
        xAxis: [],
        nodeSum: [],
        edgeSum: [],
        newNodeSum: [],
        arr: [],
      },
      hasData: false,
    };
  },
  mounted() {
    const { data } = demo;
    this.formatData(data.data);
    // this.$axios
    //   .get("https://api.coindesk.com/v1/bpi/currentprice.json")
    //   .then((res) => {
    //     console.log(res);
    //   });
  },
  methods: {
    formatData(data) {
      console.log(data);

      let xAxis = [];
      let nodeSum = [];
      let edgeSum = [];
      let newNodeSum = [];
      data.forEach((item) => {
        xAxis.push(item.timeWindow);
        nodeSum.push(item.nodeSum);
        edgeSum.push(item.edgeSum);
        newNodeSum.push(item.newNodeSum);
      });
      this.chartData.xAxis = xAxis;
      this.chartData.yAxis = ["nodeSum", "edgeSum", "newNodeSum"];

      this.chartData.arr.push(nodeSum);
      this.chartData.arr.push(edgeSum);
      this.chartData.arr.push(newNodeSum);

      this.hasData = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.uug-graph-page {
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
      background-color: white;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
        0 4px 6px -2px rgba(0, 0, 0, 0.05);
    }
  }
}
</style>
