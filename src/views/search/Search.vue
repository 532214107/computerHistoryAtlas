<template>
  <div class="search-page">
    <div class="container">
      <div class="search-wrapper">
        <div class="search-title">
          数据搜索
        </div>
        <div class="search-box">
          <el-input
            v-model="query.q"
            @keyup.enter.native="searchSubmit">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
          <el-button type="primary" @click="openDialog" class="button">示例</el-button>
        </div>
        <div class="as-box">
            <div class="as-list" v-loading="loading" >
              <div v-for="(asitem, index) in asList" :key="index" class="as-item">
                <div class="as-item__title">{{ asitem.answer }}</div>
                <div class="as-item__ent">
                  <span class="as-item__ent-tag" >相关实体: </span>
                  <span class="as-item__ent-tag_item" v-for="item in asitem.nodes" :key='item' @click="clickQuestion(item)">
                    {{item}}
                  </span>
                </div>
              </div>
            </div>
            <div id='chartBox'></div>
        </div>
        
      </div>
    </div>

    <el-dialog
      title="示例问题"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <div>
        <h4 class="questionTitle">一、搜索实体（时期、人物、技术、组织）</h4>
        <p class="question" @click="clickQuestion('第一代计算机')">1.第一代计算机</p>
        <p class="question" @click="clickQuestion('夏培肃')">2.夏培肃</p>
        <p class="question" @click="clickQuestion('主路径敏化法')">3.主路径敏化法</p>
        <p class="question" @click="clickQuestion('中国科学院156工程处')">4.中国科学院156工程处</p>
        <h4 class="questionTitle">二、搜索实体的信息</h4>
        <p class="question" @click="clickQuestion('156计算机发明于哪一时期？')">1.156计算机发明于哪一时期？</p>
        <p class="question" @click="clickQuestion('905 乙机的主要相关人物是谁？')">2.905 乙机的主要相关人物是谁？</p>
        <p class="question" @click="clickQuestion('DJS-K1 电子控制机是哪个组织发明的？')">3.DJS-K1 电子控制机是哪个组织发明的？</p>
        <h4 class="questionTitle">三、搜索实体之间的关系</h4>
        <p class="question" @click="clickQuestion('中国科学院156工程处是由哪些组织合并成立的？')">1.中国科学院156工程处是由哪些组织合并成立的？</p>
        <p class="question" @click="clickQuestion('中国科学技术大学计算机专业创始人是谁？')">2.中国科学技术大学计算机专业创始人是谁？</p>
        <p class="question" @click="clickQuestion('国产441B晶体管计算机文档（讲义）包含哪些书籍？')">3.国产441B晶体管计算机文档（讲义）包含哪些书籍？</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { searchData } from '@/api/search'
