<template>
  <d2-container>
    <template slot="header">Page 5 header</template>
    <!-- <button v-on:click="toggle">toggle</button>
    <a v-if="isPartA">partA</a>
    <a v-else>no data</a> -->
    <select v-model="selection">
      <option v-for="item in selectionOption" :value="item.value">{{ item.text }}</option>
    </select>
    {{ selection }}
    <input type="text" v-model="myVal"></input>
    <com-a :my-value="myVal" @my-event="getMyEvent"></com-a>
    {{ myVal}}

    <a v-on:click="toggle" >
      <a v-if="isPartA"><img src="./start.jpg" width="30" height="30"/></a>
      <a v-else><img src="./stop.jpg" width="30" height="30"/></a>
    </a>
    <!-- <a v-if="isPartA"><img src="./start.jpg" width="30" height="30"/></a> -->
    <!-- <a v-else><img src="./stop.jpg" width="30" height="30"/></a> -->

    <div class="toolbar">
      <el-col :span="24" class="toolbar-title">黑名单列表</el-col>
      <hr/>
       <el-form :model="formData" size="mini" label-position="left" label-width="70px">
                <el-row :gutter="2">
                  <el-col :span="3">
                    <el-form-item  label="机构编号">
                            <el-input v-model="mainForm.id"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="3">
                    <el-form-item  label="机构名称">
                      <el-input v-model="mainForm.name"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="3">
                    <el-form-item  label="机构名称">
                      <el-input v-model="mainForm.name"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="3">
                    <el-form-item  label="机构名称">
                      <el-input v-model="mainForm.name"></el-input>
                    </el-form-item>
                  </el-col>  
                  <el-col :span="3">
                    <el-form-item  label="机构名称">
                      <el-input v-model="mainForm.name"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="2">
                  <el-form-item>
                  <el-button type="primary" class="toolbar-button" @click="search(formData)">查询</el-button>
                  </el-form-item>
                  </el-col>
                  <el-col :span="2">
                  <el-form-item>
                  <el-button type="primary" class="toolbar-button" >重置</el-button>
                  </el-form-item> 
                  </el-col>                                                                       
                </el-row>
      </el-form>
    </div>
    <h1>{{ totalprice }}111</h1>
    <apple></apple>
    <banana></banana>

    <template slot="footer">footer</template>
  </d2-container>
</template>

<script>
import apple from './apple'
import banana from './banana'

export default {
  components: {
    apple,
    banana
  },
  computed: {
    totalprice () {
      return this.$store.state.totalprice
    }
  },
  data (){
    return {
           mainForm: {
              id: '',
              name: '',
              type:  '',
              callcenter:'',
              code: '',
              desc: ''
            },      
     formData: {
        name: '',
        telephone: '',
        time: '',
        person: ''
      },  
        sizeForm: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },          
      myVal: '',
      selectionOption: [
        {
          text: "apple",
          value: "0"
        },
        {
          text: "banana",
          value: "1"
        }
      ],
      selection: '',
      isPartA: true,
      myVal: '',
    }
  },
      watch: {
        myVal(val, oldVal){
          console.log(val, oldVal)
        }
      },  
  methods: {
    toggle() {
      this.isPartA = !this.isPartA
  },
   getMyEvent(hello) {
     console.log('my event' + hello)
   }
}
}
</script>
<style>
.toolbar {
	background: #f2f2f2;
	padding: 10px 10px 0 10px;
	border:0;
  margin-top: 10px;
  margin-left: -5px;
  margin-bottom: -10px;
}
.toolbar-title {
  font-size:16px;
  font-weight:bold;
  margin-top: -5px;
  margin-bottom: 3px;
  padding: 0;
}
</style>
