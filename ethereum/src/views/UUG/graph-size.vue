<template>
  <div class="uug-graph-page">
    <div class="container">
      <div class="chart">
        <div class="line">
          <div class="box flex-1">
            <div class="title">UUG图大小演变图</div>
            <my-chart v-if="hasData" :chart-data="chartData"></my-chart>
          </div>
          <div class="box flex-1">分析结果</div>
        </div>
        <div class="line">
          <div class="box flex-1">
            <div class="title">节点与边关系图</div>
            <point-chart v-if="hasData" :chart-data="chartData"></point-chart>
          </div>
          <div class="box flex-1">分析结果</div>
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
