<template>
  <div class="ugg-degree-page">
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
import degreeData from "../../assets/js/degree.json";

export default {
  components: {
    myChart,
  },
  data() {
    return {
      chartData: {
        xAxis: [],
        degree: [],
        arr: [],
      },
      hasData: false,
    };
  },
  mounted() {
    const { data } = degreeData;
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
      let degree = [];
      data.forEach((item) => {
        xAxis.push(item.timeWindow);
        degree.push(item.degree);
      });
      this.chartData.xAxis = xAxis;
      this.chartData.yAxis = ["degree"];
      this.chartData.degree = degree;
      this.chartData.arr.push(degree);
      this.hasData = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.ugg-degree-page {
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
