<template>
  <div class="management">
      <div class="header">
          <el-button :type="buttonType == '图谱管理' ? 'primary' : ''" @click="clickButton('图谱管理')">图谱管理</el-button>
          <el-button :type="buttonType == '批量上传' ? 'primary' : ''" @click="clickButton('批量上传')">批量上传</el-button>
      </div>
      <div class="content" v-show="buttonType == '图谱管理'">
          <div class="inputBox">
                <el-input placeholder="请输入内容" v-model="from.updateNode" class="input-with-select">
                    <el-select v-model="from.label" slot="prepend" placeholder="请选择">
                        <el-option
                            v-for="item in selectOption"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                    <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                </el-input>
                <el-button  type="primary" @click="exportResult">导出结果</el-button>
          </div>
          <div class="tableBox">
              <el-table
                    :data="tableData"
                    border
                    class="table"
                >
                    <el-table-column
                    prop="date"
                    label="日期"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="姓名"
                    width="180">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="地址">
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        width="200">
                        <template slot-scope="scope">
                            <el-button @click="changeTableData(scope.row)" type="primary" size="small">修改</el-button>
                            <el-button @click="deleteTableData(scope.row)" type="primary" size="small">删除</el-button>
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
          <div class="uploadBox">
              <div class="uploadBoxTop">
                  <span>请选择上传类型的所属类别：</span>
                  <el-select size="small" v-model="upLoadSelectValue" placeholder="请选择">
                        <el-option
                        v-for="item in selectOption"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
              </div>
              <div class="uploadBoxContent">
                    <el-upload
                        class="upload-demo"
                        ref="upload"
                        drag
                        action="https://jsonplaceholder.typicode.com/posts/"
                        multiple
                        :auto-upload="false"
                        :show-file-list="false"
                        @on-success="uoloadSuccess">
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                    <el-button size="small" style="margin-top: 10px" type="success" @click="submitUpload">上传到服务器</el-button>
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
                    实体名称: <span style="padding: 0 30px;">{{dialog.title}}</span>
                </div>
                <div class="operation">
                    <el-button @click="dialogAddProperty" type="primary" size="small">添加属性</el-button>
                    <el-button @click="dialogSave" type="primary" size="small">保存</el-button>
                </div>
            </div>
            <div class="dialogContent">
                <el-table
                    :data="tableData"
                    border
                    class="table"
                >
                    <el-table-column
                    prop="name"
                    label="属性名称">
                    </el-table-column>
                    <el-table-column
                    prop="valye"
                    label="属性值">
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
    csvDownload
} from '@/api/management'

export default {
    name: "management",
    data(){
        return {
            buttonType: '图谱管理',
            from: {
                updateNode: null,
                label: null,
            },
            upLoadSelectValue: null,
            selectOption: [],
            tableData: [
                {
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
                }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
                }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
                }
            ],
            dialogVisible: false,
            dialog: {
                title: '中国人民解放军总字943部队',
                content: ''
            },
            active: 0
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
                let {entities} = res
                entities.forEach(item => {
                    this.selectOption.push({
                        value: item.entity_name,
                        label: item.entity_name
                    })
                });
            })
        },
        // 切换
        clickButton(val){
            this.buttonType = val
        },
       // 搜索
        search(){
            let data = {
                label: this.label,
                updateNode: this.updateNode
            }
            getSingleCategory(this.from).then(res=>{
                console.log(data)
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
        // 修改表格数据
        changeTableData(row){

        },
        // 删除表格数据
        deleteTableData(row){

        },
        // dialog 关闭弹框
        handleClose(){
            this.dialogVisible = false
        },
        // dialog 添加属性
        dialogAddProperty(){

        },
        // 删除属性
        deleteProperty(row){
            
        },
        // dialog 保存
        dialogSave(){
            
        },
        // 上传文件
        submitUpload() {
            this.$refs.upload.submit();
        },
        // 上传成功
        uoloadSuccess(){

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
            .inputBox{
                padding: 20px;
                text-align: center;
                .input-with-select{
                    width: 50%;
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
    }
    /deep/ .el-select .el-input {
        width: 130px;
    }
    /deep/ .input-with-select .el-input-group__prepend {
        background-color: #fff;
    }
</style>