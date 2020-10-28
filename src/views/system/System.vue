<template>
  <div>
    <div id="chart"></div>
  </div>
</template>

<script>
import { systemhData } from "@/api/system";
export default {
  name: "system",
  data() {
    return {
      allData: null,
      data: {
       
      }
    };
  },
  mounted(){
     systemhData().then(res=>{
          this.initChart(res)
      })
  },
  methods: {
    initChart(data) {
      let nodes = data.nodes.map(item=>{
        return {
          neoId: item.neoId,
          id: item.id,
          value: item.value,
          name: item.name
        }
      })
      let links = data.links.map(item=>{
        return {
          source: item.source,
          target: item.target,
          id: item.id,
          name: item.name
        }
      })
      let chart = this.$echart.init(document.getElementById("chart"));
      let option = {
        series: [
          {
            type: "graph",
            layout: "force",
            symbolSize: 58,
            draggable: true,
            roam: true,
            focusNodeAdjacency: true,
            edgeSymbol: ["", "arrow"],
            // edgeSymbolSize: [80, 10],
            edgeLabel: {
              normal: {
                show: true,
                textStyle: {
                  fontSize: 20
                },
                formatter(x) {
                  return x.data.name;
                }
              }
            },
            label: {
              show: true
            },
            force: {
              repulsion: 2000,
              edgeLength: 120
            },
            data: nodes,
            links: links,
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  formatter: function(item) {
                    return item.data.name;
                  }
                }
              }
            }
          }
        ]
      };
      chart.setOption(option);
    }
  },
};
</script>

<style lang="less">
#chart {
  width: 100%;
  height: 800px;
}
</style>

