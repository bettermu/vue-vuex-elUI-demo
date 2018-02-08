<template>
  <el-row class="header">
    <!-- 左边logo -->
    <el-col :span="4" class="logo">
      <img @click="tohome" src="../assets/logo.png" alt="">
    </el-col>
    <!-- 中间导航区域 -->
    <el-col class="main" :span="16">
      <el-menu
        :default-active="$route.path"
        class="menu"
        router
        mode="horizontal"
        @select="handleSelect"
        active-text-color="#000">
        <template
          v-for="route in $router.options.routes"
          v-if="!route.hidden">
          <!--循环没有children的路由-->
          <el-menu-item
            v-if="!route.hasChild"
            :key="route.path"
            :index="route.path">
            <i :class="route.class"></i>
            {{route.name}}
          </el-menu-item>

          <!--循环有children的路由-->
          <el-submenu v-else :index="route.path" :key="route.path">
            <template slot="title">{{route.name}}</template>
            <el-menu-item
              v-for="child in route.children"
              :index="child.path"
              :key="child.path">
              {{child.name}}
            </el-menu-item>
          </el-submenu>
        </template>
      </el-menu>
    </el-col>
    <!-- 右边用户信息以及登陆注册 -->
    <el-col :span="4" class="user">
      <el-button-group v-if="!logined">
        <el-button class="button" @click.native="tologin" type="danger" size="small" round >login</el-button>
        <el-button class="button" @click.native="toregin" type="success" size="small" round >regin</el-button>
      </el-button-group>
      <div v-else>
        <el-dropdown>
          <img :src="LoginedUser.avatar" class="avatar" alt="">
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="tomy" v-text="LoginedUser.username"></el-dropdown-item>
            <el-dropdown-item @click.native="tosend">我的工作台</el-dropdown-item>
            <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

      </div>
    </el-col>

  </el-row>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters([
      'logined',
      'LoginedUser'
    ])

    //这样的方式太过繁琐！！！！
    //logined() {
    //  return this.$store.state.logined;
    //},
    //Username() {
    //  return this.$store.state.LoginedUser.username;
    //},
    //Useravatar() {
    //  return this.$store.state.LoginedUser.avatar;
    //}
  },
  mounted() {
    //从sessionStorage取出用户数据;
    let user = sessionStorage.getItem("user");
    //判断用户数据是否存在;
    if (user) {
      //如果用户存在就变为登录状态显示用户信息;
      this.$store.dispatch("login");

    }
  },
  methods: {
    handleSelect(key) {
      //console.log("菜单选择之后的回调操作");
      if(!this.logined && (key==="/manager/my" ||key==="/manager/send"||key==="/manager/history" )){
        this.$notify({
          title:'很抱歉',
          message:'请您登录后再访问此页面！',
          type:'warning',
          offset:200
        })
      }
    },
    tomy() {
      this.$router.push("/manager/my");
    },
    tosend() {
      this.$router.push("/manager/send");
    },
    logout() {
      this.$alert('确定要退出登录吗？',{
        title:'',
        showConfirmButton:true,
        type:'warning',
        showCancelButton:true,
        callback:(action,instance)=>{  //箭头函数绑定上下文this
          if(action==='confirm'){
            this.$message({
              type:'success',
              message:'退出成功！'
            })
            sessionStorage.removeItem("user");
            this.$store.dispatch("logout");
            this.$router.push("/login");
          }else{

          }
        }
      })

    },
    tohome() {
      this.$router.push("/");
      console.log("home");
    },
    tologin() {
      this.$router.push("/login");
    },
    toregin() {
      this.$router.push("/regin");
    }
  }
};
</script>
<style scoped>
.header {
  width: 100%;
  margin: 0;
  background: #fff;
  position: fixed;
  top: 0;
  left: 0;
  box-shadow: 0 0 25px #666;
}
.logo img {
  width: 60px;
  height: 60px;
  cursor: pointer;
}
.button {
  margin: 15px 0;
}
.avatar {
  height: 40px;
  width: 40px;
  border-radius: 20px;
  margin: 10px 0;
  cursor: pointer;
}


</style>
