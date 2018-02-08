
const state={
  productlist:'',
  productdetail:''
}

const getters={
  productlist:state=>state.productlist,
  productdetail:state=>state.productdetail
}

const mutations={

  GET_PRODUCT_DATA(state,data){
    state.productlist=data.productlist
  },

  GET_PRODUCT_DETAIL(state,data){
    state.productdetail=data.productdetail
  }
}

const actions={
  getProductData({commit},data){
    commit('GET_PRODUCT_DATA',data)
  },

  getProductDetail({commit},data){
    commit('GET_PRODUCT_DETAIL',data)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
