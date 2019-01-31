<template>
  <d2-container>
    <template slot="header">Page 1 header</template>
            Hello World  您好!
         <ul>
         <li v-for="user in users" :key="user"> 
            <h2>{{user.name}}</h2>  
            <h3>{{user.email}}</h3>
         </li>

         </ul>   

 
    <template slot="footer">footer</template>
  </d2-container>
</template>
<script>
import  { FindUserList } from '@/api/demo/UserInoAPI'
export default {
  name: 'page1',
  data(){
    return {
      users:''
    }
  },
  created() {
         FindUserList().then((data)=>{
this.users=data; 
          consoled.log(data);
        });
  }
}

</script>
