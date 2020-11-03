<template>
  <div class="home-page">
    <div
      class="network-container"
      v-loading="loading"
      :element-loading-text="loadingText"
      element-loading-spinner="el-icon-loading">
      <div id="mynetwork"></div>
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
        <!-- <div class="source-bar__header">
          数据来源
        </div> -->
        <div class="source-bar__body">
          <el-row>
            <el-col :span="8">
              <div class="typeName">
                节点:
              </div>
            </el-col>
            <el-col :span="16">
              <el-slider v-model="value1" @change='changeValue1'></el-slider>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <div class="typeName">
                关系:
              </div>
            </el-col>
            <el-col :span="16">
              <el-slider v-model="value2" @change='changeValue1'></el-slider>
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
import bigNodeImg from './assets/c0.png'
import { searchFrameCondition } from '@/api/search'
const images = [
  require('./assets/c0.png'),
  require('./assets/c1.svg'),
  require('./assets/c2.svg'),
  require('./assets/c3.svg'),
  require('./assets/c4.svg')
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
      networkBarList: [{
        label: '准备阶段',
        node: 105
      }, {
        label: '第一代计算机',
        node: 101
      }, {
        label: '第二代计算机',
        node: 104
      }, {
        label: '第三代计算机',
        node: 103
      }, {
        label: '第四代计算机',
        node: 102
      }
      ],
      filter: [],
      clickNodeName: null,
      value1: 0,
      value2: 0,
    } 
  },
  created () {
    this.init()
  },
  watch:{
    filter(){
      this.init()
    }
  },
  methods: {
    init () {
      let node = null
      let nodesOptions1 = nodesOptions
      console.log(nodesOptions1)
      if(this.filter.length == 0){
        node = nodesOptions1
      }
      this.filter.forEach(item => {
         node = nodesOptions1.map((node, index) => {
          if(node.node_type != item){
            return node
          }
        }).filter(item => item)
        nodesOptions1 = node
      })
     const nodes = node.map((node, index) => {
            const nodeOption = {
              id: node.id,
              x: node.x ?? null,
              y: node.y ?? null,
              label: node.node,
              title: node.node,
              value: node.value ?? (4 + Math.ceil(Math.random() * 5)),
              image: images[node.image - 1],
              shape: 'image'
              // font: { color: '#fff' }
            }
            return nodeOption
        })
      // create an array with edges
      const edges = edgesOptions.list.map((edge, index) => {
        return {
          from: edge.from,
          to: edge.to,
          // label: edge.type,
          width: edge.value ?? 3,
          dashes: edge.dashes ?? true,
          font: { align: 'middle' }
        }
      })
      this.$nextTick(() => {
        // create a network
        var container = document.getElementById('mynetwork')
        var data = {
          nodes: nodes,
          edges: edges
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
              // springConstant: 1
              // springLength: 200
            },
            stabilization: { iterations: 3500 }
            // minVelocity: 16
          }
        }
        network = new Network(container, data, options)
        network.on('click', (params) => {
          clearInterval(this.randomNodeInterval)
          // console.log(params)
          params.event = '[original event]'
          if (params.nodes.length > 0) {
            this.dialogVisible = true
            // this.nodeInfo = JSON.stringify(params, null, 4)
            const curNodeId = (params.nodes || [])[0]
            const curNode = nodes.find(node => {
              return node.id === curNodeId
            })
            this.searchFrameCondition(curNode.label)
          }
          if (params.edges.length > 0 && params.nodes.length === 0) {
            const { fromId, toId } = network.view.body.edges[params.edges[0]]
            const edgeCur = edgesOptions.list.find(edge => {
              return edge.from === fromId && edge.to === toId
            })
            this.edgeInfo = edgeCur
            this.edgesDialogVisible = true
          }
        })
        network.once('beforeDrawing', function () {
          network.focus(2, {
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
        // console.log(network.setSize('90%'))
      })
    },
    
    
    
    focusRandom (nodeId) {
      var options = {
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
    },
    changeValue1(val){
      console.log(val)
    },
    changeValue2(val){
      console.log(val)
    }
  }
}
</script>
<style lang="less" scoped>
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
    width: 100px;
    // height: 200px;
    padding: 15px 10px;
    background: rgba(000, 000, 000, .8);
    border-radius: 6px;
    color: #fff;
    .entity-s-item {
      display: flex;
      justify-content: center;
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
  .typeName{
    line-height: 38px;
  }
</style>