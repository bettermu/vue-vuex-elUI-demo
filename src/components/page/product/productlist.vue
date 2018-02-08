<template>
  <div>
    <el-row>
      <el-col :span="22">
        <el-input
          type="text"
          class="el-input"
          placeholder="请输入商品名称"
          v-model="searchName">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </el-col>
      <el-col :span="2">
        <el-button
          type="primary"
          @click="search">
          搜索
        </el-button>
      </el-col>
    </el-row>

    <div class="title">
      <h1 v-text="$route.params.class"></h1>
    </div>
    <ul>
      <template v-for="(item,index) in productlist">
        <el-row class="item" :key="item.productname">
          <router-link
            :to="'/product/'+item.productclass+'/'+item.productname"
            :key="item.productname">
            <el-col :span="8">
              <img :src="item.productimage" alt="">
            </el-col>
          </router-link>
          <el-col :span="16">
            <h3>{{item.productname}}</h3>
            <p class="intro">{{item.productintro}}</p>
            <router-link
              :to="'/product/'+item.productclass+'/'+item.productname"
              :key="item.productname">
              <p class="link">了解详情...</p>
            </router-link>
            <p class="sellnum">累计发货<span>{{item.productsells}}</span>件</p>
            <p class="price">全国包邮价<span>{{item.productprice}}</span>元</p>
          </el-col>
        </el-row>
      </template>
    </ul>
  </div>
</template>

<script>
import { GetProductList,SearchProductList } from "../../../api/api";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      searchName: ""
    };
  },
  computed: {
    ...mapGetters(["productlist"])
  },
  mounted() {
    let params = null;
    if (this.$route.params.class === "all") {
      params = "";
    } else {
      params = this.$route.params.class;
    }
    GetProductList(params).then(res => {
      this.$store.dispatch("getProductData", res.data);
    });
  },
  methods: {
    search() {
      //console.log('search')
      this.loading = true;
      let searchparams = this.searchName;
      SearchProductList(searchparams).then(res => {
        this.loading = false;
        if (res.data.code === 200) {
          //console.log(res.data.productlist);
          this.$store.dispatch("getProductData",res.data)
        } else {
          this.$notify({
            title: "很抱歉",
            message: res.data.msg,
            type: "warning",
            offset: 200
          });
          this.$router.push("/product/all");
        }
      });
    }
  }

  //监听路由变化
  //watch: {
  //  $route() {
  //    let params = null;
  //    if (this.$route.params.class === "all") {
  //      params = "";
  //    } else {
  //      params = this.$route.params.class;
  //    }
  //    GetProductList(params).then(res => {
  //      this.$store.dispatch("getProductData", res.data);
  //    });
  //  }
  //}
};
</script>

<style scoped>
  a {
    text-decoration: none;
    color:#999;
  }
  a:hover {
    color:#669966;
  }
  .title {
    height:60px;
    border-left:4px solid #669966;
    margin:0 15px;
    background-color:#f2f3f2;
    text-align:left;
    padding-left:20px;
    line-height:60px;
  }
  ul {
    padding:0;
    margin:0 15px;
  }
  .item {
    margin:25px 0;
    box-shadow: 0 0 30px #ccc;
    border-radius:15px;
  }
  .item:hover {
    background:#eee;
  }
  img {
    width:100%;
    max-width:500px;
    padding:10px;
    border-radius:15px;
  }
  .intro,.price,.sellnum {
    margin:0 15px 0 25px;
    text-align:left;
    color:#666;
    line-height:2;
    letter-spacing:1.2;
  }
  .link {
    text-align:right;
    font-size:16px;
    margin-right:40px;
  }
  .price,.sellnum {
    color:gray;
  }
  .price span {
    color:red;
    font-size:25px;
  }
</style>



