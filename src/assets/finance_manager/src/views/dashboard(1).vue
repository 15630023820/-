<template>
  <div class="dashboard">
    <!-- 翻牌器 【宽度】 24 满行  12 半行 6 四分之一行 -->
    <GDigitalFlop :data="sellInfo" />
    <!-- 图表 -->
    <div :style="{height:500+'px',width:'50%'}">
      <GChart :option="option1" />
    </div>

    <div :style="{height:500+'px',width:'50%'}">
      <GChart :option="option2" />
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.timer = setInterval(() => {
      this.option1.series.forEach(ele => {
        ele.data = ele.data.map(num => {
          return Math.random() * 10000;
        });
      });
      this.option2.series.forEach(ele => {
        // 修改[1,2,3], 每个基本数据类型，不会对1,2,3做响应式
        // 整个数组赋值
        ele.data = ele.data.map(num => {
          return Math.random() * 10000;
        });
      });
    }, 2000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  data() {
    const option1 = {
      title: {
        show:false
      },
      tooltip: {
        trigger: "axis"
      },
      legend: {
        data: ["Email", "Union Ads", "Video Ads", "Direct", "Search Engine"]
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
      },
      yAxis: {
        type: "value"
      },
      series: [
        {
          name: "Email",
          type: "line",
          stack: "Total",
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          name: "Union Ads",
          type: "line",
          stack: "Total",
          data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
          name: "Video Ads",
          type: "line",
          stack: "Total",
          data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
          name: "Direct",
          type: "line",
          stack: "Total",
          data: [320, 332, 301, 334, 390, 330, 320]
        },
        {
          name: "Search Engine",
          type: "line",
          stack: "Total",
          data: [820, 932, 901, 934, 1290, 1330, 1320]
        }
      ]
    };
    const option2 = {
      title: {
        show:false
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow"
        }
      },
      legend: {},
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true
      },
      xAxis: {
        type: "value",
        boundaryGap: [0, 0.01]
      },
      yAxis: {
        type: "category",
        data: ["Brazil", "Indonesia", "USA", "India", "China", "World"]
      },
      series: [
        {
          name: "2011",
          type: "bar",
          data: [18203, 23489, 29034, 104970, 131744, 630230]
        },
        {
          name: "2012",
          type: "bar",
          data: [19325, 23438, 31000, 121594, 134141, 681807]
        }
      ]
    };
    return {
      option1,
      option2,
      sellInfo: [
        {
          title: "最高可借金额",
          num: 13594,
          color: "#67ca3a"
        },
        {
          title: "回报率",
          num: 9833,
          color: "#ff6600"
        },
        {
          title: "业绩领跑",
          num: 8888,
          color: "#f56c6c"
        },
        {
          title: "安稳底薪战队",
          num: 6666,
          color: "#409eff"
        }
      ]
    };
  },
  name: "Dashboard"
};
</script>

