<template>
  <div class="home-page">
    <div
      class="network-container mainBox"
      v-loading="loading"
      :element-loading-text="loadingText"
      element-loading-spinner="el-icon-loading">
      <div id="mynetwork"></div>
      <div class="toptipBox" v-show="isSHowToptip" :style="{left: toptipX, top: toptipY}">
          {{toptipText}}
      </div>
      <div class="network-bar">
        <div
          v-for="nt in networkBarList"
          :key="nt.node"
          class="bar-item"
          @click="onClickBarItem(nt.node)">
          <div class="bar-item_img">
            <img :src="bigNodeImgUrl" alt="">
          </div>
          <div class="bar-item__label">
            {{ nt.label }}
          </div>
        </div>
      </div>

      <div class="entity-bar">
        <div v-for="item in entitySample" :key="item.name" :class="{opacity: filter.indexOf(item.name) > -1} " class="entity-s-item" @click="changefilter(item.name)">
          <span class="entity-s-item__icon">
            <img :src="item.image" alt="">
          </span>
          <span class="entity-s-item__name">{{ item.name }}</span>
        </div>
      </div>
      <div class="source-bar">
        <div class="source-bar__header">
          数据来源
        </div>
        <div class="source-bar__body">
          <p v-for="item in sourceList" :key='item' :class="{opacity: sourcefilter.indexOf(item) > -1}" @click="changefiltersource(item)">{{item}}</p>
        </div>
      </div>
      <div class="Number-bar">
        <div class="source-bar__body">
          <el-row>
            <el-col :span="6">
              <div class="typeName">
                节点:
              </div>
            </el-col>
            <el-col :span="18">
              <el-slider v-model="value1" :format-tooltip="(val)=> val + '%'" @change='changeValue1'></el-slider>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <div class="typeName">
                关系:
              </div>
            </el-col>
            <el-col :span="18">
              <el-slider v-model="value2" :format-tooltip="(val)=> val + '%'" @change='changeValue2'></el-slider>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <el-dialog
      title="实体信息"
      :visible.sync="dialogVisible"
      width="30%">
      <h4 class="nodeTitle">{{clickNodeName}}</h4>
      <div v-loading="nodeLoading" style="min-height: 200px">

        <table class="table table-bordered">
          <tbody>
            <tr v-for="(info, key) in nodeInfo" :key="key" >
              <th width="130">{{ key }}</th>
              <td><span style="font-weight: bold" >{{ info }}</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </el-dialog>

    <el-dialog
      title="详细信息"
      :visible.sync="edgesDialogVisible"
      width="60%">
      <h4 class="nodeTitle">{{(edgeInfo || {}).type}}</h4>
      <table class="table table-bordered">
        <tbody>
          <tr>
            <th>数据来源</th>
            <td>
              <div style="min-height: 80px" >
                {{ (edgeInfo || {}).source }}
              </div>
            </td>
          </tr>
          <tr>
            <th>原文</th>
            <td>
              <div style="min-height: 80px">
                {{ (edgeInfo || {}).description }}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </el-dialog>
  </div>
</template>

<script>
import { Network, DataSet } from 'visjs-network'
import nodesOptions from './nodes1.json'
import edgesOptions from './relation_num1.json'
import exportArea from './exportArea.json'

import bigNodeImg from './assets/c0.png'

import { searchFrameCondition, getGraph } from '@/api/search'

const images = [
  require('./assets/c0.png'),
  require('./assets/c1.svg'),
  require('./assets/c2.svg'),
  require('./assets/c3.svg'),
  require('./assets/c4.svg'),
  require('./assets/c5.svg'),
  require('./assets/c6.svg'),
]

let network = null

