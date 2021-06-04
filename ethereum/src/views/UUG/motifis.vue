<template>
  <div class="ugg-motifis-page">
    <div class="container">
      <div class="chart">
        <div class="line">
          <div class="box">
            <div class="title">闭合三元组总数演化趋势</div>
            <my-chart v-if="hasData" :chart-data="sumData"></my-chart>
          </div>
          <div class="box flex-1">一开始，闭合三胞胎的数目约为3762个，
            而最后一个滑动窗口的数目已经达至60万个左右。
            这一数字在第20个窗口达到峰值，
            但总体趋势是扩大了数百倍。
            这表明越来越多的EOA与其他EOA进行交易</div>
        </div>
        <div class="line">
          <div class="box ">
            <div class="title">闭合三元组占比演化趋势</div>
            <my-chart v-if="hasData" :chart-data="proData"  y-label="position"></my-chart>
          </div>
          <div class="box flex-1">从开始到第二十个滑动窗口，我们发现闭合三元组在所有三元组中所占的比例几乎在持续的下降。
            从初始浓度高于十万分之一（即10e-5），
            则降低到近百万分之一（即10e−6）。
            封闭三元组的低集中性意味着UUG的交易模式是绝大多数节点只与少量节点交互的模式。</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import myChart from "../components/charts";
import closedTripletData from "../../assets/js/closedTriplet.json";



export default {
  components: {
    myChart,
  },
  data() {
    return {
      chartData: {},
      sumData:{},
      proData:{},
      hasData: false,
      hasAvgData: false,
    };
  },
  mounted() {
    this.chartData = this.formatData(closedTripletData);

    console.log(this.chartData  )
    this.sumData={...this.chartData};

    this.sumData.yAxis=[this.chartData.yAxis[0]];
    this.sumData.arr=[this.chartData.arr[0]]

    this.proData={...this.chartData};
    this.proData.yAxis=[this.chartData.yAxis[1]];
    this.proData.arr=[this.chartData.arr[1]]

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
  },
};
</script>

<style lang="scss" scoped>
.ugg-motifis-page {
  color: #444;
  .flex-1 {
    flex: 1;
  }
     .chart {
      width: 80%;
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
