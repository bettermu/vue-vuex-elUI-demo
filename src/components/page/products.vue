<template>
  <div class="container">
    <el-row>
      <el-col class="menu-box" :span="6">
        <p></p>
        <el-menu
          default-active="$route.path"
          router
          class="menu"
          background-color="#fff"
          text-color="#267943"
          active-text-color="#000"
          >
          <el-menu-item v-for="(item,index) in productclass"
            :index="'/product/'+item.class"
            :key="'/product/'+item.class"
            v-text="item.name">
          </el-menu-item>
        </el-menu>
      </el-col>
      <!--右侧主要内容区域-->
      <el-col class="right-row" :span="18">

        <transition name="el-zoom-in-center">
          <router-view :key="key"></router-view>
        </transition>

      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      productclass: [
        {
          class: "all",
          name: "全部商品"
        },
        {
          class: "pomegranate",
          name: "石榴"
        },
        {
          class: "pine",
          name: "松子"
        },
        {
          class: "ham",
          name: "火腿"
        },
        {
          class: "other",
          name: "其他商品"
        }
      ]
    };
  },
  computed: {
    key() {
      return this.$route.params.class + new Date();
    }
  },
  methods: {}
};
</script>

<style scoped>
.menu {
  position: fixed;
  width: 200px;
  top: 150px;
  left: 50px;
  box-shadow: 0 0 6px #ccc;
}
.is-active {
  background: #669966 !important;
  /* border-bottom: 3px solid #66CC00 !important; */
  color: #fff !important;
  font-weight: bold !important;
}
@media screen and (max-width: 767px) {
  .menu {
    position: fixed;
    width: 25%;
    top: 100px;
    left: 5px;
    box-shadow: 0 0 6px #ccc;
  }
  .is-active {
    background: #669966 !important;
    /* border-bottom: 3px solid #66CC00 !important; */
    color: #fff !important;
    font-weight: bold !important;
  }
}
</style>

