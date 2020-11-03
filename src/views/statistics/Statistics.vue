<template>
  <div class="content">
    <div class="item">
      <div class="title">总体数量</div>
      <div class="entity">
        <div class="color1">
          <p class="name">实体总数</p>
          <p class="value">{{allData.entity_num}}</p>
        </div>
        <div class="color2" v-for="(item, key) in allData.entity" :key="key">
          <p class="name">{{item.name}}</p>
          <p class="value">{{item.value}}</p>
        </div>
      </div>
      <div class="link">
        <div class="color3">
          <p class="name">关系总数</p>
          <p class="value">{{allData.linksnum}}</p>
        </div>
        <div class="color4" v-for="(item, key) in allData.links" :key="key">
          <p class="name">
            {{item.source}}与{{item.target}}
            <br />的关系
          </p>
          <p class="value">{{item.Inum}}</p>
        </div>
      </div>
    </div>
    <div class="item">
      <div class="title">实体统计</div>
      <div id="peiChart"></div>
    </div>
    <div class="item">
      <div class="title">实体属性统计</div>
      <div id="barChart"></div>
    </div>
  </div>
</template>

<script>
import { searchDisplayData } from "@/api/statistics";

export default {
  name: "statistics",
  data() {
    return {
      allData: {
        
      }
    };
  },
  methods: {
    searchDisplayData() {
      searchDisplayData().then(res => {
        this.allData = res
        this.initPeiChart(res.entity);
        this.initBarChart(res.properties);
      });
    },
    initPeiChart(data) {
      let legendData = data.map(item => {
        return item.name;
      });
      let chart = this.$echart.init(document.getElementById("peiChart"));
      let option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          x: "left",
          data: legendData
        },

        series: [
          {
            name: "实体个数",
            type: "pie",
            radius: ["20%", "70%"],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            },
            data: data
          }
        ]
      };
      chart.setOption(option);
    },
    initBarChart(data) {
      let xData = data.map(item => {
        return item.name;
      });
      let colorPalette = [
        "#E01F54",
        "#2980B9",
        "#e05038",
        "#009966",
        "#9fa8a3",
        "#89bdd3",
        "#e6af4b",
        "#d3758f",
        "#dcc392",
        "#2e4783",
        "#82b6e9",
        "#ff6347",
        "#a092f1",
        "#0a915d",
        "#7d4627",
        "#6699FF",
        "#ff6666",
        "#3cb371",
        "#d5b158",
        "#38b6b6",
        "#c23531",
        "#2f4554",
        "#61a0a8",
        "#d48265",
        "#91c7ae",
        "#749f83",
        "#ca8622",
        "#bda29a",
        "#6e7074",
        "#546570",
        "#c4ccd3",
        "#E01F54",
        "#2980B9",
        "#e05038"
      ];
      let barChart = this.$echart.init(document.getElementById("barChart"));
      let option = {
        tooltip: {},
        xAxis: {
          name: "属性名称",
          data: xData,
          axisLabel: {
            show: true,
            rotate: 30
          }
        },
        yAxis: {
          name: "属性出现次数"
        },
        series: [
          {
            name: "属性出现次数",
            data: data,
            type: "bar",
            itemStyle: {
              normal: {
                color: function(params) {
                  return colorPalette[params.dataIndex] || null;
                }
              }
            }
          }
        ]
      };
      barChart.setOption(option);
    }
  },
  mounted() {
    this.searchDisplayData();
  }
};
</script>

<style lang="less" scoped>
.content {
  width: 90%;

  margin: 0 auto;
  margin-top: 30px;

  .item {
    width: 100%;
    border-radius: 10px;
    border: 1px solid #ccc;
    min-height: 200px;
    padding: 20px;
    margin-bottom: 20px;
    .title {
      text-align: center;
      font-size: 16px;
      font-weight: bold;
    }
    .entity {
      border-bottom: 1px solid #ccc;
    }
    .entity,
    .link {
      display: flex;
      justify-content: start;
      flex-wrap: wrap;
      padding: 20px;
      & > div {
        width: 160px;
        height: 160px;
        border: 10px solid;
        border-radius: 100%;
        background-color: #ccc;
        margin: 20px;
        .name,
        .value {
          width: 100%;
          height: 80px;
          text-align: center;
          font-size: 18px;
          font-weight: bold;
        }
        .value {
          line-height: 30px;
        }
        .name {
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
      .color1 {
        border-color: #009966;
        color: #009966;
      }
      .color2 {
        border-color: #666699;
        color: #666699;
      }
      .color3 {
        border-color: #ff22c1;
        color: #ff22c1;
      }
      .color4 {
        border-color: #fa8072;
        color: #fa8072;
      }
    }
    #peiChart,
    #barChart {
      width: 100%;
      height: 500px;
    }
  }
}
</style>