<template>
  <div class="ugg-deg-page">
    <div class="container">
      <div class="chart">
        <div class="line">
          <div class="box">
            <div class="title">交易总数演化图</div>
            <my-chart v-if="hasData" :chart-data="chartData"></my-chart>
          </div>
          <div class="box flex-1">这里，横轴代表时间窗口的序号，
            纵轴是不同滑动时间窗口中的交易总数。
            在观察各个滑动窗口中的交易总数时，
            我们观察到类似于节点总数演化的三阶段动态：“慢启动”、“爆发”和“退烧”。
            在第二十个滑动窗口达到峰值后，交易的数量急剧减少，
            这意味着以太坊用户现在时期的活跃度相较于以前降低了</div>
        </div>
        <div class="box">
          <div class="line">
            <div>
              <div class="title">平均交易数演化图</div>
              <my-chart v-if="hasData" :chart-data="avgTxNumData"></my-chart>
            </div>
            <div>
              <div class="title">新老节点平均交易数</div>
              <my-chart v-if="hasData" :chart-data="newOldAvgTxNum"></my-chart>
            </div>
          </div>
          <div>平均数是描述和比较数据的统计量，对总体各单位之间标志值的差异抽象化，
            用一个数字显示其一般水平。所以通过上图展现了每个节点、每个边缘的平均交易数演化。
            可以发现，两个曲线中的平均交易数几乎都是随着时间的推移而减少的。
            一个违反我们直觉的观察是，平均交易数竟然变得越来越少。
            为了揭示原因，我将节点分为两组，分别为旧节点和新创建的节点。
            造成这种现象的原因大致有两个。一是旧节点在每个窗口中平均进行的交易数越来越少。
            另一种是新节点平均交易数也越来越少。
            这两个因素共同导致平均交易量随着时间窗口的向前移动而减少
          </div>
        </div>
        <div class="box">
          <div class="line">
            <div>
              <div class="title">交易总值演化图</div>
              <my-chart v-if="hasData" :chart-data="txValue" y-label="Ether"></my-chart>
            </div>
            <div>
              <div class="title">平均交易值演化图</div>
              <my-chart v-if="hasData" :chart-data="avgTxValue" y-label="Ether"></my-chart>
            </div>
          </div>
         
           <div>总价值在第十个时间窗口之前保持非常稳定，几乎没有波动。
             而之后在第10个窗口和第18个窗口之间经历了飞速增长。
             在第19个窗口观察到该值的突然下降，并且自第22个窗口以来该值又一次变得稳定。
             从图中可以发现每笔交易的平均值在第一个窗口和第十个窗口之间减小，
             并且从大约35个以太减小到17个以太。
             第11个窗口和第19个窗口之间的交易值在60以太左右振荡。
             自第21个窗口以来，交易值下降到1以下。
             右图进一步显示了传入或传出每个节点和每个边的平均值几乎总是随着时间的推移而减小（除了第12个滑动窗口）。
             可以推测有两个原因导致这种现象，
             首先，不断到达的新节点、新用户通常会伴有少量的交易，
             并且因为以太价格不断地上升，导致每笔交易的平均值也越来越低
          </div>
        </div>
        <div class="line">
          <div class="box">
            <div class="title">交易值分布CDF图</div>
            <my-chart v-if="hasData" :chart-data="txvalueCdf" x-label="value" y-label="Cdf"></my-chart>
          </div>
          <div class="box flex-1">数据集中最新UUG的交易值分布如图所示。
            它显示了大多数交易的值，
            大多数节点和大多数边的交易值都集中在10e14Wei和10e20Wei之间。</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import myChart from "../components/charts";
import txNum from "../../assets/js/txNum.json";
import AvgTxNum from "../../assets/js/AvgTxNum.json";
import newOldAvgTxNum from "../../assets/js/NewOldAvgTxNum.json";
import txValue from "../../assets/js/TxValue.json";
import avgTxValue from "../../assets/js/AvgTxValue.json";
import txvalueCdf from "../../assets/js/txvalueCdf(2).json";

export default {
  components: {
    myChart,
  },
  data() {
    return {
      chartData: {},
      avgTxNumData: {},
      newOldAvgTxNum: {},
      txValue: {},
      avgTxValue: {},
      txvalueCdf:{},
      hasData: false,
      hasAvgData: false,
    };
  },
  mounted() {
    this.chartData = this.formatData(txNum);
    this.avgTxNumData = this.formatData(AvgTxNum);
    this.newOldAvgTxNum = this.formatData(newOldAvgTxNum);
    this.txValue = this.formatData(txValue);
    this.avgTxValue = this.formatData(avgTxValue);
    this.txvalueCdf = this.formatData2(txvalueCdf);
    console.log(this.txvalueCdf)
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
.ugg-deg-page {
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
      width: 100%;
      justify-content: center;
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
