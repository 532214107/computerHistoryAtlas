(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-32a8e1eb"],{"22be":function(a,e,t){"use strict";var n=t("9d61"),s=t.n(n);s.a},9406:function(a,e,t){"use strict";t.r(e);var n=function(){var a=this,e=a.$createElement,t=a._self._c||e;return t("div",{staticClass:"content"},[t("div",{staticClass:"item"},[t("div",{staticClass:"title"},[a._v("总体数量")]),t("div",{staticClass:"entity"},[t("div",{staticClass:"color1"},[t("p",{staticClass:"name"},[a._v("实体总数")]),t("p",{staticClass:"value"},[a._v(a._s(a.allData.entity_num))])]),a._l(a.allData.entity,(function(e,n){return t("div",{key:n,staticClass:"color2"},[t("p",{staticClass:"name"},[a._v(a._s(e.name))]),t("p",{staticClass:"value"},[a._v(a._s(e.value))])])}))],2),t("div",{staticClass:"link"},[t("div",{staticClass:"color3"},[t("p",{staticClass:"name"},[a._v("关系总数")]),t("p",{staticClass:"value"},[a._v(a._s(a.allData.linksnum))])]),a._l(a.allData.links,(function(e,n){return t("div",{key:n,staticClass:"color4"},[t("p",{staticClass:"name"},[a._v(" "+a._s(e.source)+"与"+a._s(e.target)+" "),t("br"),a._v("的关系 ")]),t("p",{staticClass:"value"},[a._v(a._s(e.Inum))])])}))],2)]),a._m(0),a._m(1)])},s=[function(){var a=this,e=a.$createElement,t=a._self._c||e;return t("div",{staticClass:"item"},[t("div",{staticClass:"title"},[a._v("实体统计")]),t("div",{attrs:{id:"peiChart"}})])},function(){var a=this,e=a.$createElement,t=a._self._c||e;return t("div",{staticClass:"item"},[t("div",{staticClass:"title"},[a._v("实体属性统计")]),t("div",{attrs:{id:"barChart"}})])}],i=(t("d81d"),t("b775")),l=function(a){return Object(i["a"])({url:"https://pchistory.demo.actkg.com/searchDisplay",method:"get",params:a})},u={name:"statistics",data:function(){return{allData:{entity_num:17096,entity:[{name:"时期",value:3649},{name:"人物",value:3386},{name:"组织",value:3411},{name:"技术",value:6327},{name:"物件",value:323}],linksnum:10551,links:[{source:"组织",target:"人物",Inum:3586},{source:"组织",target:"组织",Inum:192},{source:"技术",target:"人物",Inum:79},{source:"物件",target:"人物",Inum:334},{source:"人物",target:"技术",Inum:6343},{source:"技术",target:"组织",Inum:17}],properties:[{name:"类别",value:20745},{name:"中文名",value:17096},{name:"zhixingId",value:17096},{name:"subname",value:17096},{name:"description",value:17096},{name:"keyId",value:17096},{name:"label",value:17096},{name:"taglist",value:17096},{name:"名称",value:17096},{name:"施行日期",value:6327},{name:"发布人",value:6327},{name:"发布令",value:6327},{name:"发布时间",value:6327},{name:"属性",value:3649},{name:"所属地区",value:3649},{name:"学校类型",value:3649},{name:"创办时间",value:3649},{name:"主要院系",value:3649},{name:"占地面积",value:3649},{name:"外文名",value:3411},{name:"创始人",value:3411},{name:"起源地",value:3411},{name:"创始时间",value:3411},{name:"类型",value:3411},{name:"公司名称",value:3386},{name:"公司性质",value:3386},{name:"公司口号",value:3386},{name:"员工数",value:3386},{name:"成立时间",value:3386},{name:"创建时间",value:3386},{name:"创建人",value:3386},{name:"年营业额",value:3386},{name:"总部地点",value:3386},{name:"最早被击落",value:323},{name:"最早时间",value:323},{name:"发明者",value:323}]}}},created:function(){this.searchDisplayData()},methods:{searchDisplayData:function(){var a=this;l().then((function(e){a.allData=e}))},initPeiChart:function(a){var e=a.map((function(a){return a.name})),t=this.$echart.init(document.getElementById("peiChart")),n={tooltip:{trigger:"item",formatter:"{a} <br/>{b}: {c} ({d}%)"},legend:{orient:"vertical",x:"left",data:e},series:[{name:"实体个数",type:"pie",radius:["20%","70%"],itemStyle:{emphasis:{shadowBlur:10,shadowOffsetX:0,shadowColor:"rgba(0, 0, 0, 0.5)"}},data:a}]};t.setOption(n)},initBarChart:function(a){var e=a.map((function(a){return a.name})),t=["#E01F54","#2980B9","#e05038","#009966","#9fa8a3","#89bdd3","#e6af4b","#d3758f","#dcc392","#2e4783","#82b6e9","#ff6347","#a092f1","#0a915d","#7d4627","#6699FF","#ff6666","#3cb371","#d5b158","#38b6b6","#c23531","#2f4554","#61a0a8","#d48265","#91c7ae","#749f83","#ca8622","#bda29a","#6e7074","#546570","#c4ccd3","#E01F54","#2980B9","#e05038"],n=this.$echart.init(document.getElementById("barChart")),s={tooltip:{},xAxis:{name:"属性名称",data:e,axisLabel:{show:!0,rotate:30}},yAxis:{name:"属性出现次数"},series:[{name:"属性出现次数",data:a,type:"bar",itemStyle:{normal:{color:function(a){return t[a.dataIndex]||null}}}}]};n.setOption(s)}},mounted:function(){this.initPeiChart(this.allData.entity),this.initBarChart(this.allData.properties)}},r=u,m=(t("22be"),t("2877")),c=Object(m["a"])(r,n,s,!1,null,"399a0393",null),v=c.exports;e["default"]=v},"9d61":function(a,e,t){}}]);