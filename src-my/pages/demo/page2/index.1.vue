<template>
  <d2-container>
    <template slot="header">Page 5 header</template>
    <template>
      <div class="tableContainer">
        <!-- 筛选 -->
        <div class="tableContainerSearch">
          <el-input type="search" v-model="search" style="height: 32px;line-height: 32px" placeholder="请搜索关键字"></el-input>
        </div>
        <d2-crud
          :columns="columns"
          :data="tablesData"
          :options="options"
          selection-row
          add-mode
          :rowHandle="rowHandle"
          :add-button="addButton"
          :form-template="formTemplate"
          :form-options="formOptions"
          :pagination="pagination"
          @row-edit="handleRowEdit"
          @row-add="handleRowAdd"
          @dialog-cancel="handleDialogCancel"
          @row-remove="handleRowRemove"
          @selection-change="selsChange"/>
          <el-button class="tableContainerDelAll" type="danger" size="mini" plain @click="handleDelete(sels.map(i => i.name))" :disabled="this.sels.length===0">批量删除</el-button>
      </div>
    </template>
    <template slot="footer">footer</template>
  </d2-container>
</template>

<script>
export default {
  data () {
    return {
      search: '',//搜索内容框
      sels: [],//存选中的行数据
      columns: [
        {
          title: '日期',
          key: 'date',
          width: '180',
          fixed: true,
          sortable: true
        },
        {
          title: '姓名',
          key: 'name',
          width: '180'
        },
        {
          title: '省份',
          key: 'province',
          width: '300'
        },
        {
          title: '市区',
          key: 'city',
          width: '300'
        },
        {
          title: '地址',
          key: 'address',
          width: '300'
        },
        {
          title: '邮编',
          key: 'zip',
          width: '180'
          // fixed: 'right'
        }
      ],
      tablesInfo: [
        {
          date: '2016-05-03',
          name: '航天信息',
          province: '北京',
          city: '普陀区',
          address: '北京市普陀区金沙江路 1518 弄',
          zip: 200333,
          showEditButton: true,
          showRemoveButton: true
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
          showEditButton: true,
          showRemoveButton: true
        },
        {
          date: '2016-05-04',
          name: '航天信息',
          province: '北京',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
          showEditButton: true,
          showRemoveButton: true
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
          showEditButton: true,
          showRemoveButton: true
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          province: '北京',
          city: '普陀区',
          address: '北京市普陀区金沙江路 1518 弄',
          zip: 200333,
          showEditButton: true,
          showRemoveButton: true
        }
      ],
      options: {
        border: true,
      },
      pagination: {
        pageSize: 3, // 分页大小设置
        layout: 'prev, pager, next, total'
      },
      rowHandle: {
        width: '200',
        fixed: 'right',//固定最后一栏操作栏
        // columnHeader: '编辑表格',
        edit: {
          icon: 'el-icon-edit',
          text: '编辑',
          size: 'small',
          show (index, row) {
            if (row.showEditButton) {
              return true
            }
            return false
          },
        },
        remove: {
          icon: 'el-icon-delete',
          size: 'small',
          width: '300',
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
        }
      },
      addButton: {
        icon: 'el-icon-plus',
        size: 'small'
      },
      formTemplate: {
        date: {
          title: '日期',
          value: '',
          component: {
            name: 'el-date-picker',
            span: 12
          }
        },
        name: {
          title: '姓名',
          value: '王小虎',
          component: {
            span: 12
          }
        },
        province: {
          title: '省份',
          value: '上海',
          component: {
            span: 12
          }
        },
        city: {
          title: '市区',
          value: '普陀区',
          component: {
            span: 12
          }
        },
        zip: {
          title: '邮编',
          value: 200333,
          component: {
            span: 12
          }
        },
        address: {
          title: '地址',
          value: '上海市普陀区金沙江路 1520 弄',
          component: {
            span: 18
          }
        },
        showEditButton: {
          title: '显示编辑按钮',
          value: true,
          component: {
            show: false
          }
        },
        showRemoveButton: {
          title: '显示删除按钮',
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
    }
  },
  methods: {
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
          date: '2018-12-17',
          name: '张传敏',
          province: '北京',
          city: '海淀区',
          address: '我是通过done事件传入的数据！',
          zip: 100044
        })
        this.formOptions.saveLoading = false
      }, 300);
    },
    handleRowEdit ({index, row}, done) {// 添加操作
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
    handleRowRemove ({index, row}, done) {//删除方法
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
    handleDialogCancel (done) {
      this.$message({
        message: '取消保存',
        type: 'warning'
      });
      done()
    },
    selsChange (sels) {//多选表格
      // console.log(selection)
      this.sels = sels
    },
    handleDelete(idArray) {//删除多行
      alert(idArray);//调试代码
      this.tablesInfo = this.tablesInfo.filter(i => !idArray.includes(i.name));
    },
    // // 筛选变色
    // showDate(val) {
    //   val = val + '';
    //   if (val.indexOf(this.search) !== -1 && this.search !== '') {
    //     return val.replace(this.search, '<font color="#409EFF">' + this.search + '</font>')
    //   } else {
    //     return val
    //   }
    // }
  },
  computed: {
    // 实时监听表格,模糊搜索
    tablesData: function() {
      const search = this.search
      if (search) {
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
}
</script>
<style>
  .tableContainer {
    position: relative;
  }
  .tableContainerSearch {
    position: absolute;
    top: 7px;
    left: 0;
  }
  .tableContainerSearch .el-input__inner {
    height: 32px;
    line-height: 32px;
  }
  .d2-crud-pagination {
    float: right;
  }
  .tableContainerDelAll {
    margin: 15px 0;
  }
  .el-table th {
    background-color: #eff1f7;
  }
</style>
