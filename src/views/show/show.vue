<template>
  <div class="showBox">
      <div v-loading="loading"
        :element-loading-text="loadingText"
        element-loading-spinner="el-icon-loading"
        style="width: 100%; height: 100%">
            <div class="chart" id="mynetwork"></div>
      </div>
      
      <div class="timeBox">
          <ul>
              <li class="item" v-show="isShowBF" @click="leaves">
                  <img :src="bofang" alt="">
              </li>
              <li class="item" v-show="!isShowBF" @click="enters">
                  <img :src="zanting" alt="">
              </li>
          </ul>
      </div>
      <div class="msgBox" @mouseover="enter" @mouseleave="leave">
        <swiper style="height: 100%" ref="mySwiper" :options="swiperOptions">
            <swiper-slide v-for="item in data" :key='item.name'>
                <div class="item" >
                    <img :src="item.img" alt="">
                        <div>
                            <div class="title">{{item.name}}</div>
                            <div class="msg">{{item.msg}}</div>
                        </div>
                </div>
            </swiper-slide>
        </swiper>
      </div>
        <div class="stepBox">
            <el-steps direction="vertical" :active="index">
                <el-step v-for="item in data" :key='item.name'></el-step>
            </el-steps>
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

  </div>
</template>

<script>
import {data} from './data'

import { searchFrameCondition } from '@/api/search'

import { Network, DataSet } from 'visjs-network'
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css' 
const images = [
  require('./assets/c0.png'),
  require('./assets/c1.svg'),
  require('./assets/c2.svg'),
  require('./assets/c3.svg'),
  require('./assets/c4.svg'),
  require('./assets/c5.svg'),
]


