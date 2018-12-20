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
        <el-button type="primary" class="toolbar-button" @click=" ">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 事件处理 -->
    <el-form :inline="true">
      <el-form-item>
       <el-button type="primary" class="handle-button" @click="handleAdd">新增</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="danger" class="handle-button" @click="batchRemove" :disabled="this.sels.length===0" >删除</el-button>
      </el-form-item>
    </el-form>

    <!-- 列表 -->
    <el-table :data="users" stripe highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%">
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
    <el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
      <el-form  :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
        <el-form-item prop="name" label="客户名称" >
          <el-input v-model="addForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话号码">
          <el-input v-model="addForm.telephone"></el-input>
        </el-form-item>
        <el-form-item label="具体描述">
          <el-input type="textarea" v-model="addForm.description" ></el-input>
        </el-form-item>
        <el-form-item label="提交时间">
          <el-input v-model="addForm.Submission_time" ></el-input>
        </el-form-item>
        <el-form-item label="提交人">
          <el-input v-model="addForm.Submission_person" ></el-input>
        </el-form-item>
        <br/>

      </el-form>
    </el-dialog>

		<!--编辑界面-->
		<el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
        <el-form-item prop="name" label="客户名称" >
          <el-input v-model="editForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话号码">
          <el-input v-model="editForm.telephone"></el-input>
        </el-form-item>
        <el-form-item label="具体描述">
          <el-input type="textarea" v-model="editForm.description" ></el-input>
        </el-form-item>
        <el-form-item label="提交时间">
          <el-input v-model="editForm.Submission_time" ></el-input>
        </el-form-item>
        <el-form-item label="提交人">
          <el-input v-model="editForm.Submission_person" ></el-input>
        </el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>

    <template slot="footer">copyright</template>
  </d2-container>
</template>

<script>

	//import NProgress from 'nprogress'
	import util from '../../../common/js/util'
	//import NProgress from 'nprogress'
	import { getUserListPage, removeUser, batchRemoveUser, editUser, addUser } from '../../../api/demo/api';

export default {
  name: 'blacklist',
  data() {
    return {
        filters: {
          telephone: '',
          time: '',
          person: ''
        },
        listLoading: false,
        sels: [],//列表选中列
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

			  addFormVisible: true,//新增界面是否显示
				addLoading: true,
				addFormRules: {
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					]
				},

      //新增界面数据
        addForm: {
          name: '',
          telephone: '',
          description: '',
          Submission_time: '',
          Submission_person: ''
        },

        editFormVisible: false,//编辑界面是否显示
				editLoading: false,
				editFormRules: {
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					]
				},
				//编辑界面数据
				editForm: {
					id: 0,
					name: '',
          telephone: '',
          description: '',
          Submission_time: '',
          Submission_person: ''
				},
      };
    },
    methods: {
      
			//获取用户列表
			getUsers() {
				let para = {
					page: this.page,
					name: this.filters.name
				};
				this.listLoading = true;
				//NProgress.start();
				getUserListPage(para).then((res) => {
					this.total = res.data.total;
					this.users = res.data.users;
					this.listLoading = false;
					//NProgress.done();
				});
      },

      //显示新增界面
      handleAdd() {
        this.addFormVisible = true;
        this.addForm = {
          name: '',
          telephone: '',
          description: '',
          Submission_time: '',
          Submission_person: ''
        };
      },
      //显示编辑界面
			handleEdit: function (index, row) {
				this.editFormVisible = true;
				this.editForm = Object.assign({}, row);
			},

      //新增列表项
      addSubmit() {
				this.$refs.addForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.addLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.addForm);
							// para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
							addUser(para).then((res) => {
								this.addLoading = false;
								//NProgress.done();
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['addForm'].resetFields();
								this.addFormVisible = false;
                this.getUsers();
                console.log(para)
							});
						});
					}
				});
      },
      selsChange: function (sels) {
				this.sels = sels;
      },
      //编辑
			editSubmit: function () {
				this.$refs.editForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.editLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.editForm);
							para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
							editUser(para).then((res) => {
								this.editLoading = false;
								//NProgress.done();
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['editForm'].resetFields();
								this.editFormVisible = false;
								this.getUsers();
							});
						});
					}
				});
			},

      //批量删除
      batchRemove: function () {
				var ids = this.sels.map(item => item.id).toString();
				this.$confirm('确认删除选中记录吗？', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = { ids: ids };
					batchRemoveUser(para).then((res) => {
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getUsers();
					});
				}).catch(() => {

        });
      },
      },
      mounted() {
			  this.getUsers();
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

</style>
