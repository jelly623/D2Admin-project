<template>
<div>
    <h1>{{ msg }}</h1>
    <button @click="addone">add one</button>
    <button @click="minusone">minusone</button>
</div>
</template>

<script>
// import comA from './a'

export default {
  // components: {
  //   comA
  // },
  data (){
    return {
      msg: 'Im a banana',
      price: 15,
    }
  },
  methods: {
    addone (){
      this.$store.commit('increment',this.price)
    },
    minusone (){
      this.$store.commit('decrement',this.price)
    },    
  }
}
</script>
<style>
/* .toolbar {
	background: #f2f2f2;
	padding: 10px 10px 0 10px;
	border:0;
  margin-top: -10px;
  margin-left: -5px;
  margin-bottom: -10px;
}
.toolbar-title {
  font-size:16px;
  font-weight:bold;
  margin-top: -5px;
  margin-bottom: 3px;
  padding: 0;
} */
</style>
