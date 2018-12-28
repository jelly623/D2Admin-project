<template>
  <d2-container>
    <template slot="header">Page 3 header</template>
    
        引入输的组件
      <el-container style="height: 500px; border: 1px solid #eee">  
        <el-aside width="300px" style="padding: 15px;">
          <el-tree
              ref="eventCategoryTree"
              :data="eventCategoryTree"
              :props="defaultProps"
              node-key="id"
              highlight-current
              default-expand-all
              :render-content="renderContent"
              :expand-on-click-node="false">
          </el-tree>
        </el-aside>

        <!--新增事件节点分类弹窗-->
        <el-dialog
          title="新增事件分类"
          width="25%"
          class="add-event-dialog"
          :visible.sync="addEventdialogVisible"
          size="tiny">
          <el-form ref="addEventForm" :model="addEventForm" :rules="addEventNodeRules">
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


        <el-container>
        <el-main>
            内容区域
          <div>
            <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
              <el-row :gutter="20">
                <el-col :span="11">
                  <el-form-item
                    label="机构类型"
                    prop="age"
                    :rules="[
                      { required: true, message: '机构类型不能为空'},
                      { type: 'number', message: '机构类型必须为数字值'}
                    ]"
                  >
                    <el-input type="age" v-model.number="formLabelAlign.age" autocomplete="off"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="11">
                  <el-form-item label="机构名称">
                    <el-input v-model="formLabelAlign.region"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="11">
                  <el-form-item label="机构类型">
                    <el-input v-model="formLabelAlign.type"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="11">
                  <el-form-item label="客服中心">
                    <el-input v-model="formLabelAlign.client"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="11">
                  <el-form-item label="出局号">
                    <el-input v-model="formLabelAlign.outNum"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="18">
                  <el-form-item label="活动形式">
                    <el-input type="textarea" v-model="formLabelAlign.desc"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </el-main>
      </el-container>
    </el-container>

    <template slot="footer">footer</template>
  </d2-container>
</template>

<script>
import TreeRender from './tree_render.vue';
export default {
  name: '',
  data() {
      return {
        filterText: '',
        labelPosition: 'right',
        formLabelAlign: {
          age: '',
          region: '',
          type: '',
          client: '',
          outNum: '',
          desc: ''
        },
          //树组件的数据
        eventCategoryTree: [
          {
            id: 1,
            label: '一级 1',
            addAble: true,  //根据后台给的是否可添加节点，也可以根据当前的node节点自行判断
            delAble: false,  //根据后台给的是否可删除节点，也可以根据当前的node节点自行判断
            parentId: '',
            children: [
              {
              id: 11,
              label: '二级 1-1',
              addAble: true,
              delAble: true,
              parentId: '1',
              children: [
                {
                  id: 111,
                  label: '三级 1-1',
                  addAble: true,
                  delAble: true,
                  parentId: '11',
                }  
              ]
              },{
              id: 12,
              label: '二级 2-1',
              addAble: true,
              delAble: true,
              parentId: '1',
              },{
              id: 13,//6
              label: '二级 2-2',
              addAble: true,
              delAble: true,
              parentId: '1',
              },
            ]
          },
          {
            id: 2,
            label: '一级 2',
            addAble: true,  //根据后台给的是否可添加节点，也可以根据当前的node节点自行判断
            delAble: false,  //根据后台给的是否可删除节点，也可以根据当前的node节点自行判断
            parentId: '',
            children: [
              {
              id: 21,
              label: '二级 1-1',
              addAble: true,
              delAble: true,
              parentId: '2',
              },{
              id: 22,
              label: '二级 2-1',
              addAble: true,
              delAble: true,
              parentId: '2',
              },{
              id: 23,
              label: '二级 2-2',
              addAble: true,
              delAble: true,
              parentId: '2',
              },
            ]
          }
        ],
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
  props: ['NODE', 'DATA', 'STORE'],
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
        }
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
        //   .then((res) => {
        //     if (res.statusCode === 200) {
        //       children.splice(index, 1);
        //       this.$message({
        //         message: res.messages[0],
        //         type: 'success'
        //       });
        //     }
        //   });
        children.splice(index, 1);
        this.$message({
          message: res.messages[0],
          type: 'success'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
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
            delAble: true,  //根据后台给的是否可删除节点，也可以根据当前的node节点自行判断
          }
          // this.$http('post', '/api/***/****', {queryParams: dataPost})
          //   .then((res) => {
          //     console.log('请求成功');
          //     if (res.statusCode === 200) {
          // let result = res.data;
          // /*点击弹窗的确定按钮可以得到输入的数据，作为新的节点名称插入*/
          // /*如果没有子节点，就创建一个子节点插入*/
          // if (!this.triggerCurrenNodeData.children) {
          //   this.$set(this.triggerCurrenNodeData, 'children', []);
          // };
          // //如果已有子节点，就把返回的数据push进去，插入到树形数据中
          // this.triggerCurrenNodeData.children.push(result);
          //       /*关闭弹窗，重置输入框*/
          //       this.addEventdialogVisible = false;
          //       this.$refs[formname].resetFields();
          //       /*刷新树形菜单*/
          //       //this.getDictionarytTree();
          //     }
          //   })
          //   .catch((e) => {
          //     console.log('请求失败',e)
          //   })

          let result = dataPost;
          /*点击弹窗的确定按钮可以得到输入的数据，作为新的节点名称插入*/
          /*如果没有子节点，就创建一个子节点插入*/
          if (!this.triggerCurrenNodeData.children) {
            this.$set(this.triggerCurrenNodeData, 'children', []);
          };
          //如果已有子节点，就把返回的数据push进去，插入到树形数据中
          this.triggerCurrenNodeData.children.push(result);
          /*关闭弹窗，重置输入框*/
          this.addEventdialogVisible = false;
          this.$refs[formname].resetFields();
        } else {
          console.log('验证未通过');
          return false;
        }
      });
    },
  },

  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val);
    }
  },
}
</script>
<style>
  
</style>
