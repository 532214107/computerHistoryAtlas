<template>
  <div class="showBox">
      <div v-loading="loading"
        :element-loading-text="loadingText"
        element-loading-spinner="el-icon-loading"
        style="width: 100%; height: 100%;"
        class="mainBox">
            <div class="chart" id="mynetwork"></div>
            <div class="toptipBox" v-show="isSHowToptip" :style="{left: toptipX, top: toptipY}">
                {{toptipText}}
            </div>
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
            <swiper-slide v-for="(item, i) in data" :key='item.name'>
                <div class="item" :class="{action: index == i}">
                    <img :src="item.img" alt="">
                        <div>
                            <div class="title">{{item.name}}</div>
                            <span class="msg" @mouseenter="mouseover" @mouseleave="isShowTooltipBox = false">
                                {{item.msg}}
                            </span>
                        </div>
                </div>
            </swiper-slide>
        </swiper>
      </div>
        <div class="stepBox">
            <el-steps direction="vertical" :active="index">
                <el-step v-for="item in data" :key='item.name' :title="item.type"></el-step>
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

    <div class="tooltipBox" :style="{left: tooltipX, top: tooltipY}" v-show="isShowTooltipBox"> {{toolText}} </div>

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
                'img': require('./images/1.png'),
                "central_id": 0
                },
                {
                "name": "数学所：中国第一个计算机组",
                "msg": "1953 年 1 月 3 日，夏培肃和研究实习员王传英从清华大学调到中科院数学所，计算机组的工作全面展开。由此中国第一个计算机研究小组组成：组长闵乃大，组员夏培肃、王传英。闵乃大，41 岁；夏培肃此时还不到30 岁。他们二人都有实验室的工作经验，困难的是要“白手起家”。",
                "type": "",
                'img': require('./images/2.png'),
                "central_id": 53
                },
                {
                "name": "《漫谈计算机》:中国报道计算机第一篇文章",
                "msg": "1954 年 11 月 8 日，《光明日报》发表了 1500 字的《漫谈计算机》，这是新中国报刊第一篇介绍计算机的署名文章，讲述生动、通俗。这篇文章以吴几康的名义发表。第一篇介绍计算机的文章",
                "type": "",
                'img': require('./images/3.png'),
                "central_id": 5
                },
                {
                "name": "计算机事业摇篮：中国科学院计算技术研究所",
                "msg": "中国科学院计算技术研究所（以下简称“计算所”）成立于1959年5月17日，是中国第一个专门从事计算机科学技术综合性研究的学术机构，是我国计算机事业的摇篮，先后培养了几百名我国最早的计算技术专业人员，在科学研究和科技成果等方面取得了显著成就。\n从1960年到1966年，计算所在国内招收培养了24名研究生。文革时期招生工作被中断，直到1977年再次恢复。1978年，计算所择优录取了64名首批硕士生，其中41人在国内培养，23人分赴国外的大学和科研单位攻读学位。在国内取得学位的硕士中，约有半数人选择在计算所工作；在国外的留学人员，从1983年起陆续有人学成回国。在20世纪六七十年代，计算所培养了一批高质量的研究生，他们当中的许多人已成为国内外知名的计算机科学家、学科带头人、知名的企业家，有些人还当选为两院院士。",
                "type": "",
                'img': require('./images/4.png'),
                "central_id": 55
                },
                {
                "name": "《计算机研究与发展》：我国第一个计算机刊物",
                "msg": "我国的计算机期刊是随着各计算机相关科研院所的筹备和发展而相继创办的。\n1958年，《计算机研究与发展》由中国科学院计算技术研究所创刊。这是我国第一个计算机刊物，现由中国科学院计算技术研究所和中国计算机学会共同主办。此后陆续有一系列期刊，其中包括：《计算机工程与应用》（1964年创刊，华北计算技术研究所主办）、《微电子学与计算机》（1972年创刊，中国航天科技集团公司九院七七一所主办）、《自动化》（1972年创刊，1978年更名为《信息与控制》，中国科学院沈阳自动化研究所和中国自动化学会共同主办）、《计算机应用与应用数学》（1974年创刊，1979年更名为《计算机科学》，西南信息中心主办）、《计算机工程》（1975年创刊，中国电子科技集团公司第三十二研究所（华东计算技术研究所）和上海市计算机学会主办）。",
                "type": "",
                'img': require('./images/5.png'),
                "central_id": 102
                },
                {
                "name": "钱三强为计算机学科谋略人才",
                "msg": "原子能科学家钱三强成为中国计算机事业的关键人物，缘起他作为科学家和爱国者所走过的道路，也因为他担负的责任和组织能力。钱三强聚集技术人才、制定科研规划，中国的计算技术和计算数学学科就此起步。钱三强接过华罗庚计算机研究的接力棒，将计算机小组的工作延伸和扩展，计算机因“两弹一星”而在中国腾越，接力点就在中科院物理研究所。",
                "type": "",
                'img': require('./images/6.png'),
                "central_id": 103
                },
                {
                "name": "中国科学家到苏联考察计算机",
                "msg": "中国科学家三次访问苏联取经，顺利完成“科学规划”确定的任务。1957 年，中国科技代表团向莫斯科提交的中苏双方 1958—1962 年的科学院合作项目表，第一项就是计算技术。",
                "type": "",
                'img': require('./images/7.png'),
                "central_id": 104
                },
                {
                "name": "钱学森力主计算机列入“十二年科学规划”",
                "msg": "“二战”之后，发达国家开始向外层空间、向高新技术，特别是电子信息技术进军，新中国经济建设的注意力还集中在以钢铁为中心的传统重工业。在国务院规划委的讨论中，计算机一度被认为发展情景“不明朗”，钱学森有理有据的发言和坚定的态度，对确定计算技术起了“举足轻重”的作用。",
                "type": "",
                'img': require('./images/8.png'),
                "central_id": 105
                },
                {
                "name": "酒仙桥电子基地拔地而起",
                "msg": "开始规划酒仙桥电子工业区的建设时，计算机还没有列入发展计划，但是一旦明确了计算机的目标，酒仙桥的电子工业基础便起到孕育和支撑作用。美国建筑界人士来到北京798 艺术区时惊讶地发现，这里居然存在着世界上规模最大的包豪斯建筑群，绝对称得上人类工业发展史上的珍贵文物。",
                "type": "",
                'img': require('./images/9.png'),
                "central_id": 67
                },
                {
                "name": "训练班的起步和推广",
                "msg": "自 1956 年秋至 1959 年夏，中科院计算所筹备处联合清华大学、北京大学连续主办了三届训练班，1960 年，计算所正式建立之后与中国科学技术大学合办了第四届训练班。学员包括在校学生、1956 年分配到计算所筹备处的工科大学毕业生、代培和进修人员。",
                "type": "",
                'img': require('./images/10.png'),
                "central_id": 55
                },
                {
                "name": "从无到有：我国第一台电子管计算机",
                "msg": "我国第一台电子管计算机，有两个公认的代表：一个是我国第一台小型电子管计算机，另一个是我国第一台大型电子管计算机。前者是1958 年8月1日诞生的103计算机，后者是1959年4月30日调通的104计算机。",
                "type": "",
                'img': require('./images/11.png'),
                "central_id": 7
                },
                {
                "name": "人工智能初探：哈工大三维下棋机",
                "msg": "1958 年，哈工大计算机专业有了两个班的学生，十名教师和研究生及本科生一起，研制能说话、会下棋的数字计算机，高铁校长几乎每晚都到实验室来观看鼓劲，在器材供应上一路绿灯，有求必应。",
                "type": "",
                'img': require('./images/12.png'),
                "central_id": 12
                },
                {
                "name": "国防功臣：119机",
                "msg": "1959年夏，由安东、北京大学张世龙和计算所所长阎沛霖，在计算所共同商定由北京大学、计算所、国防科工委五院各出两三个人组成小组，由张世龙负责主持前期的系统设计，并确定整个系统由三台晶体管计算机组成，总称109项目。事实上，它分为109甲机、109乙机和109丙机三个型号。\r\n119机在1964年4月研制成功，通用浮点44二进制位、平均浮点运算速度每秒5万次。119机是我国第一台自行设计和研制的大型通用数字电子管计算机。经国家科委组织鉴定后交付使用，用于我国第一颗氢弹研制的计算任务、全国首次大油田实际资料动态预报的计算任务等。",
                "type": "",
                'img': require('./images/13.png'),
                "central_id": 13
                },
                {
                "name": "109乙机：第一台晶体管计算机",
                "msg": "1965年6月计算所蒋士飞主持研制成功109乙晶体管大型通用数字计算机，字长32位，内存容量为双体24K字，运算速度为定点运算每秒9万次，浮点运算每秒6万次，所用器材全部是国产的。该机的研制成功，表明我国进入了电子计算机的“第二代”。",
                "type": "第二代计算机",
                'img': require('./images/14.png'),
                "central_id": 16
                },
                {
                "name": "经典二代机：441-B型晶体管计算机",
                "msg": "1962年3月5日哈尔滨军事工程学院（以下简称哈军工）成立了晶体管计算机设计组，由慈云桂担任组长，康鹏担任副组长。当时我国半导体器件还不能满足计算机技术的要求，能供计算机用的晶体管型号、产品很少，质量也经常达不到要求，其中晶体管的工作寿命短和不稳定是两大主要问题。当年5月，康鹏研制出了“隔离-阻塞振荡器”，解决了晶体管性能不稳的问题，该电路又被称为“康鹏电路”， “康鹏电路”为当时晶体管计算机的研制起到了重要的作用。\r\n1965年，国防科工委决定全面公开441-B的电路和图纸资料。哈工大举办培训班，各地院所纷纷进行441-B复制和推广集训。之后有上百台441型计算机遍及全国，培养了数以千计的开发、应用人员，441-B占当时全国计算机数量的1/3以上。",
                "type": "",
                'img': require('./images/15.png'),
                "central_id": 19
                },
                {
                "name": "各显神通：晶体管机的大跃进",
                "msg": "60年代中期，华北计算技术研究所、华东计算所、清华大学、北京有线电厂等单位在研制晶体管计算机方面也有进展。如北京有线电厂和华北计算所的121机，清华大学和北京计算机三厂的112机，华东计算所和上海计算机厂的X-2机，华北计算所和北京有线电厂的108乙机等。这些计算机在各自的应用中大显身手，其中108乙机参加了我国发射第一颗人造地球卫星的任务。",
                "type": "",
                'img': require('./images/16.png'),
                "central_id": 21
                },
                {
                "name": "北航计算机服务流体力学",
                "msg": "近代力学是和数学紧密联系的，虽然电子管计算机还不能解决北航面临的许多难题，但是通过教学、调试和应用，学院培养出一批又一批的计算机人才。计算机教研室引进的实验员有黄祖元、李宪永、沈瑛、白秀贤、赵凤云、李尚涛、张英武等人，实验室负责人陈真。1970 年，航空解算装置专业更名电子计算机专业，陈望梅任教研室主任，围绕计算机硬件开展工作，并入无线电系。1971 年，北航派出胡建平等与十五所等合作研制 520 机，即\n为 200 系列的 DJS-220 计算机。",
                "type": "",
                'img': require('./images/17.png'),
                "central_id": 76
                },
                {
                "name": "东方红卫星：第一次数据传输",
                "msg": "1970 年，卫星轨道测轨预报方案实施，紫金山天文台、中科院数学所、西北计算所、701 工程处和发射中心组成专门任务组，在各观测点获得的轨道数据通过邮电部的数传机传送到中心站。4月24日，我国发射第一颗“东方红”卫星地面数据传输任务圆满完成。1978 年，三项数据设备获得全国科学大会奖。",
                "type": "",
                'img': require('./images/18.png'),
                "central_id": 106
                },
                {
                "name": "中国计算机学会的成立",
                "msg": "中国计算机学会的前身是中国电子学会电子计算机专业委员会，于1962年6月4日成立。在1962~1985年期间又可分为三个阶段。即1962年6月~1966年6月为第一阶段，曾分别在上海、汕头、西安、哈尔滨举行过四届全国计算机学术交流会。第二阶段是1966年6月~1978年底，学会遭到了严重的挫折与破坏，停止了活动。第三阶段是从1979 年1月恢复活动到中国计算机学会正式成立，此时更名为中国电子学会电子计算机学会。\n1985年3月5日，经国家发改委批准，中国计算机学会正式成立，随即被中国科学技术协会接纳为团体会员。1985年6月1日，中国计算机学会在北京科学会堂举行了成立大会。",
                "type": "",
                'img': require('./images/19.png'),
                "central_id": 107
                },
                {
                "name": "横空出世：111机引领我国小规模集成电路电子计算机",
                "msg": "1968年7月至1971年5月计算所研制成功我国第一台小规模集成电路通用数字电子计算机111机。1976年11月，计算所研制成功大型通用集成电路通用数字电子计算机013机。013机为二机部九院服务了14年，稳定运行时间13万小时以上。这两个型号的计算机都是在“文革“期间完成，使我国没有被世界上集成电路技术的发展拉得太远，但与“文革”以前相比，我国在计算机系统的研制上与世界水平的差距被拉大了。",
                "type": "第三代计算机",
                'img': require('./images/20.png'),
                "central_id": 25
                },
                {
                "name": "榜上有名：哈军工探路中国集成电路计算机",
                "msg": "1965年哈军工441-B／I型机鉴定会刚刚结束，慈云桂便提出研制中国的集成电路计算机，并于1966年提出了总体方案。1970年秋，哈军工主体南迁长沙，在慈云桂的带领下继续攻关，通过3年时间完成了逻辑设计、工程设计和模型试验。1977年夏，性能上同样达到百万次运算速度的集成电路计算机151-3研制成功。次年10月，200万次集成电路大型通用计算机系统151-4通过国家验收。1980年，151集成电路计算机装在“远望”号测量船上，南征太平洋，为完成中国首次洲际导弹飞行测量任务立下功劳。151机的研究团队荣立集体一等功，研制的151-3/4型机最终获国防科技成果一等奖，并和远望号远洋科学测量船一起获国家级科技进步特等奖",
                "type": "",
                'img': require('./images/21.png'),
                "central_id": 27
                },
                {
                "name": "向百万进军：百万次集成电路150计算机",
                "msg": "1973年8月26日，我国正式发布自行设计的第一台百万次电子数字计算机DJS-11机（即150机）研制成功，该机采用集成电路器件，字长48位，内存容量13万字。外部设备有磁带机、磁盘机、打字机、穿孔机以及输入、输出机等共有9种22台。它为我国石油勘探、气象预报、军事研究、科学计算等领域做出很大贡献。",
                "type": "",
                'img': require('./images/22.png'),
                "central_id": 28
                },
                {
                "name": "国产个人电脑的早期研制阶段",
                "msg": "1983年12月电子部六所开发成功微型计算机长城100（DJS-0520微机），该机具备了个人电脑的主要使用特征。同年，中科院计算所研制成功GF20/11A汉字微机系统，这是我国第一台在操作系统核心部分进行改造的汉字系统，并配置了汉化的关系数据库。1985年4月我国成功研制出第一台具有字符发生器汉字显示能力、具备完整中文信息处理功能的国产微机长城0520CH。1985年11月，中科院计算所研制成功联想式汉字微型机LX-PC系统。1991年，联想集团研制成功联想EISA486/50微机。该系统是联想系列微型机中代表产品之一。",
                "type": "第四代计算机",
                'img': require('./images/23.png'),
                "central_id": 29
                },
                {
                "name": "国产处理器",
                "msg": "1.北大众志CPU\r\n北大众志CPU是由北京大学研制成功，主要应用面向网络计算机、工业控制、机顶盒等领域。\r\n2.龙芯CPU\r\n龙芯CPU是由中科院计算所研制的系列高性能通用CPU，主要包括“龙芯1号”、“龙芯2号”和多核“龙芯3号”系列。\r\n3.飞腾CPU\r\n飞腾CPU是由国防科学技术大学研制的面向高性能计算机需求的系列高性能通用CPU，主要包括“飞腾64-1”、“飞腾64-2”、“飞腾-1000”、“飞腾-1500”等。\r\n4.申威CPU\r\n申威CPU是上海高性能集成电路设计中心研制的系列通用处理器，也主要面向高性能计算机应用。\r\n嵌入式处理器主要是为了满足一些小型计算机设备使用，通常要求功耗比较低。国产嵌入式处理器的发展基本与国产通用处理器的研制过程同步进行，形成了方舟系列、君正JZ系列、C-Core系列、龙腾系列等不同的芯片系统。",
                "type": "",
                'img': require('./images/24.png'),
                "central_id": 33
                },
                {
                "name": "国产操作系统",
                "msg": "1983年，国防科技大学的银河-I亿次巨型机研制成功，为其开发的操作系统YHOS成为中国研制成功的第一个巨型机上的操作系统。90年代，国防科技大学又相继完成了银河-II、银河III、银河新一代巨型机操作系统、银河超级服务器操作系统等的研制，这些系统成功用于气象预测、核技术研究等国防与国民经济的重要部门，得到了大型生产性业务运行的考验，发挥了重要作用。\r\n基于Unix/Linux技术体系的主要产品 COSIX操作系统 麒麟操作系统红旗操作系统等。",
                "type": "",
                'img': require('./images/25.png'),
                "central_id": 42
                },
                {
                "name": "银河-I：中国超算迈入亿次计算俱乐部",
                "msg": "1978年3月，邓小平亲自作出决定，由国防科技大学负责研制亿次巨型计算机。慈云桂担任了这一任务的总指挥和总设计师。1983年12月22日，采用共享存储体系结构的“银河1号”巨型计算机在长沙研制成功，其浮点运算速度达每秒1亿次，是我国自行研制的第一台每秒浮点运算亿次以上的巨型计算机，填补了国内巨型计算机的空白，标志着中国进入了世界研制巨型计算机的行列，并荣获特等国防科技成果奖。",
                "type": "",
                'img': require('./images/26.png'),
                "central_id": 41
                },
                {
                "name": "我国第一封电子邮件",
                "msg": "1987年9月20日，第一封电子邮件的发出揭开了中国人使用互联网的序幕。当时由北京计算机应用技术研究所钱天白发出了中国第一封电子邮件：“Across the Great Wall we can reach every corner in the world.（越过长城，走向世界）”，发出邮件指令的是一台西门子7760大型计算机，该邮件经意大利到达德国的卡尔斯鲁厄大学，成为我国互联网的开山之笔。",
                "type": "",
                'img': require('./images/27.png'),
                "central_id": 108
                },
                {
                "name": "中国人工智能溯源",
                "msg": "1950年代的哈工大下棋机是中国人工智能的摇篮，但是中国人工智能的研究真正开始于20世纪70年代。1977年，吉林大学王湘浩在国内提出了要开展人工智能的研究，以此标志着中国人工智能研究的开始。1978年，人工智能（智能模拟）研究被纳入到国家研究计划。1983年，中国科学院沈阳自动化研究所蒋新松等人在国际人工智能联合会议（IJCAI）上发表了论文“AI research in China: a review”，对当时国内人工智能的取得的成果进行了综述，在国内最早系统性的阐述了人工智能的研究。人工智能研究具有跨学科性和多领域性，国内从事人工智能的人员兴趣也十分广泛，包括人工智能哲学，自动推理，机器证明，人工智能逻辑，模糊逻辑，机器学习，数据挖掘，神经网络，群体智能，模式识别，知识工程，智能规划，Agent，粗糙集，人工生命等。经过几十年的共同努力，中国学者在人工智能领域取得了不少成果，某些领域已经接近或者达到国际前沿，得到了国际同行的认可和赞扬。",
                "type": "",
                'img': require('./images/28.png'),
                "central_id": 109
                },
                {
                "name": "首次超越：“天河一号A”问鼎世界超算排行榜",
                "msg": "距2009年“天河一号”研制成功后，时隔1年，国防科技大学研制成功了“天河一号”的升级版“天河一号A”，并于2010年11月发布。“天河一号A”部分采用了国防科技大学研制的“飞腾－1000”CPU芯片。该机峰值速度为每秒4700万亿次，实测Linpack持续速度为每秒2566万亿次，在2010年11月世界超级计算机TOP500排名榜上位列世界第一。至此我国在高性能计算机领域实现了对国外最先进技术的超越，也是我国计算机事业发展中具有标志性的事件。",
                "type": "",
                'img': require('./images/29.png'),
                "central_id": 46
                },
                {
                "name": "中国科技：不忘初心，砥砺前行",
                "msg": "创新是引领发展的第一动力。科技领域的新突破，更加坚定了我们走中国特色自主创新道路的决心和信心。科技创新大潮澎湃，千帆竞发勇进者胜。在以习近平同志为核心的党中央坚强领导下，大力发展科学技术，构筑强大科技实力和创新能力，我们一定能实现建设世界科技强国的伟大目标。",
                "type": "",
                'img': require('./images/30.png'),
                "central_id": 93
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
            nodeInfo: [],
            isSHowToptip: false,
            toptipX: 0,
            toptipY: 0,
            toptipText: null,
            nodeData: [],
            linkData: [],
            nodeIdList: [0, 53, 5, 55, 102, 103, 104, 105, 67, 55, 7, 12, 13, 16, 19, 21, 76, 106, 107, 25, 27, 28, 29, 33, 42, 41, 108, 109, 46, 93],
            actionIndex: 0,
            isShowTooltipBox: false,
            tooltipX: 0,
            tooltipY: 0,
            toolText: null
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
            this.actionIndex = val
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
                return {
                    ...item
                }
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
                        },
                        title: '123'
                    },
                    interaction: {
                        hover: true,
                        hideEdgesOnDrag: true,
                        hoverConnectedEdges: true,
                        tooltipDelay: 200,
                        dragNodes: false,
                    },
                    physics: {
                        enabled: true,
                        barnesHut: {
                        gravitationalConstant: -60000
                        },
                        stabilization: { iterations: 3500 }
                    },
                    
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
                    console.log(params)
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


                this.network.on('hoverEdge',function(properties){
                    // isSHowToptip: false,
                    // toptipX: 0,
                    // toptipY: 0,
                    // toptipText: null,
                   let item = that.getEdgeMsg(properties.edge)
                   that.toptipText = item.title
                   that.toptipX = properties.event.offsetX + 15 + 'px'
                   that.toptipY = properties.event.offsetY + 15 + 'px'
                   that.isSHowToptip = true
                });

                this.network.on('blurEdge',function(properties){
                    that.toptipX = 0
                    that.toptipY = 0
                    that.isSHowToptip = false
                });
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
                    // value: node.value * 10,
                    size: node.value * 10,
                    image: img,
                    shape: 'image',
                    node_type: node.category
                }
                if(this.nodeIdList.indexOf(node.id) != -1){
                    nodeOption.borderWidth = 1
                    nodeOption.size = node.value * 15   
                    
                    nodeOption.color = {
                        border: 'yellow',
                        background: '#97C2FC',
                        highlight: {
                            border: '#2B7CE9',
                            background: '#D2E5FF'
                        },
                        hover: {
                            border: '#2B7CE9',
                            background: '#D2E5FF'
                        }
                    }
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
                    title: edge.name,
                    // label: edge.name
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
        mouseover(even){
            let {target: {innerHTML}, x, y} = even 
            // isShowTooltipBox: false,
            // tooltipX: 0,
            // tooltipY: 0,
            // toolText: null
            this.tooltipX = x - 500  + 'px'
            this.tooltipY = y - 100 + 'px'
            this.isShowTooltipBox = true
            this.toolText = innerHTML
        }
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
        height: 95%;
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
        height: 342px;
        right: 80px;
        top: 5%;
        background-color: rgba(255, 255, 255, 0.8);
        .item{
            overflow: hidden;
            padding: 10px;
            height: 170px;
        }
        .item.action{
            padding: 5px;
            border: 5px solid rgba(0, 0, 0, 0.8);
            border-radius: 5px;
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
                font-size: 14px;
                text-indent: 30px;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box; // 作为弹性伸缩盒子模型显示。
                -webkit-box-orient: vertical; // 设置伸缩盒子的子元素排列方式--从上到下垂直排列
                -webkit-line-clamp: 5; // 显示的行
                position: relative;
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