<template>
  <div class="home-page">
    <div class="home-top">
      <div class="box flex" v-for="item in topData" :key="item.label">
        <div v-if="item.num">
          <div class="num">{{ item.num }}</div>
          <div class="label">{{ item.label }}</div>
        </div>
        <div>
          <el-image class="icon" :src="item.url"></el-image>
        </div>
      </div>
    </div>
    <div class="home-mid">
      <div class="flex-1">
        <div class="box flex">
          <div class="intro">
            收集了从2015年8月至2018年6月以太坊所有的交易数据，并通过分析构造了三张交易网络图，即UUG（用户对用户）、UCG（用户对合约）、CCG（合约对合约）。
            本系统从度分布、边权重、图大小和局部图结构等几个角度对UUG进行分析，从合约创建与合约调用两个角度对UCG和CCG进行分析。
          </div>
        </div>
        <div class="box flex">
          <div class="title">以太坊价格演化</div>
          <div class="chart-dom" v-if="hasData">
            <my-chart :chart-data="etherValue"></my-chart>
          </div>
        </div>
      </div>
      <div class="flex-1">
        <div class="box">
          <div class="circle-container" v-if="hasCircleData">
            <div class="title">度分布</div>
            <chart-circle :chart-data="degreeData"></chart-circle>
          </div>
          <div class="line"></div>
          <div class="circle-container" v-if="hasCircleData">
            <div class="title">交易价格分布</div>
            <chart-circle :chart-data="txValueeData"></chart-circle>
          </div>
        </div>
      </div>
    </div>
    <div class="home-bottom">
      <div class="box flex-1">
        <div class="area-container" v-if="hasData">
          <chart-area :chart-data="areaData"></chart-area>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import userIcon from "../../assets/image/user.png";
import timeIcon from "../../assets/image/time.png";
import sumIcon from "../../assets/image/sum.png";
import valueIcon from "../../assets/image/value.png";
import ChartCircle from "../components/chart-circle.vue";
import chartArea from "../components/chart-area.vue";
import myChart from "../components/charts";
import EtherValueData from "../../assets/js/EtherValue.json";
import nodeAndTxSumData from "../../assets/js/NodeAndTxSum.json";
import degreeCdfData from "../../assets/js/degreeCdf.json";
import txValueCdfData from "../../assets/js/TxValueCdf.json";

export default {
  components: { myChart, ChartCircle, chartArea },
  data() {
    return {
      topData: [
        { num: "", label: "时间", url: timeIcon },
        { num: "56,814,406", label: "用户数量", url: userIcon },
        { num: "167,410,044", label: "交易总数", url: sumIcon },
        { num: "4,401,785,850", label: "交易总价值", url: valueIcon },
      ],
      areaData: {
        xAxis: [],
        yAxis: [],
        arr: [],
      },
      degreeData: {},
      txValueeData: {},
      etherValue: {
        xAxis: [],
        yAxis: [],
        arr: []
      },

      hasData: false,
      hasCircleData: false,
    };
  },

  mounted() {
    const date = new Date();
    this.topData[0].num = date.toLocaleDateString();
    this.areaData = this.formatData(nodeAndTxSumData);
    this.etherValue=this.formatData(EtherValueData);

    this.degreeData = this.formatDataCircle(degreeCdfData);
    this.txValueeData = this.formatDataCircle(txValueCdfData);

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
    formatDataCircle(oriData) {
      let { data } = oriData;
      data = data.data;

      data.forEach((item) => {
        item.value = item.sum;
      });
      this.hasCircleData = true;
      return data;
    },
  },
};
</script>

<style lang="scss">
.home-page {
  color: #444;
  .box {
    flex: 1;
    margin: 10px;
    min-height: 100px;
    background-color: white;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
    align-items: center;
    justify-content: space-around;
  }
  .home-top {
    display: flex;
    justify-content: space-between;

    .num {
      font-size: 18px;
    }
    .label {
      font-size: 12px;
      color: #666;
      margin-top: 6px;
    }
    .icon {
      width: 35px;
      height: 35px;
    }
  }
  .home-mid {
    display: flex;
    justify-content: space-between;

    .intro {
      margin: 30px;
    }

    .chart-dom {
      margin-top: 20px;
    }

    .circle-container {
      padding: 10px;
    }

    .line {
      width: 90%;
      height: 1px;
      margin: 0 auto;
      background-color: #ccc;
    }
  }
  .flex-1 {
    flex: 1;
  }
  .flex {
    display: flex;
  }
  .title {
    font-weight: bold;
  }
  .home-bottom {
    display: flex;

    .area-container {
      margin: 20px;
    }
  }
}
</style>