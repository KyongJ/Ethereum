<template>
  <div class="CCG-page">
    <div class="container">
      <div>
        <div class="line">
          <my-chart></my-chart>
          <my-chart></my-chart>
        </div>
        <div class="line">
          <point-chart></point-chart>
          <point-chart></point-chart>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import myChart from "../components/charts";
import pointChart from "../components/point-chart"
export default {
  components: {
    myChart,
    pointChart
  },
};
</script>

<style lang="scss" scoped>
.CCG-page {

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
