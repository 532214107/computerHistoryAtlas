<template>
  <div class="management">
      <div class="header">
          <el-button :type="buttonType == '图谱管理' ? 'primary' : ''" @click="clickButton('图谱管理')">图谱管理</el-button>
          <el-button :type="buttonType == '批量上传' ? 'primary' : ''" @click="clickButton('批量上传')">批量上传</el-button>
      </div>
      <div class="content" v-show="buttonType == '图谱管理'">
          <div style="text-align: right;">
                <el-button  type="text" style="margin-right: 30px;" @click="clickAdvancedSearch">{{isAdvancedSearch ? '普通检索' : '高级检索'}}</el-button>
          </div>
          <div class="inputBox" v-show="!isAdvancedSearch">
                <el-input placeholder="请输入内容" v-model="from.entity_name" class="input-with-select">
                    <el-select v-model="from.label" slot="prepend" placeholder="请选择">
                        <el-option
                            v-for="(item, index) in selectOption"
                            :key="index"
                            :label="item.entity_name"
                            :value="item.entity_name">
                        </el-option>
                    </el-select>
                    <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                </el-input>
                <el-button  type="primary" style="margin-left: 10px;" @click="exportResult">导出结果</el-button>
          </div>
          <div class="inputBox1" v-show="isAdvancedSearch">
                <el-form :model="advancedSearchData" label-position="right" label-width="100px">
                    <el-form-item label="实体类别">
                        <el-input placeholder="请输入实体名称" v-model="advancedSearchData.entity_name" class="input-with-select">
                            <el-select v-model="advancedSearchData.label" slot="prepend" placeholder="请选择实体类型">
                                <el-option
                                    v-for="(item, index) in selectOption"
                                    :key="index"
                                    :label="item.entity_name"
                                    :value="item.entity_name">
                                </el-option>
                            </el-select>
                            <!-- <el-button slot="append" icon="el-icon-search" @click="search"></el-button> -->
                        </el-input>
                    </el-form-item>
                    <el-form-item label="属性类别">
                        <el-input placeholder="请输入属性" v-model="advancedSearchData.attr_name" class="input-with-select"></el-input>
                    </el-form-item>
                    <el-form-item label="关系类别">
                        <el-select class="selectBox" v-model="advancedSearchData.relation" placeholder="请选择关系类别"> 
                                <!-- relation_name  只有下拉框-->
                                <el-option
                                    v-for="(item, index) in relationSelectOption"
                                    :key="index"
                                    :label="item.relation_name"
                                    :value="item.relation_name">
                                </el-option>
                            </el-select>
                    </el-form-item>
                </el-form>
                
                <div style="text-align: right;">
                    <el-button  type="primary" style="margin-left: 10px;" @click="advancedResult">导出结果</el-button>
                    <el-button  type="primary" style="margin-left: 10px;" @click="advancedSearch">检索</el-button>
                </div>
          </div>
          <div class="tableBox">
              <el-table
                    v-if="tableData.length > 0"
                    v-loading="loading"
                    :data="tableData"
                    border
                    class="table"
                >
                    <el-table-column
                        v-for="(item, index) in tableTitle.slice(0, 4)"
                        :key="index"
                        :prop="item"
                        :label="item">
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        width="200">
                        <template slot-scope="scope">
                            <el-button @click="changeTableData(scope.row, 1)" type="warning" size="small">修改</el-button>
                            <el-button @click="deleteTableData(scope.row, 2)" type="danger" size="small">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
          </div>
      </div>

      <div class="content" v-show="buttonType == '批量上传'">
          <div class="stepsBox">
                <el-steps :active="active" finish-status="success">
                    <el-step title="步骤 1"></el-step>
                    <el-step title="步骤 2"></el-step>
                </el-steps>
          </div>
          <div class="uploadBox" v-show="active == 0">
              <div class="uploadBoxTop">
                  <span>请选择上传类型的所属类别：</span>
                  <el-select size="small" v-model="upLoadSelectValue" placeholder="请选择">
                        <el-option
                        v-for="(item, index) in selectOption"
                        :key="index"
                        :label="item.entity_name"
                        :value="item.entity_name">
                        </el-option>
                    </el-select>
              </div>
              <div class="uploadBoxContent">
                    <el-upload
                        class="upload-demo"
                        ref="upload"
                        drag
                        action="/upload/"
                        multiple
                        :auto-upload="false"
                        :show-file-list="true"
                        :on-success="uoloadSuccess">
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                        <div class="el-upload__tip" slot="tip">只能上传.csv文件</div>
                    </el-upload>
                    <el-button size="small" style="margin-top: 10px" type="success" @click="submitUpload">上传到服务器</el-button>
              </div>
          </div>
          <div class="uploadContent" v-show="active == 1">
                <el-row :gutter="20">
                    <el-col :span="8">
                        <div class="grid-content">
                            <div class="gridTitle">待匹配信息</div>
                            <ul class="match_box">
                                <li v-for="(item, index) in uploadRes.table_header" 
                                :class="{action: match_action == item, waring: newMatchList.indexOf(item) != -1}" 
                                @click="click_match_action(item)" :key="index">{{item}}</li>
                            </ul>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content">
                            <div class="gridTitle">标准信息</div>
                            <ul class="Standard_box" v-if="StandardList.length > 0">
                                <li v-for="(item, key) in StandardList[0].properties" 
                                :class="{action: Standard_action == key, waring: newStandardList.indexOf(key) != -1}" 
                                @click="click_Standard_action(key)" :key="key">{{key}}</li>
                            </ul>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content">
                            <div class="gridTitle">已匹配信息</div>
                            <ul class="matched_box">
                                <li 
                                    v-for="(item, index) in matchedList" 
                                    :key="index"
                                >
                                    {{item[0]}} => {{item[1]}}
                                    <i @click="deleteMatched(index)" class="el-icon-close" style="float: right; margin-right: 10px; line-height: 30px;"></i>
                                </li>
                            </ul>
                        </div> 
                    </el-col>
                </el-row>
                <div style="text-align: right; padding-top: 30px;">
                    <el-button type="success" @click="batchUpload">入库</el-button>
                </div>
          </div>
      </div>
      <!-- 详情信息弹框 -->
        <el-dialog
            title="详情信息"
            :visible.sync="dialogVisible"
            width="50%"
            :before-close="handleClose"
            class="dialog">
            <div class="dialogTop">
                <div class="title">
                    实体名称: <span style="padding: 0 30px;">{{dialogTitle}}</span>
                </div>
                <div class="operation">
                    <el-button @click="dialogAddProperty" type="primary" size="small">添加属性</el-button>
                    <el-button @click="dialogSave" type="primary" size="small">保存</el-button>
                </div>
            </div>
            <div class="dialogContent">
                <el-table
                    :data="dialogTableList"
                    border
                    class="table"
                >
                    <el-table-column
                    label="name">
                        <template slot-scope="scope">
                            <el-input size="small" v-model="scope.row.name"></el-input>
                        </template>
                    </el-table-column>
                        
                    <el-table-column
                    label="属性值"
                    prop="value">
                        <template slot-scope="scope">
                            <el-input size="small" v-model="scope.row.value"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        width="50">
                        <template slot-scope="scope">
                            <i @click="deleteProperty(scope.row)" class="el-icon-circle-close color"></i>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-dialog>
  </div>
