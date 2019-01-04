<template>
<div>
    <d2-container>
        <el-container>
            <el-header class="header">
            <button @click="collapseStatus">               
                <i class="fa fa-reorder" aria-hidden="true"></i>
            </button>                
            <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
                <el-radio-button :label="false">展开</el-radio-button>
                <el-radio-button :label="true">收起</el-radio-button>
            </el-radio-group> -->
            </el-header>
        <el-container>
            <el-aside
                width="auto"
                @mouseenter.native="collapseOpen"
                @mouseleave.native="collapseClose">
            </el-aside>
            <div class="left">
                <el-menu class="el-menu-vertical" @open="handleOpen" @close="handleClose" :collapse="isCollapse" style="float:left;">
                    <!-- <el-submenu index="1">
                        <template slot="title">
                        <i class="el-icon-location"></i>
                        <span slot="title">导航一</span>
                        </template> 
                      </el-submenu>                -->
                <!--树形控件-->
                <!-- <el-aside class="asideContainer" width="300px"  style="padding: 15px;"> -->
                <el-tree class="tree"
                    ref="eventCategoryTree"
                    :data="eventCategoryTree"
                    :props="defaultProps"
                    node-key="id"
                    highlight-current
                    default-expand-all
                    :render-content="renderContent"
                    :expand-on-click-node="false">
                </el-tree>
                </el-menu>            
            </div>
        <div class="right">
            <el-form ref="mainForm" :model="mainForm" label-position="right" label-width="80px" size="small" >
                <el-row :gutter="20">
                <el-col :span="11">
                    <el-form-item 
                    label="机构编号"
                    :rules="[
                            { required: true, message: '机构编号不能为空'},
                            { type: 'number', message: '机构编号必须为数字值'}
                            ]" >
                            <el-input v-model="mainForm.id"></el-input>
                        </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item 
                    label="机构名称"
                    :rules="[
                                { required: true, message: '机构名称不能为空'}
                            ]">
                    <el-input v-model="mainForm.name"></el-input>
                    </el-form-item>
                </el-col>
                </el-row>
                <el-row :gutter="20">
                <el-col :span="11">
                    <el-form-item label="机构类型" >              
                    <el-select v-model="mainForm.type" placeholder="请选择机构类型">
                        <el-option label="公司" value="company"></el-option>
                        <el-option label="部门" value="department"></el-option>
                    </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="客服中心">
                        <el-select v-model="mainForm.callcenter" placeholder="请选择类型">
                        <el-option label="是" value="yes"></el-option>
                        <el-option label="否" value="no"></el-option>
                        </el-select>
                    </el-form-item> 
                </el-col>
                </el-row>
                <el-row :gutter="20">
                <el-col :span="11">
                    <el-form-item label="出局号">
                    <el-input v-model="mainForm.code"></el-input>
                    </el-form-item>
                </el-col>
                </el-row>
                <el-row :gutter="20">
                <el-col :span="11">
                    <el-form-item label="机构描述">
                    <el-input :span="26" type="textarea" v-model="mainForm.desc"></el-input>
                    </el-form-item>
                </el-col>
                </el-row>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
                    <el-button @click="resetForm('ruleForm')">取消</el-button>
                </el-form-item>        
            </el-form>            
        </div>
          <!--新增事件节点分类弹窗-->
        <el-dialog
            title="新增事件分类"
            width="25%"
            class="add-event-dialog"
            :visible.sync="addEventdialogVisible"
            size="tiny">
            <el-form ref="addEventForm" :model="addEventForm">
            <el-form-item label="分类名称" prop="categoryName" >
                <el-input v-model="addEventForm.categoryName"></el-input>
            </el-form-item>
            <el-form-item label="分类标识" prop="categoryFlag">
                <el-input v-model="addEventForm.categoryFlag"></el-input>
            </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer" >
            <el-button @click="addEventFormCancleBtn('addEventForm')">取 消</el-button>
            <el-button type="primary" @click="addEventFormSubmitBtn('addEventForm')">确 定</el-button>
            </span>
        </el-dialog>

        </el-container>
        </el-container>
    </d2-container>