export default {
  data () {
    return {
      network: null,
      bigNodeImgUrl: bigNodeImg,
      nodeInfo: {},
      edgeInfo: null,
      loading: false,
      randomNodeInterval: null,
      loadingText: '拼命加载中',
      dialogVisible: false,
      edgesDialogVisible: false,
      nodeLoading: false,
      entitySample: [
        {
          name: '时期',
          image: images[0]
        },
        {
          name: '人物',
          image: images[1]
        },
        {
          name: '技术',
          image: images[2]
        },
        {
          name: '物件',
          image: images[3]
        },
        {
          name: '组织',
          image: images[4]
        }
      ],
      networkBarList: [],
      sourceList: [],
      filter: [],
      sourcefilter: [],
      clickNodeName: null,
      nodeData: [],
      linkData: [],
      value1: 30,
      value2: 50,
      params: {
        node_limit: 0.5,
        link_limit: 0.5
      },
      isSHowToptip: false,
      toptipX: 0,
      toptipY: 0,
      toptipText: null,
    }
  },
  created () {
    this.init()
  },
  methods: {  
    init () {
      getGraph(this.params).then(res=>{
        this.sourceList = res.source_types
        this.entitySample = []
        res.node_types.forEach((item, index)=>{
          this.entitySample.push({
            name: item,
            image: images[index]
          })
        })
        this.networkBarList = []
        for(let key in res.four_generation){
          this.networkBarList.push({
            label: res.four_generation[key].name,
            node: res.four_generation[key].value
          })
        }
        this.filter = []
        this.sourcefilter = []
        this.initData(res.nodes, res.links)
      })
    },
    initData(nodeList, linkList){
      const nodes = nodeList.map((node, index) => {
        let img = null
        this.entitySample.forEach(item=>{
          if(node.category == item.name){
            img = item.image
          }
        })
        const nodeOption = {
          id: node.id,
          x: node.x ?? null,
          y: node.y ?? null,
          label: node.name,
          title: node.name,
          value: node.value ?? (4 + Math.ceil(Math.random() * 5)),
          image: img || '',
          shape: 'image',
          node_type: node.category,
          source: node.source
        }
        return nodeOption
      })
      // create an array with edges
      const edges = linkList.map((edge, index) => {
        return {
          from: edge.source ,
          to: edge.target ,
          width: edge.value ?? 3,
          dashes: edge.dashes ?? true,
          font: { align: 'middle' },
          title: edge.name
        }
      })
      this.nodeData = nodes
      this.linkData = edges
      this.initChart(nodes, edges)
    },
    initChart(nodes, edgesOptions){
      this.$nextTick(() => {
        // create a network
        var container = document.getElementById('mynetwork')
        var data = {
          nodes: nodes,
          edges: edgesOptions
        }
        var options = {
          layout: {
            randomSeed: 1,
            improvedLayout: false
          },
          nodes: {
            shape: 'dot',
            // borderWidth: 2,
            scaling: {
              label: {
                min: 8,
                max: 20
              }
            }
          },
          edges: {
            color: { inherit: true },
            // width: 2,
            smooth: {
              type: 'continuous',
              roundness: 0
            }
          },
          interaction: {
            hover: true,
            hideEdgesOnDrag: true,
            tooltipDelay: 200
          },
          physics: {
            enabled: true,
            barnesHut: {
              gravitationalConstant: -60000
            },
            stabilization: { iterations: 3500 }
          }
        }

        network = new Network(container, data, options)
        network.on('click', (params) => {
          clearInterval(this.randomNodeInterval)
          params.event = '[original event]'
          if (params.nodes.length > 0) {
            this.dialogVisible = true
            const curNodeId = (params.nodes || [])[0]
            const curNode = nodes.find(node => {
              return node.id === curNodeId
            })
            this.searchFrameCondition(curNode.label)
          }

          if (params.edges.length > 0 && params.nodes.length === 0) {
            const { fromId, toId } = network.view.body.edges[params.edges[0]]
            const edgeCur = edgesOptions.find(edge => {
              return edge.from === fromId && edge.to === toId
            })
            this.edgeInfo = edgeCur
            this.edgesDialogVisible = true
          }
        })
        network.once('beforeDrawing', function () {
          network.focus(0, {
            scale: 0.6
          })
        })
        //
        // 动画稳定后的处理事件
        var stabilizedTimer
        network.once('stabilized', function (params) {
          window.clearTimeout(stabilizedTimer)
          stabilizedTimer = setTimeout(function () {
            options.physics.enabled = true // 关闭物理系统
            network.setOptions(options)
          }, 200)
        })
        let that = this
        network.on('hoverEdge',function(properties){
            let item = that.getEdgeMsg(properties.edge)
            that.toptipText = item.title
            that.toptipX = properties.event.offsetX + 15 + 'px'
            that.toptipY = properties.event.offsetY + 15 + 'px'
            that.isSHowToptip = true
        });

        network.on('blurEdge',function(properties){
            that.toptipX = 0
            that.toptipY = 0
            that.isSHowToptip = false
        });

        network.on('stabilizationProgress', (params) => {
          this.loading = true
          const widthFactor = params.iterations / params.total
          this.loadingText = `拼命加载 ${Math.round(widthFactor * 100)}%`
        })
        network.once('stabilizationIterationsDone', () => {
          this.loading = false

          const focusRandomNodes = [105, 101, 104, 103, 102]
          let focusRandomNodeIndex = 0
          this.focusRandom(101)
        })
      })
    },

    objectToArray (obj) {
      return Object.keys(obj).map(function (key) {
        obj[key].id = key
        return obj[key]
      })
    },
    focusRandom (nodeId) {
      var options = {
        // position: {x:positionx,y:positiony}, // this is not relevant when focusing on nodes
        scale: 0.8,
        offset: { x: 0, y: 0 },
        animation: {
          duration: 1000,
          easingFunction: 'easeInOutQuint'
        }
      }
      network.focus(nodeId, options)
    },
    onClickBarItem (nodeId) {
      this.randomNodeInterval && clearInterval(this.randomNodeInterval)
      this.focusRandom(nodeId)
    },
    searchFrameCondition (node) {
      this.nodeLoading = true
      this.clickNodeName = node
      searchFrameCondition({ node }).then((res) => {
        this.nodeLoading = false
        this.nodeInfo = (res[0] || {}).n || {}
      })
    },
    changefilter(name){
      if(name == '时期'){
        return
      }
      if(this.filter.indexOf(name) == -1){
        this.filter.push(name)
      }else{
        this.filter.splice(this.filter.indexOf(name), 1)
      }
      this.filterData()
    },
    changefiltersource(name){
      if(this.sourcefilter.indexOf(name) == -1){
        this.sourcefilter.push(name)
      }else{
        this.sourcefilter.splice(this.sourcefilter.indexOf(name), 1)
      }
      
      this.filterData()
    },
    filterData(){
      let Cnode = [...this.nodeData]
      this.sourcefilter.forEach(item => {
        let node = Cnode.map((node, index) => {
          if(node.source != item){
            return node
          }
        }).filter(item => item)
        Cnode = node
      })
      this.filter.forEach(item => {
        let node = Cnode.map((node, index) => {
          if(node.node_type != item){
            return node
          }
        }).filter(item => item)
        Cnode = node
      })

      this.initChart(Cnode, this.linkData)
    },
    changeValue1(val){
      this.params.node_limit = val/100
      this.init()
    },
    changeValue2(val){
      this.params.link_limit = val/100
      this.init()
    },
    getEdgeMsg(edgeId){
        let edgeMsg = {}
        this.linkData.forEach(item => {
            if(item.id == edgeId){
                edgeMsg = item
                return 
            }
        })
        return edgeMsg
    },
  }
}
</script>