</template>

<script>
import {
    getUserSchema,
    getSingleCategory,
    csvDownload,
    modifyEntities,
    deleteEntities,
    batchUpload
} from '@/api/management'
import { Form } from 'element-ui'

export default {
    name: "management",
    data(){
        return {
            buttonType: '图谱管理',
            from: {
                entity_name: null,
                label: null,
            },
            upLoadSelectValue: null,
            selectOption: [],
            tableData: [],
            tableTitle: [],
            dialogTableList: [],
            dialogTitle: "",
            dialogVisible: false,
            active: 0,
            neoId: null,
            category: null,
            source: null,
            loading: false,
            isAdvancedSearch: false, // 是否为高级检索
            advancedSearchData: {
                entity_name: "",
                label: "",
                relation: "",
                attr_name: ""
            },
            relationSelectOption: [],
            uploadRes: {},
            match_action: null,
            StandardList: [],
            Standard_action: null,
            matchedList: [],
            newStandardList: [],
            newMatchList: [],
            userSchemaRes: null
        }
    },
    mounted(){
        this.getUserSchema()
    },
    methods: {
        // 获取下拉框内容
        getUserSchema(){
            getUserSchema().then(res=>{
                this.selectOption= []
                let {entities, relations} = res
                this.selectOption = entities
                this.relationSelectOption = relations
                this.userSchemaRes = res
            })
        },
        // 切换
        clickButton(val){
            this.buttonType = val
            if(val == '批量上传'){
                this.init()
            }
        },
        // 搜索
        search(){
            this.loading = true
            getSingleCategory(this.from).then(res=>{
                let noShowKey = ['category', 'neoId', 'source']
                let data = res[0]
                this.tableTitle = []
                for(let key in data){
                    if(noShowKey.indexOf(key) == -1){
                        this.tableTitle.push(key)
                    }
                }
                this.tableData = res
                this.loading = false
                if(this.tableData.length == 0){
                    this.$message({
                        type: "success",
                        message: "暂无数据"
                    })
                }
            })
        },
        // 导出结果
        exportResult(){
            csvDownload(this.from).then(res=>{
                let result=res; // 文件流
                let url =  window.URL.createObjectURL(new Blob([result]));//处理文档流
                let link = document.createElement('a');
                link.style.display = 'none';
                link.href = url;
                link.download = '结果数据.csv';
                document.body.appendChild(link);
                link.click();
            })
        },
        // advancedSearchData 高级检索
        advancedSearch(){
            this.loading = true
            getSingleCategory(this.advancedSearchData).then(res=>{
                let noShowKey = ['category', 'neoId', 'source']
                let data = res[0]
                this.tableTitle = []
                for(let key in data){
                    if(noShowKey.indexOf(key) == -1){
                        this.tableTitle.push(key)
                    }
                }
                this.tableData = res
                this.loading = false
                if(this.tableData.length == 0){
                    this.$message({
                        type: "success",
                        message: "暂无数据"
                    })
                }
            })
        },
        // advancedResult 高级导出
        advancedResult(){
            csvDownload(this.advancedSearchData).then(res=>{
                let result=res; // 文件流
                let url =  window.URL.createObjectURL(new Blob([result]));//处理文档流
                let link = document.createElement('a');
                link.style.display = 'none';
                link.href = url;
                link.download = '结果数据.csv';
                document.body.appendChild(link);
                link.click();
            })
        },
        
        // 修改表格数据
        changeTableData(row, index){
            if(index == 1){
                let noShowKey = ['category', 'neoId', 'source']
                this.dialogVisible = true
                this.dialogTableList = []
                this.dialogTitle = row.name
                this.category = row.category || null
                this.source = row.source || null
                this.neoId = row.neoId || null
                for(let key in row){
                    if(noShowKey.indexOf(key) == -1){
                        this.dialogTableList.push({
                            name: key,
                            value: row[key]
                        })
                    }
                }
            }
        },
        // 删除表格数据
        deleteTableData(row){
            this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                deleteEntities({deleteNeoIds: row.neoId}).then(res=>{
                    if(res.status == 'success'){
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    }else{
                        this.$message({
                            type: 'error',
                            message: '删除失败!'
                        });
                    }
                    this.search()
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        // dialog 关闭弹框
        handleClose(){
            this.dialogVisible = false
        },
        // dialog 添加属性
        dialogAddProperty(){
            this.dialogTableList.push({
                name: '',
                value: ''
            })
        },
        // 删除属性
        deleteProperty(row){
            this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.dialogTableList = this.dialogTableList.filter((item, index) => {
                    let a = this.dialogTableList.indexOf(row) != index
                    console.log(a)
                    return a
                })
                console.log(this.dialogTableList)
            }).catch(() => {
                        
            });
        },
        // dialog 保存
        dialogSave(){
            let obj = {
                neoId: this.neoId,
                source: this.source,
                category: this.category
            }
            this.dialogTableList.forEach(item=>{
                obj[item.name] = item.value
            })
            let formData = new FormData()
            formData.append("updateNode", JSON.stringify(obj))
            modifyEntities(formData).then(res=>{
                if(res.status == 'success'){
                    this.$message({
                        message: '修改成功',
                        type: 'success'
                    })
                }else{
                    this.$message({
                        message: '修改失败',
                        type: 'error'
                    })
                }
                this.search()
                this.handleClose()
            })
        },
        // 点击高级检索
        clickAdvancedSearch(){
            this.isAdvancedSearch = !this.isAdvancedSearch
        },
        // 上传文件
        submitUpload() {
            if(this.upLoadSelectValue){
                this.StandardList = this.selectOption.filter(item => {
                    return item.entity_name == this.upLoadSelectValue
                })
                this.$refs.upload.submit();
            }else{
                this.$message({
                    type: "warning",
                    message: "请选择上传类型的所属类别"
                })
            }
        },
        // 上传成功
        uoloadSuccess(res){
            this.active = 1
            this.uploadRes = res
            let arr = Object.keys(this.StandardList[0].properties) // 标准属性
            let newArr = res.table_header; // 待匹配属性
            this.matchedList = []; // 已匹配属性
            newArr.forEach(item => {
               let index = arr.indexOf(item)
               if(index != -1){
                   let a = [item, arr[index]]
                   this.matchedList.push(a)
               }
            })
        },
        // 点击待匹配信息
        click_match_action(val){
            let isClick = true
            this.matchedList.forEach(item => {
                if(item[0] == val){
                    isClick = false
                }
            })
            if(isClick){
                if(this.Standard_action){
                    this.matchedList.push([val, this.Standard_action])
                    this.match_action = null
                    this.Standard_action = null

                }else{
                    this.match_action = val
                }
                
            }else{
                this.$message({
                    type: "warning",
                    message: "请勿重复匹配"
                })
            }
        },
        // 点击标准属性信息
        click_Standard_action(val){
            let isClick = true
            this.matchedList.forEach(item => {
                if(item[1] == val){
                    isClick = false
                }
            })
            if(isClick){
                if(this.match_action){
                    this.matchedList.push([this.match_action, val])
                    this.match_action = null
                    this.Standard_action = null
                }else{
                    this.Standard_action = val
                }
            }else{
                this.$message({
                    type: "warning",
                    message: "请勿重复匹配"
                })
            }
        },
        // 删除已匹配信息
        deleteMatched(index){
            this.matchedList.splice(index, index+1)
        },
        // 入库
        batchUpload(){
            let {filename} = this.uploadRes,
                entity_name = this.upLoadSelectValue,
                property_to_col = {};
            this.matchedList.forEach(item => {
                property_to_col[item[1]] = item[0]
            })

            let req = {
                filename,
                entity_name,
                property_to_col
            }
            let formData = new FormData()
            this.userSchemaRes.map.push(req)
            for(let key in this.userSchemaRes){
                formData.append(key, JSON.stringify(this.userSchemaRes[key]))
            }
            batchUpload(formData).then(res=>{
                if(res.status == 'success'){
                    this.$message({
                        type: 'success',
                        message: "入库成功"
                    })

                }else{
                    this.$message({
                        type: 'error',
                        message: "入库失败"
                    })
                }
                this.init()
                
            }).catch(_=>{
                this.$message({
                    type: 'error',
                    message: "入库失败"
                })
            })
        },
        init(){
            this.$refs.upload.clearFiles();
            this.upLoadSelectValue = null
            this.active = 0
        }
    },
    watch: {
        matchedList(val){
            this.newStandardList = []
            this.newMatchList = []
            val.forEach(item=>{
                this.newMatchList.push(item[0])
                this.newStandardList.push(item[1])
            })
        }
    }
}
</script>

<style lang="less" scoped>
    .management{
        width: 78%;
        margin: 0 auto;
        padding-top: 20px;
        .content{
            width: 100%;
            margin-top: 20px;
            padding-top: 20px;
            background-color: #fff;
            border-radius: .5em;
            min-height: 460px;
            padding-bottom: 30px;
            .inputBox{
                padding: 20px;
                // width: 50%;
                text-align: center;
                .input-with-select{
                    width: 50%;
                }
            }
            .inputBox1{
                padding: 20px;
                width: 80%;
                margin: 0 auto;
                .selectBox{
                    width: 100%;
                }
            }
            .table{
                width: 95%;
                margin: 0 auto;
            }
            .stepsBox,
            .uploadBox{
                width: 50%;
                margin: 0 auto;        
            }
            .uploadBox{
                padding-top: 20px;
                // .uploadBoxTop{
                //     text-align: center;
                // }
                .uploadBoxContent{
                    padding: 20px 0;
                }
            }
        }

        .dialog{
            .dialogTop{
                overflow: hidden;
                .title{
                    float: left;
                }
                .operation{
                    float: right;
                }
            }
            .dialogContent{
                padding-top: 20px;
                .color{
                    font-size: 24px;
                    color: rgb(255, 34, 0);
                    cursor: pointer;
                }
            }
        }

        .uploadContent{
            width: 80%;
            margin: 20px auto;
            .grid-content{
                box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
                height: 400px;
                .gridTitle{
                    font-weight: bold;
                    padding: 10px;
                    border-bottom: 1px solid #ccc;
                }
                &> ul{
                    width: 90%;
                    margin: 0 auto;
                    height: calc(100% - 42px);
                    overflow-y: auto;
                    li{
                        text-align: center;
                        height: 30px;
                        line-height: 30px;
                        cursor: pointer;
                        &:hover{
                            color: red;
                        }
                    }
                    li.action{
                        color: red;
                    }
                    li.waring{
                        color: #cf9236;
                    }
                }
            }
        }
    }
    /deep/ .el-select {
        width: 130px;
    }
    /deep/ .input-with-select .el-input-group__prepend {
        background-color: #fff;
    }
</style>