export default {
    name:"show",
    data(){
        let vm = this
        return {
            chartData: data,
            data: [
                {
                "name": "从无到有：我国第一支电子管30型直热式放大管",
                "msg": "1936 年 5 月，上海交通大学 1935 年毕业的单宗肃（1910—1990）在南京试制成功我国第一只电子管——30 型直热式放大管。",
                "type": "第一代计算机",
                'img': require('./images/1.jpg'),
                "central_id": 0
                },
                {
                "name": "数学所：中国第一个计算机组",
                "msg": "1953 年 1 月 3 日，夏培肃和研究实习员王传英从清华大学调到中科院数学所，计算机组的工作全面展开。由此中国第一个计算机研究小组组成：组长闵乃大，组员夏培肃、王传英。闵乃大，41 岁；夏培肃此时还不到30 岁。他们二人都有实验室的工作经验，困难的是要“白手起家”。",
                "type": "第一代计算机",
                'img': require('./images/2.png'),
                "central_id": 53
                },
                {
                "name": "《漫谈计算机》:中国报道计算机第一篇文章",
                "msg": "1954 年 11 月 8 日，《光明日报》发表了 1500 字的《漫谈计算机》，这是新中国报刊第一篇介绍计算机的署名文章，讲述生动、通俗。这篇文章以吴几康的名义发表。第一篇介绍计算机的文章",
                "type": "第一代计算机",
                'img': require('./images/3.png'),
                "central_id": 5
                },
                {
                "name": "从无到有：我国第一台电子管计算机",
                "msg": "我国第一台电子管计算机，有两个公认的代表：一个是我国第一台小型电子管计算机，另一个是我国第一台大型电子管计算机。前者是1958 年8月1日诞生的103计算机，后者是1959年4月30日调通的104计算机。",
                "type": "第一代计算机",
                'img': require('./images/4.jpg'),
                "central_id": 7
                },
                {
                "name": "人工智能初探：哈工大三维下棋机",
                "msg": "1958 年，哈工大计算机专业有了两个班的学生，十名教师和研究生及本科生一起，研制能说话、会下棋的数字计算机，高铁校长几乎每晚都到实验室来观看鼓劲，在器材供应上一路绿灯，有求必应。",
                "type": "第一代计算机",
                'img': require('./images/5.jpg'),
                "central_id": 12
                },
                {
                "name": "国防功臣：119机",
                "msg": "1959年夏，由安东、北京大学张世龙和计算所所长阎沛霖，在计算所共同商定由北京大学、计算所、国防科工委五院各出两三个人组成小组，由张世龙负责主持前期的系统设计，并确定整个系统由三台晶体管计算机组成，总称109项目。事实上，它分为109甲机、109乙机和109丙机三个型号。\r\n119机在1964年4月研制成功，通用浮点44二进制位、平均浮点运算速度每秒5万次。119机是我国第一台自行设计和研制的大型通用数字电子管计算机。经国家科委组织鉴定后交付使用，用于我国第一颗氢弹研制的计算任务、全国首次大油田实际资料动态预报的计算任务等。",
                "type": "第一代计算机",
                'img': require('./images/6.jpg'),
                "central_id": 13
                },
                {
                "name": "109乙机：第一台晶体管计算机",
                "msg": "1965年6月计算所蒋士飞主持研制成功109乙晶体管大型通用数字计算机，字长32位，内存容量为双体24K字，运算速度为定点运算每秒9万次，浮点运算每秒6万次，所用器材全部是国产的。该机的研制成功，表明我国进入了电子计算机的“第二代”。",
                "type": "第二代计算机",
                'img': require('./images/7.jpg'),
                "central_id": 16
                },
                {
                "name": "经典二代机：441-B型晶体管计算机",
                "msg": "1962年3月5日哈尔滨军事工程学院（以下简称哈军工）成立了晶体管计算机设计组，由慈云桂担任组长，康鹏担任副组长。当时我国半导体器件还不能满足计算机技术的要求，能供计算机用的晶体管型号、产品很少，质量也经常达不到要求，其中晶体管的工作寿命短和不稳定是两大主要问题。当年5月，康鹏研制出了“隔离-阻塞振荡器”，解决了晶体管性能不稳的问题，该电路又被称为“康鹏电路”， “康鹏电路”为当时晶体管计算机的研制起到了重要的作用。\r\n1965年，国防科工委决定全面公开441-B的电路和图纸资料。哈工大举办培训班，各地院所纷纷进行441-B复制和推广集训。之后有上百台441型计算机遍及全国，培养了数以千计的开发、应用人员，441-B占当时全国计算机数量的1/3以上。",
                "type": "第二代计算机",
                'img': require('./images/8.jpg'),
                "central_id": 19
                },
                {
                "name": "各显神通：晶体管机的大跃进",
                "msg": "60年代中期，华北计算技术研究所、华东计算所、清华大学、北京有线电厂等单位在研制晶体管计算机方面也有进展。如北京有线电厂和华北计算所的121机，清华大学和北京计算机三厂的112机，华东计算所和上海计算机厂的X-2机，华北计算所和北京有线电厂的108乙机等。这些计算机在各自的应用中大显身手，其中108乙机参加了我国发射第一颗人造地球卫星的任务。",
                "type": "第二代计算机",
                'img': require('./images/9.png'),
                "central_id": 21
                },
                {
                "name": "横空出世：111机引领我国小规模集成电路电子计算机",
                "msg": "1968年7月至1971年5月计算所研制成功我国第一台小规模集成电路通用数字电子计算机111机。1976年11月，计算所研制成功大型通用集成电路通用数字电子计算机013机。013机为二机部九院服务了14年，稳定运行时间13万小时以上。这两个型号的计算机都是在“文革“期间完成，使我国没有被世界上集成电路技术的发展拉得太远，但与“文革”以前相比，我国在计算机系统的研制上与世界水平的差距被拉大了。",
                "type": "第三代计算机",
                'img': require('./images/10.jpg'),
                "central_id": 25
                },
                {
                "name": "榜上有名：哈军工探路中国集成电路计算机",
                "msg": "1965年哈军工441-B／I型机鉴定会刚刚结束，慈云桂便提出研制中国的集成电路计算机，并于1966年提出了总体方案。1970年秋，哈军工主体南迁长沙，在慈云桂的带领下继续攻关，通过3年时间完成了逻辑设计、工程设计和模型试验。1977年夏，性能上同样达到百万次运算速度的集成电路计算机151-3研制成功。次年10月，200万次集成电路大型通用计算机系统151-4通过国家验收。1980年，151集成电路计算机装在“远望”号测量船上，南征太平洋，为完成中国首次洲际导弹飞行测量任务立下功劳。151机的研究团队荣立集体一等功，研制的151-3/4型机最终获国防科技成果一等奖，并和远望号远洋科学测量船一起获国家级科技进步特等奖",
                "type": "第三代计算机",
                'img': require('./images/01.png'),
                "central_id": 27
                },
                {
                "name": "向百万进军：百万次集成电路150计算机",
                "msg": "1973年8月26日，我国正式发布自行设计的第一台百万次电子数字计算机DJS-11机（即150机）研制成功，该机采用集成电路器件，字长48位，内存容量13万字。外部设备有磁带机、磁盘机、打字机、穿孔机以及输入、输出机等共有9种22台。它为我国石油勘探、气象预报、军事研究、科学计算等领域做出很大贡献。",
                "type": "第三代计算机",
                'img': require('./images/11.jpg'),
                "central_id": 28
                },
                {
                "name": "国产个人电脑的早期研制阶段",
                "msg": "1983年12月电子部六所开发成功微型计算机长城100（DJS-0520微机），该机具备了个人电脑的主要使用特征。同年，中科院计算所研制成功GF20/11A汉字微机系统，这是我国第一台在操作系统核心部分进行改造的汉字系统，并配置了汉化的关系数据库。1985年4月我国成功研制出第一台具有字符发生器汉字显示能力、具备完整中文信息处理功能的国产微机长城0520CH。1985年11月，中科院计算所研制成功联想式汉字微型机LX-PC系统。1991年，联想集团研制成功联想EISA486/50微机。该系统是联想系列微型机中代表产品之一。",
                "type": "第四代计算机",
                'img': require('./images/12.jpg'),
                "central_id": 29
                },
                {
                "name": "国产处理器",
                "msg": "1.北大众志CPU\r\n北大众志CPU是由北京大学研制成功，主要应用面向网络计算机、工业控制、机顶盒等领域。\r\n2.龙芯CPU\r\n龙芯CPU是由中科院计算所研制的系列高性能通用CPU，主要包括“龙芯1号”、“龙芯2号”和多核“龙芯3号”系列。\r\n3.飞腾CPU\r\n飞腾CPU是由国防科学技术大学研制的面向高性能计算机需求的系列高性能通用CPU，主要包括“飞腾64-1”、“飞腾64-2”、“飞腾-1000”、“飞腾-1500”等。\r\n4.申威CPU\r\n申威CPU是上海高性能集成电路设计中心研制的系列通用处理器，也主要面向高性能计算机应用。\r\n嵌入式处理器主要是为了满足一些小型计算机设备使用，通常要求功耗比较低。国产嵌入式处理器的发展基本与国产通用处理器的研制过程同步进行，形成了方舟系列、君正JZ系列、C-Core系列、龙腾系列等不同的芯片系统。",
                "type": "第四代计算机",
                'img': require('./images/02.png'),
                "central_id": 33
                },
                {
                "name": "国产操作系统",
                "msg": "1983年，国防科技大学的银河-I亿次巨型机研制成功，为其开发的操作系统YHOS成为中国研制成功的第一个巨型机上的操作系统。90年代，国防科技大学又相继完成了银河-II、银河III、银河新一代巨型机操作系统、银河超级服务器操作系统等的研制，这些系统成功用于气象预测、核技术研究等国防与国民经济的重要部门，得到了大型生产性业务运行的考验，发挥了重要作用。\r\n基于Unix/Linux技术体系的主要产品 COSIX操作系统 麒麟操作系统红旗操作系统等。",
                "type": "第四代计算机",
                'img': require('./images/03.png'),
                "central_id": 42
                },
                {
                "name": "银河-I：中国超算迈入亿次计算俱乐部",
                "msg": "1978年3月，邓小平亲自作出决定，由国防科技大学负责研制亿次巨型计算机。慈云桂担任了这一任务的总指挥和总设计师。1983年12月22日，采用共享存储体系结构的“银河1号”巨型计算机在长沙研制成功，其浮点运算速度达每秒1亿次，是我国自行研制的第一台每秒浮点运算亿次以上的巨型计算机，填补了国内巨型计算机的空白，标志着中国进入了世界研制巨型计算机的行列，并荣获特等国防科技成果奖。",
                "type": "第四代计算机",
                'img': require('./images/13.jpg'),
                "central_id": 41
                },
                {
                "name": "首次超越：“天河一号A”问鼎世界超算排行榜",
                "msg": "距2009年“天河一号”研制成功后，时隔1年，国防科技大学研制成功了“天河一号”的升级版“天河一号A”，并于2010年11月发布。“天河一号A”部分采用了国防科技大学研制的“飞腾－1000”CPU芯片。该机峰值速度为每秒4700万亿次，实测Linpack持续速度为每秒2566万亿次，在2010年11月世界超级计算机TOP500排名榜上位列世界第一。至此我国在高性能计算机领域实现了对国外最先进技术的超越，也是我国计算机事业发展中具有标志性的事件。",
                "type": "第四代计算机",
                'img': require('./images/14.jpg'),
                "central_id": 46
                }
            ],
            swiperOptions: {
                autoplay: {
                    delay: 5000,
                    stopOnLastSlide: true,
                    disableOnInteraction: false
                },
                loop: true,
                direction: 'vertical',
                slidesPerView: 'auto',
                on:{
                    slideChange:function(){
                        if(this.activeIndex - vm.data.length > vm.data.length - 1){
                            vm.index = 0
                        }else if(this.activeIndex - vm.data.length < 0){
                            vm.index = vm.data.length
                        }else{
                            vm.index = this.activeIndex - vm.data.length
                        }
                    }
                } 
            },
            index: 0,
            isShowSwipet: false,
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
                },
                {
                name: '',
                image: images[5]
                }
            ],
            network: null,
            isShowBF: true,
            bofang: require('./images/b.png'),
            zanting: require('./images/z.png'),
            isFirst: true,
            loading: false,
            loadingText: '',
            dialogVisible: false,
            clickNodeName: '',
            nodeLoading: false,
            nodeInfo: []
        }
    },
    components: { Swiper, SwiperSlide },
    directives: {
        swiper: directive
    },
    watch: {
        index(val){
            let item = this.data[val]
            this.focusRandom(item.central_id)
            if(val == this.data.length - 1){
                this.enters()
            }
        }
    },
    mounted(){
        setTimeout(()=>{
            this.$refs.mySwiper.$swiper.autoplay.stop()
        }, 50)
        this.initData(this.chartData.nodes, this.chartData.links)
        
    },
    methods: {
        initChart(data, msg, subtitle){
            let chart = this.$echart.init(document.getElementById('chart'))
            let categories = [],
                dnodeSize = 19,
                fontSize = 14;
            let nodes = data.nodes.map(item=>{
                if (!item.category) {
                    item.category = item.label;
                }
                if (categories.indexOf(item.category) == -1) {
                    categories.push(item.category);
                }
                item.value = item.value || 0;
                item.symbol = 'circle';
                item.symbolSize = 40;
                item.x = null;
                item.y = null;
                item.itemStyle = null;
                if(item.name == msg){
                    item.x = chart.getWidth() /2
                    item.y = chart.getHeight() /2
                    item.fixed = true
                    item.itemStyle = {
                        borderColor: 'yellow',
                        borderWidth: 5
                    }
                }
                item.label = {
                    normal: {
                        show: true,
                        position: 'right'
                    }
                };
                return item
            })
            let links = data.links.map(item=>{
                return item
            })
            categories = categories.map(category => ({
                name: category
            }));
            let colorPalette = ["#009688", '#03a9f4', "#f44336", "#607d8b", "#e91e63", "#ff5722", "#673ab7",  "#4caf50", "#ff9800", "#8bc34a", "#00bcd4", "#9c27b0"]
            let option = {
                color: colorPalette,
                title: {
                    text: msg,
                    top: '1%',
                    left: '1%',
                    textStyle: {
                        color: "#333333",
                        fontSize: fontSize * 1.8,
                        fontWeight: 'bolder'
                    },
                    subtext: subtitle,
                    subtextStyle: {
                        color: "#333333",
                        fontSize: fontSize,
                        fontWeight: 'bold'
                    }
                },
                tooltip: {
                    formatter: function (params) {
                        if (params.dataType === 'node')
                            return params.data.category;
                        else
                            return params.data.name;
                    }
                },
                legend: {
                    data: categories,
                    bottom: '1%',
                    left: '1%',
                    orient: 'vertical',
                    selectedMode: false,
                    textStyle: {
                        color: '#333',
                        fontSize: fontSize * 0.9,
                        fontWeight: 'bold'
                    }
                },
                series: [{
                    type: 'graph',
                    layout: 'force',
                    data: nodes,
                    links: links,
                    categories: categories,
                    edgeSymbol: ['circle', 'arrow'],
                    center: [chart.getWidth() /2, chart.getHeight() /2],
                    lineStyle: {
                        // color: 'source',
                        color: '#2b7ce9',
                        curveness: 0,
                        width: 3,
                        type: 'dashed',
                        opacity: 1
                    },
                    emphasis: {
                        lineStyle: {
                            width: 5
                        }
                    },
                    force: {
                        repulsion: 1000,
                    },
                    roam: true,
                    focusNodeAdjacency: true,
                    animationDuration: 2000
                }]
            }
            // chart.clear()
            chart.setOption(option)
            
            // let taht = this
            // chart.on('click', function (params) {
            //     console.log(params)
            //     option.series[0].center = [params.event.offsetX, params.event.offsetY]
            //     chart.clear()
            //     chart.setOption(option)
            //     // taht.initChart(taht.chartData, params.data.name)
            // });
            
        },
        initCharts(nodes, edgesOptions){7
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

                this.network = new Network(container, data, options)
                // 动画稳定后的处理事件
                let that = this
                var stabilizedTimer
                this.network.once('stabilized', function (params) {
                    window.clearTimeout(stabilizedTimer)
                    stabilizedTimer = setTimeout(function () {
                        options.physics.enabled = true // 关闭物理系统
                        that.network.setOptions(options)
                    }, 200)
                })

                this.network.on('click', (params) => {
                    params.event = '[original event]'
                    if (params.nodes.length > 0) {
                        this.enter()
                        this.dialogVisible = true
                        const curNodeId = (params.nodes || [])[0]
                        const curNode = nodes.find(node => {
                        return node.id === curNodeId
                        })
                        this.searchFrameCondition(curNode.label)
                    }
                    
                })

                this.network.on('stabilizationProgress', (params) => {
                    this.loading = true
                    const widthFactor = params.iterations / params.total
                    this.loadingText = `拼命加载 ${Math.round(widthFactor * 100)}%`
                })
                this.network.once('stabilizationIterationsDone', () => {
                    this.loading = false
                    this.focusRandom(0)
                })


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
                if(!img){
                    img = images[5]
                }
                const nodeOption = {
                    id: node.id,
                    x: node.x ?? null,
                    y: node.y ?? null,
                    label: node.name,
                    title: node.name,
                    value: node.value * 10,
                    image: img,
                    shape: 'image',
                    node_type: node.category
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
                font: { align: 'middle' }
                }
            })
            this.nodeData = nodes
            this.linkData = edges
            this.initCharts(nodes, edges)
        },
        focusRandom (nodeId) {
            var options = {
                // position: {x:positionx,y:positiony}, // this is not relevant when focusing on nodes
                scale: 1,
                offset: { x: 0, y: 0 },
                animation: {
                duration: 1000,
                easingFunction: 'easeInOutQuint'
                }
            }
            this.network.focus(nodeId, options)
        },
        enter() {
            if(!this.isShowBF){
                this.$refs.mySwiper.$swiper.autoplay.stop()
            }
        },
        leave() {
            if(!this.isShowBF){
                this.$refs.mySwiper.$swiper.autoplay.start()
            }
        },
        enters() {
            this.$refs.mySwiper.$swiper.autoplay.stop()
            this.isShowBF = true
        },
        leaves() {
            if(this.isFirst){
                this.isFirst = false 
                this.initData(this.data[0].nodes, this.data[0].links)
            }
            this.$refs.mySwiper.$swiper.autoplay.start()
            this.isShowBF = false
        },
        searchFrameCondition (node) {
            this.nodeLoading = true
            this.clickNodeName = node
            searchFrameCondition({ node }).then((res) => {
                this.nodeLoading = false
                this.nodeInfo = (res[0] || {}).n || {}
            })
        },
    },
    computed: {
        swiper() {
            return this.$refs.mySwiper.$swiper
        }
    }
}
</script>