<style lang="less" scoped>
.mainBox{
    position: relative;
    .toptipBox{
        width: 100px;
        height: 30px;
        border-radius: 5px;
        position: absolute;
        background-color: rgba(0, 0, 0, 0.9);
        color: #fff;
        line-height: 30px;
        padding: 0 5px;
        font-size: 12px;
        text-align: center;
    }
}
  .layout-header {
    display: flex;
    align-items: center;
    height: 90px;
    width: 100%;
    padding: 0 60px;
    background: #2d2e42;
    z-index: 999;
  }

  .network-container {
    position: relative;
    height: calc(100vh - 90px);
  }

  .network-bar {
    display: flex;
    flex-direction: column;
    position: absolute;
    left: 5px;
    top: 8px;
    bottom: 8px;
    width: 100px;
    padding: 10px 0;
    background: rgba(000, 000, 000, .8);
    border-radius: 6px;
    .bar-item {
      flex: 1;
      padding: 10px 5px;
      // margin-bottom: 15px;
      text-align: center;
      color: #fff;
      cursor: pointer;
      .bar-item__label {
        font-size: 14px;
      }
      .bar-item_img {
        &>img {
          width: 70px;
        }
      }
    }
  }

  .entity-bar {
    position: absolute;
    right: 5px;
    top: 8px;
    width: 150px;
    // height: 200px;
    padding: 15px 10px;
    background: rgba(000, 000, 000, .8);
    border-radius: 6px;
    color: #fff;
    .entity-s-item {
      display: flex;
      justify-content: start;
      align-items: center;
      margin-bottom: 10px;
      cursor: pointer;
      &:last-child {
        margin-bottom: 0;
      }
      .entity-s-item__icon {
        height: 25px;
        width: 25px;
        margin-right: 8px;
        &>img {
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
      }
    }
  }

  .source-bar {
    position: absolute;
    right: 5px;
    bottom: 8px;
    width: 260px;
    background: rgba(000, 000, 000, .8);
    border-radius: 6px;
    color: #fff;
    .source-bar__header {
      font-weight: bold;
      background: rgba(000, 000, 000, .9);
      padding: 3px 15px;
      border-top-left-radius: 6px;
      border-top-right-radius: 6px;
    }
    .source-bar__body {
      padding: 10px 15px;
      p {
        line-height: 1.5;
        cursor: pointer;
      }
    }
  }

  .Number-bar{
    position: absolute;
    left: 150px;
    bottom: 8px;
    width: 230px;
    background: rgba(000, 000, 000, 1);
    border-radius: 6px;
    color: #fff;
    .source-bar__header {
      font-weight: bold;
      background: rgba(000, 000, 000, .9);
      padding: 3px 15px;
      border-top-left-radius: 6px;
      border-top-right-radius: 6px;
      line-height: 38px;
    }
    .source-bar__body {
      padding: 10px 15px;
      p {
        line-height: 1.5;
        cursor: pointer;
      }
    }
  }

  .menus {
    flex: 1;
    display: flex;
    margin-left: 60px;
    .menu-item {
      color: #007acf;
      font-size: 28px;
      font-weight: bold;
      padding: 0 50px;
      cursor: pointer;
      &.active {
        color: #fff;
      }
    }
  }

  #mynetwork {
    display: block;
    width: 100%;
    height: 100%;
    background: #f8f8f8;
  }
  p {
    max-width:600px;
  }

  table {
    border-spacing: 0;
    border-collapse: collapse;
  }

  td, th {
    padding: 0;
    text-align: left;
  }

  .table {
    border: 1px solid #ddd;
    font-size: 14px;
    width: 100%;
  }

  .table>tbody>tr>td,
  .table>tbody>tr>th,
  .table>tfoot>tr>td,
  .table>tfoot>tr>th,
  .table>thead>tr>td,
  .table>thead>tr>th {
    padding: 8px;
    line-height: 1.42857143;
    vertical-align: middle;
    border-top: 1px solid #ddd;
  }

  .table-bordered>tbody>tr>td,
  .table-bordered>tbody>tr>th,
  .table-bordered>tfoot>tr>td,
  .table-bordered>tfoot>tr>th,
  .table-bordered>thead>tr>td,
  .table-bordered>thead>tr>th {
    border: 1px solid #ddd;
  }

  .rangeBox{
    position: absolute;
  }

  .opacity{
    opacity: .5;
  }

  .nodeTitle{
    text-align: center;
    font-weight: bold;
    padding-bottom: 20px;
  }
  .tooltipBox{
    position: absolute;
    width: 500px;
    font-size: 14px;
    text-indent: 30px;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.8);
    border-radius: 5px;
    padding: 10px;
    z-index: 999;
}
</style>
