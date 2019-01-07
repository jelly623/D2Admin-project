<template>
<d2-container>
  <template slot="header">
    <!-- 工具条 -->
         <ul>
         <li v-for="Info in tablesInfo" :key="Info"> 
            <h2>{{Info.name}}</h2>  
            <h3>{{Info.telephone}}</h3>
         </li>
         </ul>      
    <div class="toolbar">
      <el-col :span="24" class="toolbar-title">黑名单列表</el-col>
      <hr/>
      <!-- <el-form :inline="true" label-width="70px" size="mini" style="margin:0 -10px 0 -5px">
        <el-form-item label="客户名称">
          <el-input v-model="search" style="display: inline-block;"></el-input>
        </el-form-item>        
        <el-form-item label="电话号码">
          <el-input v-model="search" style="display: inline-block;"></el-input>
        </el-form-item>
        <el-form-item label="提交时间">
          <el-input v-model="search" style="display: inline-block;"></el-input>
        </el-form-item>
        <el-form-item label="提交人">
          <el-input v-model="search" style="display: inline-block;"></el-input>
        </el-form-item>        
        <el-form-item>
          <el-button type="primary" class="toolbar-button" style="display: inline-block;">查询</el-button>
        </el-form-item>    -->
                            
       <el-form :inline="true" :model="filters" label-width="70px" size="mini" style="margin:0 -10px 0 -5px">                        
        <el-form-item label="客户名称">
          <el-input v-model="filters.name" style="display: inline-block;"></el-input>
        </el-form-item>   
        <el-form-item label="电话号码">
          <el-input v-model="filters.telephone" ></el-input>
        </el-form-item>
        <el-form-item label="提交时间">
          <el-input v-model="filters.time"></el-input>
        </el-form-item>
        <el-form-item label="提交人">
        <el-input v-model="filters.person"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="toolbar-button" >查询</el-button>
        </el-form-item>
        <el-form-item>
        <el-button type="primary" class="toolbar-button" >重置</el-button>
        </el-form-item>
      </el-form>
    </div>   
 </template>
 <template  class="tableContainer"> 
   <!-- <el-button class="delButton" type="danger" size="mini" plain @click="handleDelete(sels.map(i => i.name))" :disabled="this.sels.length===0">批量删除</el-button> -->
    <!-- 表格 -->
     <d2-crud
      ref="d2Crud"
      :columns="columns"
      :data="tablesData"
      :pagination="pagination"
      :options="options"      
      add-mode
      :rowHandle="rowHandle"
      :add-button="addButton"
      :form-template="formTemplate"
      :form-options="formOptions"
      :form-rules="formRules"
      @row-add="handleRowAdd"
      @row-edit="handleRowEdit"
      @row-remove="handleRowRemove"
      @dialog-cancel="handleDialogCancel"
      selection-row
      @selection-change="selsChange">
      <el-button slot="headerButton" type="danger" size="small" plain @click="handleDelete(sels.map(i => i.id))">批量删除</el-button>
     </d2-crud>
    
  </template>
  
  </d2-container>
  </template>

<script>
import  { FindBlackList } from '@/api/demo/blackListInfo'