</div>
</template>
<script>
import TreeRender from './tree_render.vue';

  export default {
    data() {
        return {
            collapseBtnClick: false,
            isCollapse: false,
            mainForm: {
              id: '',
              name: '',
              type:  '',
              callcenter:'',
              code: '',
              desc: ''
            },      
            //树组件的数据
            eventCategoryTree: [
            {
                id: 1,
                icon:'el-icon-success',
                label: '航天信息股份有限公司',
                type:'公司',
                callcenter:'否',
                code:'37,38,39,40',
                desc:'航天信息股份有限公司',
                addAble: true,  //根据后台给的是否可添加节点，也可以根据当前的node节点自行判断
                delAble: false,  //根据后台给的是否可删除节点，也可以根据当前的node节点自行判断
                parentId: '',             
                children: [{
                  id: 4,
                  label: '总部',
                  addAble: true,
                  delAble: true,
                  parentId: '1',
                  children: [{
                    id: 10,
                    label: '总部呼叫中心',
                    type:'部门',
                    callcenter:'是',
                    code:'37,38,39,40',
                    desc:'总部呼叫中心',                    
                    addAble: true,
                    delAble: true,
                    parentId: '4',
                    },
                    {
                    id: 11,
                    label: '总部财务软件',
                    type:'部门',
                    callcenter:'否',
                    code:'37,38,39,40',
                    desc:'总部财务软件',                   
                    addAble: true,
                    delAble: true,
                    parentId: '4',
                    },
                    {
                    id: 12,
                    label: '总部防伪税控',
                    type:'部门',
                    callcenter:'否',
                    code:'37,38,39,40',
                    desc:'总部防伪税控', 
                    addAble: true,
                    delAble: true,
                    parentId: '4',
                    },]
                  },{
                  id: 5,
                  label: '金税产业本部',
                  type:'部门',
                  callcenter:'否',
                  code:'37,38,39,40',
                  desc:'金税产业本部',                   
                  addAble: true,
                  delAble: true,
                  parentId: '1',
                  }, {
                  id: 6,
                  label: '北爱',
                  type:'部门',
                  callcenter:'否',
                  code:'37,38,39,40',
                  desc:'北爱',                   
                  addAble: true,
                  delAble: true,
                  parentId: '1',
                },{
                  id: 7,
                  label: '技术研究院',
                  type:'部门',
                  callcenter:'否',
                  code:'37,38,39,40',
                  desc:'技术研究院',                   
                  addAble: true,
                  delAble: true,
                  parentId: '1',
                },{
                  id: 8,
                  label: '大象慧云',
                  type:'部门',
                  callcenter:'否',
                  code:'37,38,39,40',
                  desc:'大象慧云',                  
                  addAble: true,
                  delAble: true,
                  parentId: '1',
                },{
                  id: 9,
                  label: '金税',
                  type:'部门',
                  callcenter:'否',
                  code:'37,38,39,40',
                  desc:'金税',                   
                  addAble: true,
                  delAble: true,
                  parentId: '1',
                },]
            }],
            defaultProps: {
                children: 'children',
                label: 'label'
            },

            /*触发的当前的节点，放到全局，方便调用*/
            triggerCurrenNodeData:{},
            /*触发的当前节点*/
            triggerCurrenNode:{},
            /*新增事件弹窗的输入框数据*/
            addEventdialogVisible: false,
            addEventForm:{
            categoryName: '',
            categoryFlag: '',
            },
        }
    },

    methods: {     
        /*渲染函数*/
        renderContent(h, { node, data, store }) {
            let that = this;//指向vue
            return h(TreeRender,{
            props:{
                NODE: node,
                DATA: data,
                STORE: store,
            },
            on:{
                //新增
                Append: ((s,d,n) => that.appendEvent(s,d,n)),
                //删除节点
                Delete: ((s,d,n) => that.removeEvent(s,d,n)),
                //查看
                WatchInfo: ((s,d,n)=> that.changeMainRegion(s,d,n))
            }
            },

        );
        },
        /*树形控件添加节点，添加弹窗出现*/
        appendEvent(s,d,n) {
        this.addEventdialogVisible = true;
        this.triggerCurrenNodeData = d;
        this.triggerCurrenNode = n;
        },
        /*树形控件删除节点*/
        removeEvent(s,d,n) {
        const parent = n.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex(data => data.id === d.id);
        console.log(index,'索引')
        this.$confirm('确定要删除该节点吗？', '温馨提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            // this.$http('delete', `/url/****/****/${d.id}`,{queryParams: null})
            // .then((res) => {
            //     if (res.statusCode === 200) {
            //     children.splice(index, 1);
            //     this.$message({
            //         message: res.messages[0],
            //         type: 'success'
            //     });
            //     }
            // });
            children.splice(index, 1);
        }).catch(() => {
            this.$message({
            type: 'info',
            message: '已取消删除'
            });
        });
        },

        changeMainRegion(s,d,n) {
          console.log(d.id) 
          // this.addEventdialogVisible = true;
          this.mainForm.id = d.id;
          this.mainForm.name = d.label;
          this.mainForm.type = d.type;
          this.mainForm.callcenter = d.callcenter;
          this.mainForm.code = d.code;       
          this.mainForm.desc = d.desc;
        },

        /*节点新增，新增树形菜单事件分类弹窗，提交按钮*/
        addEventFormSubmitBtn(formname){
        this.$refs[formname].validate((valid) => {
            if (valid) {
            console.log('验证成功')
            /*获取当前input上输入的文字*/
            let dataPost={
                label: this.addEventForm.categoryName.trim(),
                id: this.addEventForm.categoryFlag.trim(),
                parentId: this.triggerCurrenNodeData.id,  //当前节点id
                depth: this.triggerCurrenNode.level, //当前节点层级
                addAble: true,  //根据后台给的是否可添加节点，也可以根据当前的node节点自行判断
                delAble: true,
            }
            // this.$http('post', '/api/***/****', {queryParams: dataPost})
            //     .then((res) => {
            //     console.log('请求成功');
            //     if (res.statusCode === 200) {
            //         let result = res.data;
            //         /*点击弹窗的确定按钮可以得到输入的数据，作为新的节点名称插入*/
            //         /*如果没有子节点，就创建一个子节点插入*/
            //         if (!this.triggerCurrenNodeData.children) {
            //         this.$set(this.triggerCurrenNodeData, 'children', []);
            //         };
            //         //如果已有子节点，就把返回的数据push进去，插入到树形数据中
            //         this.triggerCurrenNodeData.children.push(result);
            //         /*关闭弹窗，重置输入框*/
            //         this.addEventdialogVisible = false;
            //         this.$refs[formname].resetFields();
            //         /*刷新树形菜单*/
            //         //this.getDictionarytTree();
            //     }
            //     })
            //     .catch((e) => {
            //     console.log('请求失败',e)
            //     })
            let result = dataPost;
            if (!this.triggerCurrenNodeData.children) {
                    this.$set(this.triggerCurrenNodeData, 'children', []);
                    };
                    //如果已有子节点，就把返回的数据push进去，插入到树形数据中
                    this.triggerCurrenNodeData.children.push(result);
                    /*关闭弹窗，重置输入框*/
                    this.addEventdialogVisible = false;
                    this.$refs[formname].resetFields();
                    /*刷新树形菜单*/
                    //this.getDictionarytTree();
            } else {
            console.log('验证未通过');
            return false;
            }
        });
        },
    addEventFormCancleBtn(done) {
      this.addEventdialogVisible=false,
      this.$message({
        message: '取消新增节点',
        type: 'warning'
      })
      done()
    },
    // onSubmit() {
    //   console.log('submit!');
    //     },     
    onSubmit(s,d,n) {
      console.log(d.id);
          d.id = this.mainForm.id;
          d.label = this.mainForm.name;
          d.type = this.mainForm.type;
          d.callcenter = this.mainForm.callcenter;
          d.code = this.mainForm.code;       
          d.desc = this.mainForm.desc;
        }, 
               collapseStatus() {
                        this.collapseBtnClick = this.isCollapse;
                        this.isCollapse = !this.isCollapse;
                    },
                collapseOpen() {
                        if (this.collapseBtnClick) return;
                        this.isCollapse = true;
                    }
                 },
                collapseClose() {
                        if (this.collapseBtnClick) return;
                        this.isCollapse = true;
                }                    
    
  };
</script>
<style>
  .left {
     float: left;

  }
  .right {
     float: left;
     padding-top: 20px;
     padding-left: 10px;
     margin-left: 10px;
     border: 1px solid #a1c7e9;
     width: 90%;
  }
  .el-menu-vertical:not(.el-menu--collapse) {
    width: 300px;    
    /* min-height: 400px; */
  } 
 
  .tree {
      padding-left:30px;
      height:450px;
      border: 1px solid #a1c7e9;
      background-color:#f1f5fa;
  }
.header {
    /* background-color: red; */
    padding-top: 10px;
    padding-left: 25px;
    margin:-25px;
}
</style>
