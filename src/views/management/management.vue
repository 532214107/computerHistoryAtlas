<template>
  <div class="management">
      <div class="header">
          <el-button :type="buttonType == '图谱管理' ? 'primary' : ''" @click="clickButton('图谱管理')">数据删除修改</el-button>
          <el-button :type="buttonType == '手动上传' ? 'primary' : ''" @click="clickButton('手动上传')">数据新增</el-button>
          <el-button :type="buttonType == '批量上传' ? 'primary' : ''" @click="clickButton('批量上传')">数据导入批量新增</el-button>
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
                        prop="name"
                        label="名称">
                    </el-table-column>
                    <el-table-column
                        prop="category"
                        label="类别">
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
               <p class="messageBox">文档需包含但不限于以下属性：<span v-for="(item, key) in properties" :key="key">{{key == 'name' ? "" : key == "category" ? "" : key + '；'}}</span></p>
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
                                :class="{action: match_action == item}" 
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

      <div class="content" v-show="buttonType == '手动上传'">
          <el-button size="small" :type="subButtonType == '上传实体' ? 'primary' : ''" @click="clickSubButton('上传实体')">新增实体</el-button>
          <el-button size="small" :type="subButtonType == '上传关系' ? 'primary' : ''" @click="clickSubButton('上传关系')">新增关系</el-button>

          <div class="uploadEntityContent" v-show="subButtonType == '上传实体'">
              <p>新增实体</p>
              <div>
                  请选择实体类别:
                   <el-select size="small" style="width: 200px;" v-model="uploadEntityType" placeholder="请选择">
                        <el-option
                            v-for="(item, index) in selectOption"
                            :key="index"
                            :label="item.entity_name"
                            :value="item.entity_name">
                        </el-option>
                    </el-select>
              </div>
              <div class="uploadEntityBody">
                  <div class="operation">
                        <el-button @click="entityAddProperty" type="primary" size="small">添加属性</el-button>
                        <el-button @click="entitySave" type="primary" size="small">保存</el-button>
                  </div>
                    <el-table
                        :data="uploadEntityTableList"
                        border
                    >
                        <el-table-column
                        label="实体属性"
                        width="300px">
                            <template slot-scope="scope">
                                <el-input placeholder="请输入实体属性名称" size="small" v-model="scope.row.name"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                        label="属性值"
                        prop="value">
                            <template slot-scope="scope">
                                <el-input 
                                    type="textarea"
                                    :autosize="{ minRows: 2, maxRows: 4}"
                                    size="small" 
                                    v-model="scope.row.value"
                                    placeholder="请输入实体属性值"
                                ></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="操作"
                            width="50">
                            <template slot-scope="scope">
                                <i @click="deletUploadEntity(scope.row)" class="el-icon-circle-close color"></i>
                            </template>
                        </el-table-column>
                    </el-table>
              </div>
          </div>
          <div class="relationshipContent" v-show="subButtonType == '上传关系'">
              <p>新增关系</p>
              <div style="padding: 0 ; text-align: right;">
                  <el-button @click="relationshipSave" type="primary">保存关系</el-button>
              </div>
              <div class="relationshipBody">
                  <el-row :gutter="20">
                      <el-col :span="8">
                          <div class="b_div">
                                <div style="width: 80%;margin: 15px auto 0;">
                                    <el-input size="small" placeholder="请输入实体名称" v-model="entityName1" class="input-with-select">
                                        <el-button slot="append" icon="el-icon-search" @click="searchEntity(1)"></el-button>
                                    </el-input>
                                </div>
                                <el-table
                                    :data='tableData1'   
                                    style="width: 90%; margin: 0 auto" 
                                    v-loading="loading1"
                                    size="small"
                                    highlight-current-row
                                    @current-change="handleCurrentChange1"
                                    ref="singleTable1"
                                >
                                    <el-table-column
                                        type="index"
                                        width="50">
                                    </el-table-column>
                                    <el-table-column
                                        prop="name"
                                        label="名称">
                                    </el-table-column>
                                    <el-table-column
                                        prop="category"
                                        label="类型"
                                        width="100">
                                    </el-table-column>
                                </el-table>
                          </div>
                      </el-col>
                      <el-col :span="8">
                          <div class="b_div">
                              <div style="width: 80%;margin: 15px auto 0;">
                                    <el-input size="small" placeholder="请输入实体名称" v-model="entityName2" class="input-with-select">
                                        <el-button slot="append" icon="el-icon-search" @click="searchEntity(2)"></el-button>
                                    </el-input>
                                </div>
                                <el-table
                                    :data='tableData2'   
                                    style="width: 90%; margin: 0 auto" 
                                    v-loading="loading2"
                                    size="small"
                                    highlight-current-row
                                    @current-change="handleCurrentChange2"
                                    ref="singleTable2"
                                >
                                    <el-table-column
                                        type="index"
                                        width="50">
                                    </el-table-column>
                                    <el-table-column
                                        prop="name"
                                        label="名称">
                                    </el-table-column>
                                    <el-table-column
                                        prop="category"
                                        label="类型"
                                        width="100">
                                    </el-table-column>
                                </el-table>
                          </div>
                      </el-col>
                      <el-col :span="8">
                          <div class="b_div">
                              <el-table
                                    :data='tableData3'   
                                    style="width: 90%; margin: 0 auto" 
                                    size="small"
                                >
                                    <el-table-column
                                        prop="name1"
                                        label="实体">
                                    </el-table-column>
                                    <el-table-column
                                        prop="category"
                                        label="关系"
                                        width="100">
                                    </el-table-column>
                                    <el-table-column
                                        prop="name2"
                                        label="实体">
                                    </el-table-column>
                                    <el-table-column
                                        label="操作"
                                        width="50">
                                        <template slot-scope="scope">
                                            <i @click="delettableData3Row(scope.row)" class="el-icon-circle-close color"></i>
                                        </template>
                                    </el-table-column>
                                </el-table>
                          </div>
                      </el-col>
                  </el-row>
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
    batchUpload,
    singleUpload
} from '@/api/management'
import { Form } from 'element-ui'

