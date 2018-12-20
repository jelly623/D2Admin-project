<template>
<d2-container>
    <!-- <template slot="header">Page 4 header</template> -->
    <!-- 工具条 -->
    
    <div class="toolbar">
      <el-col :span="24" class="toolbar-title">黑名单列表</el-col>
      <hr/>
      <el-form :inline="true" :model="filters" label-width="80px" size="mini">
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
          <el-button type="primary" class="toolbar-button" @click="getUsers">查询</el-button>
        </el-form-item>
        <el-form-item>
        <el-button type="primary" class="toolbar-button" @click="">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 事件处理 -->
    <el-form :inline="true">
      <el-form-item>
       <el-button type="primary" class="handle-button" @click="handleAdd">新增</el-button>
      </el-form-item>
      <el-form-item>
          <el-button type="danger" class="handle-button" @click="delPerson($index)">删除</el-button>
      </el-form-item>
    </el-form>
<!-- :disabled="this.sels.length===0" -->

    <!-- 列表 -->
    <el-table :data="users" stripe highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%" >
      <el-table-column type="selection" width="60"></el-table-column>
      <el-table-column prop="name" label="客户名称" width="150" sortable ></el-table-column>
      <el-table-column prop="telephone" label="电话号码" width="150" sortable ></el-table-column>
      <el-table-column prop="description" label="具体描述" width="260" sortable ></el-table-column>
      <el-table-column prop="Submission_time" label="提交时间" width="150" sortable ></el-table-column>
      <el-table-column prop="Submission_person" label="提交人" width="150" sortable ></el-table-column>
      <el-table-column label="修改">
        <template scope="scope">
          <el-button size="small" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>

   <!-- 新增界面 --> 
    <el-dialog title="黑名单管理----新增名单" :visible.sync="dialogFormVisible" :before-close="handleClose" >
        <el-form  class="addForm" :inline="true" :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
            <el-form-item  label="客户名称" prop="name">
            <el-input v-model="addForm.name" auto-complete="off" size="small"></el-input>
            </el-form-item>
            <el-form-item label="电话号码" prop="telephone">
            <el-input v-model="addForm.telephone" size="small"></el-input>
            </el-form-item>
            <el-form-item label="提交时间">
            <el-input v-model="addForm.Submission_time" size="small"></el-input>
            </el-form-item>
            <el-form-item label="提交人">
            <el-input v-model="addForm.Submission_person" size="small"></el-input>
            </el-form-item>
            <el-form-item label="具体描述" prop="description">
            <el-input type="textarea" v-model="addForm.description" size="medium"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addSubmit">确 定</el-button>
        </div>
    </el-dialog>


   <template slot="footer">copyright</template>
  </d2-container>
</template>

<script>
export default {
    data() {
		return {
        filters: {
          telephone: '',
          time: '',
          person: ''
        },
        sels: [],//列表选中列
        
        //新增界面数据
        addForm: {
          name: '',
          telephone: '',
          description: '',
          Submission_time: '',
          Submission_person: ''
        },        
        // newUser: {
        //     name: '',
        //     telephone: '',
        //     description: '',
        //     Submission_time: '',
        //     Submission_person: ''
        // },
        users: [{
            name: '小王',
            telephone: '13112345678',
            description: '1111111111111',
            Submission_time: '2018-12-10',
            Submission_person: '陈伟霆'
        },{
            name: '小李',
            telephone: '13112345678',
            description: '1111111111111',
            Submission_time: '2018-12-10',
            Submission_person: '王小虎'
        }],

            dialogFormVisible: false, //新增界面是否显示
			addLoading: true,
			addFormRules: {
				name: [
					{ required: true, message: '请输入姓名', trigger: 'blur' }
                    ],
                telephone: [
                    { required: true, message: '请输入电话', trigger: 'blur' }
                ],
                description: [
                    { required: true, message: '请输入具体描述', trigger: 'blur' }
                ]
				},


    }
    },
    methods:{

        //显示新增界面
        handleAdd() {
            this.dialogFormVisible = true;
            this.addForm = {
            name: '',
            telephone: '',
            description: '',
            Submission_time: '',
            Submission_person: ''
            };
        },

        //新增
		addSubmit: function () {
			this.$refs.addForm.validate((valid) => {
				if (valid) {
					this.$confirm('确认提交吗？', '提示', {}).then(() => {
						this.addLoading = true;
						//NProgress.start();
						let para = Object.assign({}, this.addForm);
						this.users.push(this.addForm);
						
							this.addLoading = false;
							//NProgress.done();
							this.$message({
								message: '提交成功',
								type: 'success'
							});
							this.$refs['addForm'].resetFields();
							this.dialogFormVisible = false;
							this.getUsers();
						
					});
				}
			});
		},
		// selsChange: function (sels) {
		// 	this.sels = sels;
        // },
        handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }, //dialog点击关闭后询问
      
        delPerson: function (index){
            // 删一个数组元素
            this.users.splice(index,1);
        },
    }
}
</script>

<style>
.toolbar {
	background: #f2f2f2;
	padding: 10px 10px 0 10px;
	border:0;
  margin-top: -10px;
}
.toolbar-title {
  font-size:16px;
  font-weight:bold;
  margin-top: -5px;
  margin-bottom: 3px;
  padding: 0;
}
.toolbar-button {
  margin-left: 30px;
  margin-right: -15px;
}

.handle-button {
  margin-left: 0;
  margin-top: 5px;
}
.col-md-6,.panel,.table {
    margin-left: 300px;
    margin-top: 300px;
}

.dialog-footer {
    margin-top: -30px;
    margin-right: 30px;

}

.addForm {
    margin-left: 30px;
}
</style>