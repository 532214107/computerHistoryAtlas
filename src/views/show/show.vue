<template>
  <div class="showBox">
      <div class="chart" id="mynetwork"></div>
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
  </div>
</template>

<script>
import {data} from './data'

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
                    name: '我国第一台电子管计算机',
                    msg: '关于我国第一台电子管计算机，有两个公认的代表：一个是我国第一台小型电子管计算机，另一个是我国第一台大型电子管计算机。前者是1958 年8月1日诞生的103计算机，后者是1959年4月30日调通的104计算机。',
                    nodes: [
                        {
                            "id": 0,
                            "name": "第一代计算机",
                            "category": "时期",
                            "llength": 0,
                            "neoId": 1,
                            "nodeImg": "null",
                            "source": "其他来源;CCF历史记忆;CCF终身成就奖;徐祖哲《溯源中国计算机三校》",
                            "value": 2
                        },
                        {
                            "id": 1,
                            "name": "中国科学院计算技术研究所",
                            "category": "组织",
                            "llength": 0,
                            "neoId": 1,
                            "nodeImg": "null",
                            "source": "徐祖哲溯源中国计算机",
                            "value": 2
                        },
                        {
                            "id": 2,
                            "name": "103机",
                            "category": "物件",
                            "llength": 0,
                            "neoId": 1,
                            "nodeImg": "null",
                            "source": "徐祖哲《溯源中国计算机三校》",
                            "value": 2
                        },
                        {
                            "id": 3,
                            "name": "104机",
                            "category": "物件",
                            "llength": 0,
                            "neoId": 1,
                            "nodeImg": "null",
                            "source": "徐祖哲溯源中国计算机",
                            "value": 2
                        },
                        {
                            "id": 4,
                            "name": "吴几康",
                            "category": "人物",
                            "llength": 0,
                            "neoId": 1,
                            "nodeImg": "null",
                            "source": "徐祖哲《溯源中国计算机三校》",
                            "value": 2
                        },
                        {
                            "id": 5,
                            "name": "张效祥",
                            "category": "人物",
                            "llength": 0,
                            "neoId": 1,
                            "nodeImg": "null",
                            "source": "徐祖哲溯源中国计算机",
                            "value": 2
                        }
                    ],
                    links: [
                        {
                            "level": 1,
                            "name": "时期",
                            "source": 2,
                            "target": 0,
                            "id": 0
                        },
                        {
                            "level": 1,
                            "name": "时期",
                            "source": 3,
                            "target": 0,
                            "id": 1
                        },
                        {
                            "level": 1,
                            "name": "相关组织",
                            "source": 2,
                            "target": 1,
                            "id": 2
                        },
                        {
                            "level": 1,
                            "name": "相关组织",
                            "source": 3,
                            "target": 1,
                            "id": 3
                        },
                        {
                            "level": 1,
                            "name": "研制者",
                            "source": 2,
                            "target": 4,
                            "id": 4
                        },
                        {
                            "level": 1,
                            "name": "研制者",
                            "source": 3,
                            "target": 4,
                            "id": 5
                        },
                        {
                            "level": 1,
                            "name": "研制者",
                            "source": 2,
                            "target": 5,
                            "id": 4
                        },
                        {
                            "level": 1,
                            "name": "研制者",
                            "source": 3,
                            "target": 5,
                            "id": 5
                        }
                    ],
                    type: '第一代计算机',
                    img: require('./images/1.jpg')
                },
                {
                    name: '我国最早人工智能应用',
                    msg: '1958 年，哈工大计算机专业有了两个班的学生，十名教师和研究生及本科生一起，研制能说话、会下棋的数字计算机，高铁校长几乎每晚都到实验室来观看鼓劲，在器材供应上一路绿灯，有求必应。',
                    nodes: [
                        {
                            "id": 0,
                            "name": "第一代计算机",
                            "category": "时期",
                            "llength": 0,
                            "neoId": 1,
                            "nodeImg": "null",
                            "source": "其他来源;CCF历史记忆;CCF终身成就奖;徐祖哲《溯源中国计算机三校》",
                            "value": 2
                        },
                        {
                            "id": 1,
                            "name": "中国科学院计算技术研究所",
                            "category": "组织",
                            "llength": 0,
                            "neoId": 1,
                            "nodeImg": "null",
                            "source": "徐祖哲溯源中国计算机",
                            "value": 2
                        },
                        {
                            "id": 2,
                            "name": "103机",
                            "category": "物件",
                            "llength": 0,
                            "neoId": 1,
                            "nodeImg": "null",
                            "source": "徐祖哲《溯源中国计算机三校》",
                            "value": 2
                        },
                        {
                            "id": 3,
                            "name": "104机",
                            "category": "物件",
                            "llength": 0,
                            "neoId": 1,
                            "nodeImg": "null",
                            "source": "徐祖哲溯源中国计算机",
                            "value": 2
                        },
                        {
                            "id": 4,
                            "name": "吴几康",
                            "category": "人物",
                            "llength": 0,
                            "neoId": 1,
                            "nodeImg": "null",
                            "source": "徐祖哲《溯源中国计算机三校》",
                            "value": 2
                        },
                        {
                            "id": 5,
                            "name": "张效祥",
                            "category": "人物",
                            "llength": 0,
                            "neoId": 1,
                            "nodeImg": "null",
                            "source": "徐祖哲溯源中国计算机",
                            "value": 2
                        }
                    ],
                    links: [
                        {
                            "level": 1,
                            "name": "时期",
                            "source": 2,
                            "target": 0,
                            "id": 0
                        },
                        {
                            "level": 1,
                            "name": "时期",
                            "source": 3,
                            "target": 0,
                            "id": 1
                        },
                        {
                            "level": 1,
                            "name": "相关组织",
                            "source": 2,
                            "target": 1,
                            "id": 2
                        },
                        {
                            "level": 1,
                            "name": "相关组织",
                            "source": 3,
                            "target": 1,
                            "id": 3
                        },
                        {
                            "level": 1,
                            "name": "研制者",
                            "source": 2,
                            "target": 4,
                            "id": 4
                        },
                        {
                            "level": 1,
                            "name": "研制者",
                            "source": 3,
                            "target": 4,
                            "id": 5
                        },
                        {
                            "level": 1,
                            "name": "研制者",
                            "source": 2,
                            "target": 5,
                            "id": 4
                        },
                        {
                            "level": 1,
                            "name": "研制者",
                            "source": 3,
                            "target": 5,
                            "id": 5
                        }
                    ],
                    type: '第一代计算机',
                    img: require('./images/2.jpg')
                },
                {
                    name: '109乙机：第一台晶体管计算机',
                    msg: '1965年6月计算所蒋士飞主持研制成功109乙晶体管大型通用数字计算机，字长32位，内存容量为双体24K字，运算速度为定点运算每秒9万次，浮点运算每秒6万次，所用器材全部是国产的。该机的研制成功，表明我国进入了电子计算机的“第二代”。',
                    nodes: [
                        {
                            "id": 0,
                            "name": "第一代计算机",
                            "category": "时期",
                            "llength": 0,
                            "neoId": 1,
                            "nodeImg": "null",
                            "source": "其他来源;CCF历史记忆;CCF终身成就奖;徐祖哲《溯源中国计算机三校》",
                            "value": 2
                        },
                        {
                            "id": 1,
                            "name": "中国科学院计算技术研究所",
                            "category": "组织",
                            "llength": 0,
                            "neoId": 1,
                            "nodeImg": "null",
                            "source": "徐祖哲溯源中国计算机",
                            "value": 2
                        },
                        {
                            "id": 2,
                            "name": "103机",
                            "category": "物件",
                            "llength": 0,
                            "neoId": 1,
                            "nodeImg": "null",
                            "source": "徐祖哲《溯源中国计算机三校》",
                            "value": 2
                        },
                        {
                            "id": 3,
                            "name": "104机",
                            "category": "物件",
                            "llength": 0,
                            "neoId": 1,
                            "nodeImg": "null",
                            "source": "徐祖哲溯源中国计算机",
                            "value": 2
                        },
                        {
                            "id": 4,
                            "name": "吴几康",
                            "category": "人物",
                            "llength": 0,
                            "neoId": 1,
                            "nodeImg": "null",
                            "source": "徐祖哲《溯源中国计算机三校》",
                            "value": 2
                        },
                        {
                            "id": 5,
                            "name": "张效祥",
                            "category": "人物",
                            "llength": 0,
                            "neoId": 1,
                            "nodeImg": "null",
                            "source": "徐祖哲溯源中国计算机",
                            "value": 2
                        }
                    ],
                    links: [
                        {
                            "level": 1,
                            "name": "时期",
                            "source": 2,
                            "target": 0,
                            "id": 0
                        },
                        {
                            "level": 1,
                            "name": "时期",
                            "source": 3,
                            "target": 0,
                            "id": 1
                        },
                        {
                            "level": 1,
                            "name": "相关组织",
                            "source": 2,
                            "target": 1,
                            "id": 2
                        },
                        {
                            "level": 1,
                            "name": "相关组织",
                            "source": 3,
                            "target": 1,
                            "id": 3
                        },
                        {
                            "level": 1,
                            "name": "研制者",
                            "source": 2,
                            "target": 4,
                            "id": 4
                        },
                        {
                            "level": 1,
                            "name": "研制者",
                            "source": 3,
                            "target": 4,
                            "id": 5
                        },
                        {
                            "level": 1,
                            "name": "研制者",
                            "source": 2,
                            "target": 5,
                            "id": 4
                        },
                        {
                            "level": 1,
                            "name": "研制者",
                            "source": 3,
                            "target": 5,
                            "id": 5
                        }
                    ],
                    type: '第二代计算机',
                    img: require('./images/3.jpg')
                },
                {
                    name: '经典二代机：441-B型晶体管计算机',
                    msg: '1962年3月5日哈尔滨军事工程学院（以下简称哈军工）成立了晶体管计算机设计组，由慈云桂担任组长，康鹏担任副组长。当时我国半导体器件还不能满足计算机技术的要求，能供计算机用的晶体管型号、产品很少，质量也经常达不到要求，其中晶体管的工作寿命短和不稳定是两大主要问题。当年5月，康鹏研制出了“隔离-阻塞振荡器”，解决了晶体管性能不稳的问题，该电路又被称为“康鹏电路”， “康鹏电路”为当时晶体管计算机的研制起到了重要的作用。',
                    nodes: [
                        {
                            "id": 0,
                            "name": "第一代计算机",
                            "category": "时期",
                            "llength": 0,
                            "neoId": 1,
                            "nodeImg": "null",
                            "source": "其他来源;CCF历史记忆;CCF终身成就奖;徐祖哲《溯源中国计算机三校》",
                            "value": 2
                        },
                        {
                            "id": 1,
                            "name": "中国科学院计算技术研究所",
                            "category": "组织",
                            "llength": 0,
                            "neoId": 1,
                            "nodeImg": "null",
                            "source": "徐祖哲溯源中国计算机",
                            "value": 2
                        },
                        {
                            "id": 2,
                            "name": "103机",
                            "category": "物件",
                            "llength": 0,
                            "neoId": 1,
                            "nodeImg": "null",
                            "source": "徐祖哲《溯源中国计算机三校》",
                            "value": 2
                        },
                        {
                            "id": 3,
                            "name": "104机",
                            "category": "物件",
                            "llength": 0,
                            "neoId": 1,
                            "nodeImg": "null",
                            "source": "徐祖哲溯源中国计算机",
                            "value": 2
                        },
                        {
                            "id": 4,
                            "name": "吴几康",
                            "category": "人物",
                            "llength": 0,
                            "neoId": 1,
                            "nodeImg": "null",
                            "source": "徐祖哲《溯源中国计算机三校》",
                            "value": 2
                        },
                        {
                            "id": 5,
                            "name": "张效祥",
                            "category": "人物",
                            "llength": 0,
                            "neoId": 1,
                            "nodeImg": "null",
                            "source": "徐祖哲溯源中国计算机",
                            "value": 2
                        }
                    ],
                    links: [
                        {
                            "level": 1,
                            "name": "时期",
                            "source": 2,
                            "target": 0,
                            "id": 0
                        },
                        {
                            "level": 1,
                            "name": "时期",
                            "source": 3,
                            "target": 0,
                            "id": 1
                        },
                        {
                            "level": 1,
                            "name": "相关组织",
                            "source": 2,
                            "target": 1,
                            "id": 2
                        },
                        {
                            "level": 1,
                            "name": "相关组织",
                            "source": 3,
                            "target": 1,
                            "id": 3
                        },
                        {
                            "level": 1,
                            "name": "研制者",
                            "source": 2,
                            "target": 4,
                            "id": 4
                        },
                        {
                            "level": 1,
                            "name": "研制者",
                            "source": 3,
                            "target": 4,
                            "id": 5
                        },
                        {
                            "level": 1,
                            "name": "研制者",
                            "source": 2,
                            "target": 5,
                            "id": 4
                        },
                        {
                            "level": 1,
                            "name": "研制者",
                            "source": 3,
                            "target": 5,
                            "id": 5
                        }
                    ],
                    type: '第二代计算机',
                    img: require('./images/4.jpg')
                },
                {
                    name: '三代机问世：111型集成电路计算机',
                    msg: '1965年8月至1966年9月沈绪榜主持设计研制了我国第一台国产双极型小规模集成电路航天制导计算机，当时称为156组件计算机，它是我国第一台自行设计的用于控制导弹弹体的专用机，提供国防部五院（后改为七机部）使用。',
                    nodes: [
                        {
                            "id": 0,
                            "name": "第一代计算机",
                            "category": "时期",
                            "llength": 0,
                            "neoId": 1,
                            "nodeImg": "null",
                            "source": "其他来源;CCF历史记忆;CCF终身成就奖;徐祖哲《溯源中国计算机三校》",
                            "value": 2
                        },
                        {
                            "id": 1,
                            "name": "中国科学院计算技术研究所",
                            "category": "组织",
                            "llength": 0,
                            "neoId": 1,
                            "nodeImg": "null",
                            "source": "徐祖哲溯源中国计算机",
                            "value": 2
                        },
                        {
                            "id": 2,
                            "name": "103机",
                            "category": "物件",
                            "llength": 0,
                            "neoId": 1,
                            "nodeImg": "null",
                            "source": "徐祖哲《溯源中国计算机三校》",
                            "value": 2
                        },
                        {
                            "id": 3,
                            "name": "104机",
                            "category": "物件",
                            "llength": 0,
                            "neoId": 1,
                            "nodeImg": "null",
                            "source": "徐祖哲溯源中国计算机",
                            "value": 2
                        },
                        {
                            "id": 4,
                            "name": "吴几康",
                            "category": "人物",
                            "llength": 0,
                            "neoId": 1,
                            "nodeImg": "null",
                            "source": "徐祖哲《溯源中国计算机三校》",
                            "value": 2
                        },
                        {
                            "id": 5,
                            "name": "张效祥",
                            "category": "人物",
                            "llength": 0,
                            "neoId": 1,
                            "nodeImg": "null",
                            "source": "徐祖哲溯源中国计算机",
                            "value": 2
                        }
                    ],
                    links: [
                        {
                            "level": 1,
                            "name": "时期",
                            "source": 2,
                            "target": 0,
                            "id": 0
                        },
                        {
                            "level": 1,
                            "name": "时期",
                            "source": 3,
                            "target": 0,
                            "id": 1
                        },
                        {
                            "level": 1,
                            "name": "相关组织",
                            "source": 2,
                            "target": 1,
                            "id": 2
                        },
                        {
                            "level": 1,
                            "name": "相关组织",
                            "source": 3,
                            "target": 1,
                            "id": 3
                        },
                        {
                            "level": 1,
                            "name": "研制者",
                            "source": 2,
                            "target": 4,
                            "id": 4
                        },
                        {
                            "level": 1,
                            "name": "研制者",
                            "source": 3,
                            "target": 4,
                            "id": 5
                        },
                        {
                            "level": 1,
                            "name": "研制者",
                            "source": 2,
                            "target": 5,
                            "id": 4
                        },
                        {
                            "level": 1,
                            "name": "研制者",
                            "source": 3,
                            "target": 5,
                            "id": 5
                        }
                    ],
                    type: '第三代计算机',
                    img: require('./images/5.jpg')
                },
                {
                    name: '向百万进军：百万次集成电路150计算机',
                    msg: '从1969年开始，北京大学（包括杨芙清、许卓群、张兴华、董士海等骨干成员）与北京有线电厂（包括孙强南、陈华林等骨干成员）一起，和燃化部等单位合作，共同设计试制150计算机。从1973年2月至8月，经过3000多小时的试算运转，证明这台计算机性能稳定，在解题能力、外部设备和管理、语言编译、符号汇编等功能和性能上均已达到设计要求。',
                    nodes: [
                        {
                            "id": 0,
                            "name": "第一代计算机",
                            "category": "时期",
                            "llength": 0,
                            "neoId": 1,
                            "nodeImg": "null",
                            "source": "其他来源;CCF历史记忆;CCF终身成就奖;徐祖哲《溯源中国计算机三校》",
                            "value": 2
                        },
                        {
                            "id": 1,
                            "name": "中国科学院计算技术研究所",
                            "category": "组织",
                            "llength": 0,
                            "neoId": 1,
                            "nodeImg": "null",
                            "source": "徐祖哲溯源中国计算机",
                            "value": 2
                        },
                        {
                            "id": 2,
                            "name": "103机",
                            "category": "物件",
                            "llength": 0,
                            "neoId": 1,
                            "nodeImg": "null",
                            "source": "徐祖哲《溯源中国计算机三校》",
                            "value": 2
                        },
                        {
                            "id": 3,
                            "name": "104机",
                            "category": "物件",
                            "llength": 0,
                            "neoId": 1,
                            "nodeImg": "null",
                            "source": "徐祖哲溯源中国计算机",
                            "value": 2
                        },
                        {
                            "id": 4,
                            "name": "吴几康",
                            "category": "人物",
                            "llength": 0,
                            "neoId": 1,
                            "nodeImg": "null",
                            "source": "徐祖哲《溯源中国计算机三校》",
                            "value": 2
                        },
                        {
                            "id": 5,
                            "name": "张效祥",
                            "category": "人物",
                            "llength": 0,
                            "neoId": 1,
                            "nodeImg": "null",
                            "source": "徐祖哲溯源中国计算机",
                            "value": 2
                        }
                    ],
                    links: [
                        {
                            "level": 1,
                            "name": "时期",
                            "source": 2,
                            "target": 0,
                            "id": 0
                        },
                        {
                            "level": 1,
                            "name": "时期",
                            "source": 3,
                            "target": 0,
                            "id": 1
                        },
                        {
                            "level": 1,
                            "name": "相关组织",
                            "source": 2,
                            "target": 1,
                            "id": 2
                        },
                        {
                            "level": 1,
                            "name": "相关组织",
                            "source": 3,
                            "target": 1,
                            "id": 3
                        },
                        {
                            "level": 1,
                            "name": "研制者",
                            "source": 2,
                            "target": 4,
                            "id": 4
                        },
                        {
                            "level": 1,
                            "name": "研制者",
                            "source": 3,
                            "target": 4,
                            "id": 5
                        },
                        {
                            "level": 1,
                            "name": "研制者",
                            "source": 2,
                            "target": 5,
                            "id": 4
                        },
                        {
                            "level": 1,
                            "name": "研制者",
                            "source": 3,
                            "target": 5,
                            "id": 5
                        }
                    ],
                    type: '第三代计算机',
                    img: require('./images/6.jpg')
                },
                {
                    name: '超级计算机：银河问世',
                    msg: '1978年3月，邓小平亲自作出决定，由国防科技大学负责研制亿次巨型计算机。慈云桂担任了这一任务的总指挥和总设计师。1983年12月22日，采用共享存储体系结构的“银河1号”巨型计算机在长沙研制成功，其浮点运算速度达每秒1亿次，是我国自行研制的第一台每秒浮点运算亿次以上的巨型计算机，填补了国内巨型计算机的空白，标志着中国进入了世界研制巨型计算机的行列，并荣获特等国防科技成果奖。',
                    nodes: [
                        {
                            "id": 0,
                            "name": "第一代计算机",
                            "category": "时期",
                            "llength": 0,
                            "neoId": 1,
                            "nodeImg": "null",
                            "source": "其他来源;CCF历史记忆;CCF终身成就奖;徐祖哲《溯源中国计算机三校》",
                            "value": 2
                        },
                        {
                            "id": 1,
                            "name": "中国科学院计算技术研究所",
                            "category": "组织",
                            "llength": 0,
                            "neoId": 1,
                            "nodeImg": "null",
                            "source": "徐祖哲溯源中国计算机",
                            "value": 2
                        },
                        {
                            "id": 2,
                            "name": "103机",
                            "category": "物件",
                            "llength": 0,
                            "neoId": 1,
                            "nodeImg": "null",
                            "source": "徐祖哲《溯源中国计算机三校》",
                            "value": 2
                        },
                        {
                            "id": 3,
                            "name": "104机",
                            "category": "物件",
                            "llength": 0,
                            "neoId": 1,
                            "nodeImg": "null",
                            "source": "徐祖哲溯源中国计算机",
                            "value": 2
                        },
                        {
                            "id": 4,
                            "name": "吴几康",
                            "category": "人物",
                            "llength": 0,
                            "neoId": 1,
                            "nodeImg": "null",
                            "source": "徐祖哲《溯源中国计算机三校》",
                            "value": 2
                        },
                        {
                            "id": 5,
                            "name": "张效祥",
                            "category": "人物",
                            "llength": 0,
                            "neoId": 1,
                            "nodeImg": "null",
                            "source": "徐祖哲溯源中国计算机",
                            "value": 2
                        }
                    ],
                    links: [
                        {
                            "level": 1,
                            "name": "时期",
                            "source": 2,
                            "target": 0,
                            "id": 0
                        },
                        {
                            "level": 1,
                            "name": "时期",
                            "source": 3,
                            "target": 0,
                            "id": 1
                        },
                        {
                            "level": 1,
                            "name": "相关组织",
                            "source": 2,
                            "target": 1,
                            "id": 2
                        },
                        {
                            "level": 1,
                            "name": "相关组织",
                            "source": 3,
                            "target": 1,
                            "id": 3
                        },
                        {
                            "level": 1,
                            "name": "研制者",
                            "source": 2,
                            "target": 4,
                            "id": 4
                        },
                        {
                            "level": 1,
                            "name": "研制者",
                            "source": 3,
                            "target": 4,
                            "id": 5
                        },
                        {
                            "level": 1,
                            "name": "研制者",
                            "source": 2,
                            "target": 5,
                            "id": 4
                        },
                        {
                            "level": 1,
                            "name": "研制者",
                            "source": 3,
                            "target": 5,
                            "id": 5
                        }
                    ],
                    type: '第四代计算机',
                    img: require('./images/7.jpg')
                },
                {
                    name: '天河二号',
                    msg: '天河二号超级计算机系统由170个机柜组成，包括125个计算机柜、8个服务机柜、13个通信机柜和24个存储机柜，占地面积720平方米，内存总容量1400万亿字节，存储总容量12400万亿字节，最大运行功耗17.8兆瓦。',
                    nodes: [
                        {
                            "id": 0,
                            "name": "第一代计算机",
                            "category": "时期",
                            "llength": 0,
                            "neoId": 1,
                            "nodeImg": "null",
                            "source": "其他来源;CCF历史记忆;CCF终身成就奖;徐祖哲《溯源中国计算机三校》",
                            "value": 2
                        },
                        {
                            "id": 1,
                            "name": "中国科学院计算技术研究所",
                            "category": "组织",
                            "llength": 0,
                            "neoId": 1,
                            "nodeImg": "null",
                            "source": "徐祖哲溯源中国计算机",
                            "value": 2
                        },
                        {
                            "id": 2,
                            "name": "103机",
                            "category": "物件",
                            "llength": 0,
                            "neoId": 1,
                            "nodeImg": "null",
                            "source": "徐祖哲《溯源中国计算机三校》",
                            "value": 2
                        },
                        {
                            "id": 3,
                            "name": "104机",
                            "category": "物件",
                            "llength": 0,
                            "neoId": 1,
                            "nodeImg": "null",
                            "source": "徐祖哲溯源中国计算机",
                            "value": 2
                        },
                        {
                            "id": 4,
                            "name": "吴几康",
                            "category": "人物",
                            "llength": 0,
                            "neoId": 1,
                            "nodeImg": "null",
                            "source": "徐祖哲《溯源中国计算机三校》",
                            "value": 2
                        },
                        {
                            "id": 5,
                            "name": "张效祥",
                            "category": "人物",
                            "llength": 0,
                            "neoId": 1,
                            "nodeImg": "null",
                            "source": "徐祖哲溯源中国计算机",
                            "value": 2
                        }
                    ],
                    links: [
                        {
                            "level": 1,
                            "name": "时期",
                            "source": 2,
                            "target": 0,
                            "id": 0
                        },
                        {
                            "level": 1,
                            "name": "时期",
                            "source": 3,
                            "target": 0,
                            "id": 1
                        },
                        {
                            "level": 1,
                            "name": "相关组织",
                            "source": 2,
                            "target": 1,
                            "id": 2
                        },
                        {
                            "level": 1,
                            "name": "相关组织",
                            "source": 3,
                            "target": 1,
                            "id": 3
                        },
                        {
                            "level": 1,
                            "name": "研制者",
                            "source": 2,
                            "target": 4,
                            "id": 4
                        },
                        {
                            "level": 1,
                            "name": "研制者",
                            "source": 3,
                            "target": 4,
                            "id": 5
                        },
                        {
                            "level": 1,
                            "name": "研制者",
                            "source": 2,
                            "target": 5,
                            "id": 4
                        },
                        {
                            "level": 1,
                            "name": "研制者",
                            "source": 3,
                            "target": 5,
                            "id": 5
                        }
                    ],
                    type: '第四代计算机',
                    img: require('./images/3.jpg')
                },
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
                }
            ],
            network: null,
            isShowBF: true,
            bofang: require('./images/b.png'),
            zanting: require('./images/z.png')
        }
    },
    components: { Swiper, SwiperSlide },
    directives: {
        swiper: directive
    },
    watch: {
        index(val){
            let item = this.data[val]
            let obj = {
                links: item.links,
                nodes: item.nodes
            }
            this.$refs.mySwiper.$swiper.autoplay.stop()
            this.initData(item.nodes, item.links)
        }
    },
    mounted(){
        this.initData(this.chartData.nodes, this.chartData.links)
        setTimeout(()=>{
            this.$refs.mySwiper.$swiper.autoplay.stop()
        }, 50)
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
        initCharts(nodes, edgesOptions){
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
                // this.network.once('beforeDrawing', function () {
                //     this.network.focus(0, {
                //         scale: 0.6
                //     })
                // })
                //
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
                this.network.once('stabilizationIterationsDone', () => {
                    this.focusRandom(1)
                })
                this.$refs.mySwiper.$swiper.autoplay.start()
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
                    value: node.value * 10,
                    image: img,
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
                scale: 0.8,
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
            this.$refs.mySwiper.$swiper.autoplay.start()
            this.isShowBF = false
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
        width: 80%;
        height: 100%;
    }
    .msgBox{
        position: absolute;
        border: 1px solid #ccc;
        border-radius: 5px;
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
        height: 510px;
        right: 2%;
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
                font-size: 20px;
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
.swiper-slide{
    height: 171px;
}
</style>