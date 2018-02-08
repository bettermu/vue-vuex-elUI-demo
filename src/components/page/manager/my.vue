<template>
  <div>
    <h1>my.data</h1>
    <h5>我的name:{{LoginedUser.username}}</h5>
    <img :src="LoginedUser.avatar" alt="">
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  data() {
    return {

    };
  },
  computed:{
    ...mapGetters([
      'logined',
      'LoginedUser'
    ])
  },
  mounted() {
    //从内存中取出数据
    let user = sessionStorage.getItem("user");
    //如果user存在
    if (user) {
      this.$store.dispatch('login')
    }
  }
};
</script>
