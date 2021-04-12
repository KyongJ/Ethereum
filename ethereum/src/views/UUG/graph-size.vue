<template>
  <div class="uug-graph-page">
    <div class="container">
      <div>
        <div class="line">
          <my-chart v-if="hasData" :chart-data="chartData"></my-chart>
          <!-- <my-chart></my-chart> -->
        </div>
        <div class="line">
          <!-- <point-chart></point-chart> -->
          <point-chart v-if="hasData" :chart-data="chartData"></point-chart>
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
        arr:[]
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
  .container {
    display: flex;
    align-items: center;
    justify-content: center;

    .line {
      display: flex;
      margin-bottom: 30px;
    }
  }
}
</style>
