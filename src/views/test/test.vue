<template>
  <div id="chart"></div>
</template>

<script>
import {getGraph } from '@/api/search'

const images = [
  require('./assets/c0.png'),
  require('./assets/c1.svg'),
  require('./assets/c2.svg'),
  require('./assets/c3.svg'),
  require('./assets/c4.svg')
]

export default {
    name: "test",
    data(){
        return {
            chartData: null,
            categorys: [
                {
                name: '时期',
                symbol : 'image://' + images[0]
                },
                {
                name: '人物',
                symbol: 'image://' + images[1]
                },
                {
                name: '技术',
                symbol: 'image://' + images[2]
                },
                {
                name: '物件',
                symbol: 'image://' + images[3]
                },
                {
                name: '组织',
                symbol: 'image://' + images[4]
                }
            ],
            chart: null
        }
    },
    mounted(){
        this.initChart()
    },
    methods: {
        initChart(){
            this.chart = this.$echart.init(document.getElementById('chart'));
            this.chart.showLoading()
            getGraph().then(res=>{
                let {nodes, links} = res
                const nodesData =  nodes.map(item => {
                    const nodeOption = {
                        id: item.id,
                        category: item.category,
                        name: item.name,
                        value: item.value,
                        symbolSize: item.value * 20
                    }
                    return nodeOption
                });
                let option = {
                    legend: {
                        data: this.categorys.map(item=>{
                            return{
                                name: item.name,
                                icon: item.symbol
                            }
                        }),
                        bottom: '1%',
                        left: '1%',
                        orient: 'vertical',
                        itemGap: 12,
                        selectedMode:false,
                        textStyle:{
                            color:'#333333',
                            fontSize: 12*0.9,
                            fontWeight:'bold'
                        },
                        itemWidth: 25,
                        itemHeight: 25
                    },
                    textStyle: {
                        fontFamily: '微软雅黑',
                        fontSize: 12,
                        fontWeight:'bold'
                    },
                    series: [{
                        type: 'graph',
                        layout: 'force',
                        data: nodesData,
                        links: links,
                        categories: this.categorys,
                        lineStyle: {
                            normal: {
                                color: 'source',
                                width: 3,
                                curveness: 0.2
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                position: 'right'
                            }
                        },
                        force: {
                            repulsion: 1500,
                            layoutAnimation: false
                        },
                        roam: true,
                        focusNodeAdjacency: true,
                        animationDuration: 2000
                    }]
                }
                this.chart.setOption(option);
                this.chart.hideLoading()

                setTimeout(()=>{
                    const nodesData =  nodes.map(item => {
                        let nodeOption = {}
                        if(item.name == '第一代计算机'){
                            nodeOption = {
                                id: item.id,
                                category: item.category,
                                name: item.name,
                                value: item.value,
                                symbolSize: item.value * 20,
                                x: 0,
                                y: 0
                            }
                        }else{
                            nodeOption = {
                                id: item.id,
                                category: item.category,
                                name: item.name,
                                value: item.value,
                                symbolSize: item.value * 20
                            }
                        }
                        return nodeOption
                    });
                     this.chart.setOption(option);
                },2000)
            })
        }
    }
}
</script>

<style lang="less" scoped>
    #chart{
        width: 100%;
        height: calc(100vh - 90px);
    }
</style>