export default {
  data () {
    return {
      filters: {
        name: '',
        telephone: '',
        time: '',
        person: ''
      },
      // search: '',//搜索内容框
      sels: [], //列表选中列
      columns: [
        {
          title: '客户名称',
          key: 'name',
          width: '150',
          sortable: true,
        },
        {
          title: '电话号码',
          key: 'telephone',
          width: '150',
          sortable: true
        },
        {
          title: '具体描述',
          key: 'description',
          width: '250',
          sortable: true
        },
        {
          title: '提交时间',
          key: 'time',
          width: '150',
          sortable: true
        },
        {
          title: '提交人',
          key: 'person',
          width: '150',
          sortable: true
        }              
      ],
      tablesInfo: '',
      created() {
            FindBlackList().then((data)=>{
              this.tablesInfo=data; 
              consoled.log(data);
            });
      },      
      // [
      //     {
      //     id: 1,
      //     name: '王小虎',
      //     telephone: '111',
      //     description: 'wangxiaohu@aisino.com',
      //     time: '2018-12-21',
      //     person: '陈伟霆', 
      //     forbidEdit: false,
      //     showEditButton: true,
      //     forbidRemove: false,
      //     showRemoveButton: true                     
      //     },
      //     {
      //     id: 2,
      //     name: '吴伟',
      //     telephone: '222',
      //     description: 'wuwei@aisino.com',
      //     time: '2018-12-21',
      //     person: '陈伟霆', 
      //     forbidEdit: false,
      //     showEditButton: true,
      //     forbidRemove: false,
      //     showRemoveButton: true      
      //     },
      //     {
      //     id: 3,
      //     name: '王艳',
      //     telephone: '333',
      //     description: 'wangyan@aisino.com',
      //     time: '2018-12-21',
      //     person: '陈伟霆',  
      //     forbidEdit: false,
      //     showEditButton: true,
      //     forbidRemove: false,
      //     showRemoveButton: true     
      //     },
      //     {
      //     id: 4,  
      //     name: '雷梦',
      //     telephone: '444',
      //     description: 'leimeng@aisino.com',
      //     time: '2018-12-21',
      //     person: '陈伟霆', 
      //     forbidEdit: false,
      //     showEditButton: true,
      //     forbidRemove: false,
      //     showRemoveButton: true      
      //     },
      //     {
      //     id: 5,  
      //     name: '雷梦',
      //     telephone: '444',
      //     description: 'leimeng@aisino.com',
      //     time: '2018-12-21',
      //     person: '陈伟霆', 
      //     forbidEdit: false,
      //     showEditButton: true,
      //     forbidRemove: false,
      //     showRemoveButton: true      
      //     }          
      // ],
      pagination: {
        pageSize: 4,
        layout: 'total, prev, pager, next, jumper',
      },
      rowHandle: {
        remove: {
          icon: 'el-icon-delete',
          size: 'mini',
          fixed: 'right',
          confirm: true,
          show (index, row) {
            if (row.showRemoveButton) {
              return true
            }
            return false
          },
          disabled (index, row) {
            if (row.forbidRemove) {
              return true
            }
            return false
          }
        },   
        columnHeader: '修改',
        edit: {
          icon: 'el-icon-edit',
          text: '',
          size: 'mini',
          show (index, row) {
            if (row.showEditButton) {
              return true
            }
            return false
          },
          disabled (index, row) {
            if (row.forbidEdit) {
              return true
            }
            return false
          }
        }
      },
       options: {
        stripe: true,
        height: '260',
        highlightCurrentRow: true
      },      
      addButton: {
        icon: 'el-icon-plus',
        size: 'small',
        fixed: 'left'
      },
      formTemplate: {
          name: {
          title: '客户名称',
          value: '',
          component: {
            span: 12
          }          
        },
          telephone: {
          title: '电话号码',
          value: '',
          component: {
            span: 12
          }           
        },
        time: {
          title: '提交时间',
          value: '',
          component: {
            span: 12
          }          
        },      
        person: {
          title: '提交人',
          value: '',
          component: {
            span: 12
          }          
        },
        description: {
          title: '具体描述',
          value: '',
          component: {

          }          
        },
        forbidEdit: {
          title: '禁用按钮',
          value: false,
          component: {
            show: false
          }
        },
        showEditButton: {
          title: '显示按钮',
          value: true,
          component: {
            show: false
          }
        }
      },
      formOptions: {
        labelWidth: '80px',
        labelPosition: 'left',
        saveLoading: false,
        gutter: 20
      },
      formRules: {
        name: [ { required: true, message: '请输入名称', trigger: 'blur' } ],
        telephone: [ { required: true, message: '请输入电话', trigger: 'blur' } ],
        description: [ { required: true, message: '请输入具体描述', trigger: 'blur' } ]
      }      
    }
  },
    computed: {
      // 模糊搜索
      tablesData () {
        const filter = this.filter
        if (filter) {
          // filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。
          // 注意： filter() 不会对空数组进行检测。
          // 注意： filter() 不会改变原始数组。
          return this.tablesInfo.filter(dataNews => {
            // some() 方法用于检测数组中的元素是否满足指定条件;
            // some() 方法会依次执行数组的每个元素：
            // 如果有一个元素满足条件，则表达式返回true , 剩余的元素不会再执行检测;
            // 如果没有满足条件的元素，则返回false。
            // 注意： some() 不会对空数组进行检测。
            // 注意： some() 不会改变原始数组。
            return Object.keys(dataNews).some(key => {
              // indexOf() 返回某个指定的字符在某个字符串中首次出现的位置，如果没有找到就返回-1；
              // 该方法对大小写敏感！所以之前需要toLowerCase()方法将所有查询到内容变为小写。
              return String(dataNews[key]).toLowerCase().indexOf(search) > -1
            })
          })
        }
        return this.tablesInfo
      }
    },
  methods: {
    // 新增
    handleRowAdd (row, done) {
      this.formOptions.saveLoading = true
      setTimeout(() => {
        console.log(row)
        this.$message({
          message: '保存成功',
          type: 'success'
        });

        // done可以传入一个对象来修改提交的某个字段
        done({
          description: '我是通过done事件传入的数据！'
        })
        this.formOptions.saveLoading = false
      }, 300);
    },
    // 修改
    handleRowEdit ({index, row}, done) {
      this.formOptions.saveLoading = true
      setTimeout(() => {
        console.log(index)
        console.log(row)
        this.$message({
          message: '编辑成功',
          type: 'success'
        })

        // done可以传入一个对象来修改提交的某个字段
        done({
          address: '我是通过done事件传入的数据！'
        })
        this.formOptions.saveLoading = false
      }, 300)
    },
    handleDialogCancel (done) {
      this.$message({
        message: '取消编辑',
        type: 'warning'
      })
      done()
    },
    //多选
    // handleSelectionChange (selection) {
    //   console.log(selection)
    // },
    //删除
    handleRowRemove ({index, row}, done) {
      setTimeout(() => {
        console.log(index)
        console.log(row)
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        done()
      }, 300)
    },
    // 批量删除
      selsChange(sels) {
        this.sels = sels
      },  
      handleDelete(idArray) {
        this.tablesInfo = this.tablesInfo.filter(i => !idArray.includes(i.id));
      },      
},
  mounted () {
    console.log(this.$refs.d2Crud.d2Data)
  } 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.tableContainer {
  position: relative;
}

.toolbar {
	background: #f2f2f2;
	padding: 10px 10px 0 10px;
	border:0;
  margin-top: -10px;
  margin-left: -10px;
  margin-bottom: -10px;
}
.toolbar-title {
  font-size:16px;
  font-weight:bold;
  margin-top: -5px;
  margin-bottom: 3px;
  padding: 0;
}
.toolbar-button {
  margin-right: -15px;
}
.d2-crud-pagination {
    float: right;
    margin-top:-20px;
    margin-bottom: -30px;
}
.delButton {
  margin-right: 10px;
}
.d2-crud {
  margin-top:-20px;
}
  .el-table th {
    background-color: #eff1f7;
  }

</style>