export default {
    name: "management",
    data(){
        return {
            buttonType: '图谱管理',
            subButtonType: "上传实体",
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
            userSchemaRes: null,
            uploadEntityType: null,
            key_property: {},
            properties: [],
            uploadEntityTableList: [],
            entityName1: null,
            entityName2: null,
            tableData1: [],
            tableData2: [],
            tableData3: [],
            loading1: false,
            loading2: false,
            currentRow1: null,
            currentRow2: null
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
            }else if(val == '手动上传'){
                this.uploadEntityType = null
                this.uploadEntityTableList = []
            }
        },
        clickSubButton(val){
            this.subButtonType = val
            this.uploadEntityType = null
            this.uploadEntityTableList = []
            this.entityName1 = null
            this.entityName2 = null
            this.tableData1 = []
            this.tableData2 = []
            this.tableData3 = []
            this.currentRow1 = null
            this.currentRow2 = null
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
        // 手动上传添加属性
        entityAddProperty(){
            if(this.uploadEntityType!=null){
                this.uploadEntityTableList.push({
                    name: '',
                    value: ''
                })
            }else{
                this.$message({
                    type: "warning",
                    message: "请先选择实体"
                })
            }
            
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
                    return a
                })
            }).catch(() => {
                        
            });
        },
        // 删除手动上传属性
        deletUploadEntity(row){
            if(row.name == 'name'){
                this.$message({
                    type: "warning",
                    message: "此属性不允许删除，且必填。"
                })
                return
            }
            this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.uploadEntityTableList = this.uploadEntityTableList.filter((item, index) => {
                    let a = this.uploadEntityTableList.indexOf(row) != index
                    return a
                })
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
        // 手动上传实体保存
        entitySave(){
            if(this.uploadEntityType!=null){
                let obj = {}
                this.uploadEntityTableList.forEach(item=>{
                    obj[item.name] = item.value
                })
                if(obj[this.key_property.name]){
                    obj.category = this.uploadEntityType
                    let formData = new FormData()
                    formData.append("type", "node")
                    formData.append("node", JSON.stringify(obj))
                    formData.append("key_property", JSON.stringify(this.key_property))
                    singleUpload(formData).then(res=>{
                        if(res.status == "success"){
                            this.$message({
                                type: "success",
                                message: "新增成功"
                            })
                            this.uploadEntityType = null
                            this.uploadEntityTableList = []
                        }else{
                            this.$message({
                                type: "error",
                                message: res.status
                            })
                        }
                    })
                }else{
                    this.$message({
                        type: "warning",
                        message: `请填写 "${this.key_property.name}" 属性的属性值。`
                    })
                }
            }else{
                this.$message({
                    type: "warning",
                    message: "请先选择实体"
                })
            }
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
            if(this.Standard_action){
                this.matchedList.push([val, this.Standard_action])
                this.match_action = null
                this.Standard_action = null

            }else{
                this.match_action = val
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
            let a = this.StandardList[0]
            let req = {
                filename,
                entity_name,
                property_to_col,
                key_property: a.key_property
            }
            let formData = new FormData()
            this.userSchemaRes.map = []
            this.userSchemaRes.map.push(req)
            formData.append('map', JSON.stringify(this.userSchemaRes.map))
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
        },
        /**
         * 新建关系
         */
        // 实体检索
        searchEntity(num){
            if(num == 1){
                this.loading1 = true
                getSingleCategory({entity_name: this.entityName1}).then(res=>{
                    this.loading1 = false
                    this.tableData1 = res
                })
            }else if(num == 2){
                this.loading2 = true
                getSingleCategory({entity_name: this.entityName2}).then(res=>{
                    this.loading2 = false
                    this.tableData2 = res
                })
            }
        },
        // 选中实体
        handleCurrentChange1(val){
            this.currentRow1 = val
        },
        handleCurrentChange2(val){
            if(!val){
                return
            }
            if(this.currentRow1){
                this.currentRow2 = val
                if(this.currentRow1.neoId == this.currentRow2.neoId){
                    this.$message({
                        message: "不能选择实体本身",
                        type: "warning"
                    })
                    return 
                }
                this.$prompt('请输入关系', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputPattern: /\S/,
                    inputErrorMessage: '关系不能为空'
                }).then(({ value }) => {
                    let obj = {
                        name1: `${this.currentRow1.name}(${this.currentRow1.category})`,
                        category: value,
                        name2: `${this.currentRow2.name}(${this.currentRow2.category})`,
                        entityRow1: this.currentRow1,
                        entityRow2: this.currentRow2
                    }
                    this.tableData3.unshift(obj)
                    this.$refs.singleTable1.setCurrentRow();
                    this.$refs.singleTable2.setCurrentRow();
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    });       
                });
            }else{
                this.$message({
                    type: "warning",
                    message: "请先选择左侧实体"
                })
            }
        },
        // 删除关系
        delettableData3Row(row){
            this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.tableData3 = this.tableData3.filter((item, index) => {
                    let a = this.tableData3.indexOf(row) != index
                    return a
                })
            }).catch(() => {
                        
            });
        },
        // 保存关系
        relationshipSave(){
            if(this.tableData3.length == 0){
                this.$message({
                    type: "warning",
                    message: "请新建实体关系。"
                })
                return 
            }
            let arr = []
            this.tableData3.forEach(item=>{
                let obj = {}
                obj.rel_name = item.category
                obj.left_id = item.entityRow1.neoId
                obj.right_id = item.entityRow2.neoId
                arr.push(obj)
            })
            let formData = new FormData()
            formData.append("type", "link")
            formData.append("link", JSON.stringify(arr))
            singleUpload(formData).then(res=>{
                if(res.status == "success"){
                    this.$message({
                        type: "success",
                        message: "上传成功"
                    })
                    this.entityName1 = null
                    this.entityName2 = null
                    this.tableData1 = []
                    this.tableData2 = []
                    this.tableData3 = []
                    this.currentRow1 = null
                    this.currentRow2 = null
                }else{
                    this.$message({
                        type: "error",
                        message: res.status
                    })
                }
            })
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
        },
        uploadEntityType(val){
            let {entities} = this.userSchemaRes
            let properties = null
            entities.forEach(item=>{
                if(item.entity_name == val){
                    properties = Object.keys(item.properties)
                    this.key_property = item.key_property
                }
            })
            
            this.uploadEntityTableList = []
            properties.forEach(item=>{
                if(item != 'category'){
                    this.uploadEntityTableList.push({
                        name: item,
                        value: ""
                    })
                }
            })
        },
        upLoadSelectValue(val){
           this.properties = this.selectOption.filter(item => {
                return item.entity_name == val
            })[0].properties
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
            margin: 20px 0 30px 0;
            padding: 20px;
            background-color: #fff;
            border-radius: .5em;
            min-height: 600px;
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
                
            }
        }
        .color{
            font-size: 24px;
            color: rgb(255, 34, 0);
            cursor: pointer;
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
        .uploadEntityContent{
            width: 100%;
            margin: 20px 0 30px 0;
            &>p{
                text-align: center;
                font-size: 24px;
                
            }
            .uploadEntityBody{
                padding: 20px 0 20px 0;
                &>.operation{
                    padding: 0px 0 20px 0;
                    float: right;
                }
            }
        }
        .relationshipContent{
            width: 100%;
            margin: 20px 0 30px 0;
            &>p{
                text-align: center;
                font-size: 24px;
            }
            .relationshipBody{
                padding: 20px 0 20px 0;
            }
            .b_div{
                border: 1px solid #ccc;
                min-height: 400px;
                border-radius: 5px;
                padding: 20px 0 20px 0;
            }
        }
        .messageBox{
            padding: 10px 0 10px 0;
            font-size: 12px;
            color: #333;
            &>span{
                color: red;
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