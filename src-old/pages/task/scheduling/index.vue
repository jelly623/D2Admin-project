<template>
<d2-container>
  <template slot="header">
    <!-- 工具条 -->     
    <div class="toolbar">
      <el-col :span="24" class="toolbar-title">定时任务调度列表</el-col>
      <hr/>
       <el-form :inline="true" label-width="80px" size="mini" style="margin:0 10px 0 -5px">                        
        <el-form-item label="任务描述">
          <el-input v-model="formData.desc" style="display: inline-block;"></el-input>   
        </el-form-item>   
        <el-form-item>
          <el-button type="primary" class="toolbar-button" @click="search(formData)">查询</el-button>
        </el-form-item>
      </el-form>
    </div>   
 </template>
 <template  class="tableContainer"> 
    <!-- 表格 -->
    <d2-crud
      ref="d2Crud"
      :columns="columns"
      :data="realList"
      @d2-data-change="handleDataChange"
      :pagination="pagination"
      :options="options"      
      add-mode
      :rowHandle="rowHandle"
      @custom-emit-1="handleCustomEvent"
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
// import  { ShowTablesInfoData } from '@/api/demo/page4/blackListInfo'
import MyTag from './MyTag.vue'

export default {
  components: {
    MyTag
  },
  data() {
    return {
      formData: {
        // name: '',
        // telephone: '',
        // time: '',
        // person: ''
        desc: ''
      },
      realList: [],
      sels: [], //列表选中列
      columns: [
        {
          title: 'ID',
          key: 'id',
          width: '60',
          sortable: true,
        },
        {
          title: '任务描述',
          key: 'desc',
          width: '150',
          sortable: true
        },
        {
          title: '任务类名称',
          key: 'name',
          width: '150',
          sortable: true
        },
        {
          title: '定时调度表达式',
          key: 'expression',
          width: '150',
          sortable: true
        },
        {
          title: '备注',
          key: 'remark',
          width: '150',
          sortable: true
        },
        {
          title: '任务状态',
          key: 'status',
          width: '150',
          sortable: true
        },
        {
          title: '参数',
          key: 'para',
          width: '100',
          sortable: true
        },        
        {
          title: '启停',
          key: 'check',
          width: '60',
          component: {
            name: MyTag,
            props: {
              myProps: ''
            }
          }
        },                              
      ],
      tablesInfo: [
        {
          id: 1,
          desc: '测试任务1',
          name: '111',
          expression: '0 15 10 * * ? *	',
          remark: '备注1',
          status: '状态1',
          para: 'para1', 
          check: true,
          forbidEdit: false,
          showEditButton: true,
          forbidRemove: false,
          showRemoveButton: true                               
        },
        {
          id: 2,
          desc: '测试任务2',
          name: '222',
          expression: '0 15 10 * * ? 2018',
          remark: '备注2',
          status: '状态2',
          para: 'para2', 
          check: false,
          forbidEdit: false,
          showEditButton: true,
          forbidRemove: false,
          showRemoveButton: true                               
        },
        {
          id: 3,
          desc: '测试任务3',
          name: '333',
          expression: '0 15 10 * * ? *	',
          remark: '备注1',
          status: '状态1',
          para: 'para1', 
          check: true,
          forbidEdit: false,
          showEditButton: true,
          forbidRemove: false,
          showRemoveButton: true                               
        },
        {
          id: 4,
          desc: '测试任务4',
          name: '444',
          expression: '0 15 10 * * ? *	',
          remark: '备注1',
          status: '状态1',
          para: 'para1', 
          check: false,
          forbidEdit: false,
          showEditButton: true,
          forbidRemove: false,
          showRemoveButton: true                               
        }, 
        {
          id: 5,
          desc: '测试任务5',
          name: '555',
          expression: '0 15 10 * * ? *	',
          remark: '备注1',
          status: '状态1',
          para: 'para1', 
          check: true,
          forbidEdit: false,
          showEditButton: true,
          forbidRemove: false,
          showRemoveButton: true                               
        },                                 
      ],     
      pagination: {
        pageSize: 4,
        layout: 'total, prev, pager, next, jumper',
      },
      rowHandle: {
        // remove: {
        //   icon: 'el-icon-delete',
        //   size: 'mini',
        //   fixed: 'right',
        //   confirm: true,
        //   show (index, row) {
        //     if (row.showRemoveButton) {
        //       return true
        //     }
        //     return false
        //   },
        //   disabled (index, row) {
        //     if (row.forbidRemove) {
        //       return true
        //     }
        //     return false
        //   }
        // },   
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
        },       
        // custom: [
        //   {
        //     text: '',
        //     type: 'primary',
        //     size: 'small',
        //     emit: 'custom-emit-1',
        //   }
        // ]        
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
          title: '任务类名称',
          value: '',
          component: {
            span: 22
          }          
        },
          desc: {
          title: '任务描述',
          value: '',
          component: {
            span: 22
          }           
        },
        expression: {
          title: 'cron表达式',
          value: '',
          component: {
            span: 22
          }          
        },      
        para: {
          title: '参数（以;分隔）',
          value: '',
          component: {
            span: 22
          }          
        },
        remark: {
          title: '备注信息',
          value: '',
          component: {
            span: 22
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
        labelWidth: '150px',
        labelPosition: 'left',
        saveLoading: false,
        gutter: 30
      },
      formRules: {
        name: [ { required: true, message: '请输入任务类名称', trigger: 'blur' } ],
        // telephone: [ { required: true, message: '请输入电话', trigger: 'blur' } ],
        // description: [ { required: true, message: '请输入具体描述', trigger: 'blur' } ]
      }      
    };
  },
  filters: {

  },
  computed: {
    // realList() {
    //   let { name, phone, sex } = this.formData;
    //   if (name && phone && sex) {
    //     return this.list;
    //   }
    // },
  },
  created() {
        this.search({});
  },  
  methods: {
    // 查询
    search({ desc }) {
      this.realList = this.tablesInfo.filter(item => {
        // let matchName = true; // 姓名 筛选
        // let matchTelephone = true; // 性别 筛选
        // let matchTime = true; // 号码 筛选
        // let matchPerson = true;
        let matchDesc = true;

        if (desc) {
          // 模糊搜索;
          const keys = desc
            .toUpperCase() // 转大写
            .replace(' ', '') // 删掉空格
            .split(''); // 切割成 单个字

          matchDesc = keys.every(key => item.desc.toUpperCase().includes(key));
        }        
        return matchDesc;
      });
      console.log(this.realList)
    },
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
    // handleRowRemove ({index, row}, done) {
    //   setTimeout(() => {
    //     console.log(index)
    //     console.log(row)
    //     this.$message({
    //       message: '删除成功',
    //       type: 'success'
    //     })
    //     done()
    //   }, 300)
    // },
    // 批量删除
      selsChange(sels) {
        this.sels = sels
      },  
      handleDelete(idArray) {
        // this.tablesInfo = this.tablesInfo.filter(i => !idArray.includes(i.id));
        this.realList = this.realList.filter(i => !idArray.includes(i.id));
        this.$message({
          message: '删除成功',
          type: 'success'
        })
      },
      // 启停
      // handleCustomEvent ({index, row}) {
        
      //   console.log(index)
      //   console.log(row)
      // },
    handleDataChange (data) {
      console.log(data)
    }                 
  },
    mounted () {
    console.log(this.$refs.d2Crud.d2Data)
  } 
};

</script>

<style>
.tableContainer {
  position: relative;
}

.toolbar {
	background: #f2f2f2;
	padding: 10px 10px 0 10px;
	border:0;
  margin-top: -10px;
  margin-left: 10px;
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
  margin-left: 15px;
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