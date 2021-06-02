<template>
  <div class="ugg-degree-page">
    <div class="container">
      <div class="chart">
        <div class="line">
          <div class="flex-1 box">
            <div class="title">UUG平均度演化图</div>
            <my-chart v-if="hasData" :chart-data="chartData" y-label="   Degree"></my-chart>
          </div>
          <div class="box flex-1">可以看到，第13个和第18个滑动窗口之间的平均度数略高于其他滑动窗口。
            而这段时期也恰逢以太价格突然上涨的时间段。但是，以太市场的繁荣并没有带来明显密集的交易图。</div>
        </div>
       <div class="line">
          <div class="flex-1 box">
            <div class="title">度分布CDF图</div>
            <my-chart v-if="hasData" :chart-data="degreeCdf"  y-label="Cdf"></my-chart>
          </div>
          <div class="box flex-1">在图中说明了最新UUG的in-degree、out-degree和overall-degree分布。
            尽管交易量巨大，但近48%的节点只有一个地址的交易，98%的节点只有不到10个地址的交易。相反，一小部分节点在大量其他节点之间传输以太，
            使得度分布高度倾斜，并呈现出重尾模式。交换节点在UUG交易中起着关键性的作用，
            它们类似于在线社交网络的中心节点</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import myChart from "../components/charts";
import degreeData from "../../assets/js/degree.json";
import degreeCdf from "../../assets/js/degreeCdf(2).json";

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
      degreeCdf:{},
      hasData: false,
    };
  },
  mounted() {
    const { data } = degreeData;
    this.formatData(data.data);

     this.degreeCdf = this.formatData2(degreeCdf);
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
     formatData2(oriData) {
      let { data } = oriData;
      data = data.data;

      let chartData = {};
      let obj = {};
      let xAxis = [];

      data.forEach((item) => {
        xAxis.push(item.degree);
        for (let key in item) {
          if (key != "id" && key != "degree") {
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
.ugg-degree-page {
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
