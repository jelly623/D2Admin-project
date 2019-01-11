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
    
    
    <template slot="footer">footer</template>
  </d2-container>
</template>

<script>
// import comA from './a'

export default {
  // components: {
  //   comA
  // },
  data (){
    return {
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

</style>
