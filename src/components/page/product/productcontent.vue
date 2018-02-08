<template>
  <div>
    <h1>productcontent.vue</h1>
    <p>{{$route.params.class}}</p>
    <p>{{$route.params.productname}}</p>
    <div>
      <h2 v-text="productdetail.productname"></h2>
      <p>价格：{{productdetail.productprice}}</p>
      <p>销量：{{productdetail.productsells}}</p>
      <img :src="productdetail.productimage" alt="">
      <p>{{productdetail.productintro}}</p>
    </div>
  </div>
</template>
<script>
import { GetProduct } from "../../../api/api";
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["productdetail"])
  },
  mounted() {
    let params = {
      productname: this.$route.params.productname,
      productclass: this.$route.params.class
    };
    //console.log(params)
    GetProduct(params).then(res=>{
      //console.log(res.data.productdetail);
      this.$store.dispatch('getProductDetail',res.data)
    })
  }
};
</script>