<style lang="less" scoped>
div, ul, li {
    box-sizing: border-box;
}
li{
    list-style: none;
}
.showBox{
    width: 100%;
    height: calc(100vh - 90px);
    position: relative;
    .chart{
        width: 100%;
        height: 100%;
    }
    .msgBox{
        position: absolute;
        border: 1px solid #ccc;
        border-radius: 5px;
    }
    .stepBox{
        position: absolute;
        height: 100%;
        left: 50px;
        top: 0;
        bottom: 0;
        margin: auto 0;
    }
    .timeBox{
        width: 50px;
        height: 50px;
        right: 10px;
        top: 5%;
        position: absolute;
        z-index: 333;
        ul{
            position: absolute;
            left: 0;
            top: 0;
            width: 50px;
            height: 50px;
            .item{
                width: 50px;
                height: 50px;
                position: absolute;
                left: 0;
                top: 0;
                & img{
                    width: 50px;   
                    height: 50px;
                    cursor: pointer;
                }
            }
        }
    }
    .msgBox{
        width: 500px;
        height: 171px;
        right: 80px;
        top: 5%;
        background-color: rgba(255, 255, 255, 0.8);
        .item{
            overflow: hidden;
            padding: 10px;
            border-bottom: 1px solid #ccc;
            height: 170px;
        }
        .item>img{
            float: left;
            width: 100px;
            height: 150px;
            margin-right: 20px;
        }
        .item>div{
            width: calc(100% - 122px);
            float: left;
            height: 100%;
            // color: #fff;
            .title{
                font-weight: bold;
                font-size: 18px;
                height: 45px;
            }
            .msg{
                font-size: '14px';
                text-indent: 30px;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box; // 作为弹性伸缩盒子模型显示。
                -webkit-box-orient: vertical; // 设置伸缩盒子的子元素排列方式--从上到下垂直排列
                -webkit-line-clamp: 5; // 显示的行
            }
        }
    }
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

.nodeTitle{
    text-align: center;
    font-weight: bold;
    padding-bottom: 20px;
  }
.swiper-slide{
    height: 171px;
}
</style>