import search_test from './search_test.json'
export default {
  data () {
    return {
      query: {
        q: '第一代计算机',
        username: 'test',
        KGname: 'YQ_Demo'
      },
      loading: false,
      asList: [],
      dialogVisible: false
    }
  },
  mounted(){
    if (this.$route.query.q) {
      this.query.q = this.$route.query.q
    }
    this.query.q && this.onSearchData()
  },
  methods: {
    onSearchData () {
      this.loading = true
      this.asList = []
      searchData(this.query).then(res => {
        const { all } = res
        all && (this.loading = false)
        this.asList = all.map(item => {
          return {
            answer: item.answer,
            nodes: item.nodes.map(_item => {
              return _item.name
            })
          }
        })
        let data = {}
        data.nodes = all[0].nodes
        data.links = all[0].links
        this.initchartBox(data)
      }).catch(() => {
        this.loading = false
      })
    },
    searchSubmit () {
      this.loading = true
      this.onSearchData()
    },
    handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
    },
    openDialog(){
      this.dialogVisible = true
    },
    clickQuestion(q){
      this.loading = true
      this.dialogVisible = false
      this.query.q = q
      this.onSearchData()
    },
    initchartBox(data){
      let chart = this.$echart.init(document.getElementById('chartBox'))
      let nodes = data.nodes.map(item=>{
        let nodeObj = {
          id: item.id,
          name: item.name,
          value: item.value,
          itemStyle: {},
        }
        
        if(item.id == 0){
          nodeObj.itemStyle.borderColor = "yellow"
          nodeObj.itemStyle.borderWidth = 5
          nodeObj.x = 115.97
          nodeObj.y = 29.71

        }
        return nodeObj
      })
      let links = data.links.map(item=>{
        return {
          source: item.source,
          target: item.target,
          name: item.name
        }
      })
      console.log(nodes, links)
      let option = {
        animationDuration: 1500,
        legendHoverLink : true,//启用图例 hover 时的联动高亮。
        focusNodeAdjacency : true,//在鼠标移到节点上的时候突出显示节点以及节点的边和邻接节点。
        roam : true,
        label : {
          normal : {
            show : true,
            position : 'inside',
            textStyle : {
              fontSize : 12
            },
          }
        },
        force : {
          repulsion : 1000,
          edgeLength: [1000,  2000]
        },
        edgeSymbol: ['circle', 'arrow'],
        edgeSymbolSize : [ 4, 50 ],
        edgeLabel : {
          normal : {
            show : true,
            textStyle : {
              fontSize : 10
            },
            formatter : "{c}"
          }
        },
        series:[{
          type : 'graph',
          layout : 'force',//采用力引导布局
          symbolSize : 45,
          legendHoverLink : true,//启用图例 hover 时的联动高亮。
          focusNodeAdjacency : true,//在鼠标移到节点上的时候突出显示节点以及节点的边和邻接节点。
          roam : true,
          label : {
            normal : {
              show : true,
              position : 'inside',
              textStyle : {
                fontSize : 12
              },
            }
          },
          force : {
            repulsion : 800
          },
          edgeSymbol: ['', 'arrow'],
          edgeLabel : {
            normal : {
              show : true,
              textStyle : {
                fontSize : 10
              },
              formatter : (el)=>{
                return el.data.name
              }
            }
          },
          data :nodes,
          links : links,
          lineStyle : {
            normal : {
              opacity : 0.9,
              width : 1,
              curveness : 0.3
            }
          },
          itemStyle: {
            borderColor: '#fff',
            borderWidth: 1,
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.3)'
          }
        }]
      }
      chart.setOption(option)
    }
  }
}
</script>

<style lang="less" scoped>
.search-title {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 25px;
}
.search-box {
  padding: 0 50px;
  display: flex;
  /deep/ .el-input__inner {
    border: 1px solid #c4c7ce;
    height: 46px;
    line-height: 46px;
    box-shadow: none;
    border-radius: 24px;
    padding-left: 45px;
    width: 95%;
    float: left;
    &:hover {
      border: 1px solid #007acf;
    }
  }
  /deep/ .el-input__prefix {
    font-size: 20px;
    top: 2px;
    left: 15px;
  }
}

.container {
  width: 1140px;
  margin: 0 auto;
}
.search-page {
  height: calc(100vh - 90px);
  // background: #ddd;
}
.search-wrapper {
  padding-top: 30px;
}
.search-box {
  line-height: 1;
  margin-bottom: 50px;
}
.as-list {
  min-height: 300px;
}
.as-item {
  margin-bottom: 20px;
  font-size: 16px;
  padding: 10px 5px;
  border-bottom: 1px solid #888;
  &:last-child {
    border-bottom: none;
  }
  &__title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 5px;
    &:hover {
      color: #007acf;
    }
  }
  &__ent {
    &-tag {
      font-size: 20px;
      font-weight: bold;
    }
  }
}

.as-item__ent-tag_item{
  cursor: pointer;
  &:hover{
    color: #007acf;
  }
}

.questionTitle{
  font-size: 16px;
  font-weight: bold;
  padding-bottom: 10px;
}
.question{
  font-size: 16px;
  padding-bottom: 10px;
  cursor: pointer;
  &:hover{
    color: red;
  }
}

.as-box{
  width: 100%;
  overflow: hidden;
  &>div{
    width: 50%;
    float: left;
  }
  #chartBox{
    height: 400px;
  }
}
</style>
