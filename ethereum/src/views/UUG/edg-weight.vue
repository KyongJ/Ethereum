<template>
  <div class="ugg-deg-page">
    <div class="container">
      <div>
        <div class="line">
          <my-chart v-if="hasData" :chart-data="chartData"></my-chart>
        </div>
        <!-- <div class="line">
          <point-chart  v-if="hasData"  :chart-data="chartData"></point-chart>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import myChart from "../components/charts";
import txNum from "../../assets/js/txNum.json";

export default {
  components: {
    myChart,
  },
  data() {
    return {
      chartData: {
        xAxis: [],
        txNum: [],
        arr: [],
      },
      hasData: false,
    };
  },
  mounted() {
    const { data } = txNum;
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
      let txNum = [];
      data.forEach((item) => {
        xAxis.push(item.timeWindow);
        txNum.push(item.txNum);
      });
      this.chartData.xAxis = xAxis;
      this.chartData.yAxis = ["txNum"];
      this.chartData.txNum = txNum;
      this.chartData.arr.push(txNum);
      this.hasData = true;
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
      margin-bottom: 30px;
    }
  }
}
</style>
