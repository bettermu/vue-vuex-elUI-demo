
import axios from 'axios'
let base = '/learn'

//注册接口
export const ReginUser = params => {
  return axios.post(`${base}/regin`, params)
}

//登录接口
export const LoginUser = params => {
  return axios.post(`${base}/login`, params)
}

//获取商品列表接口
export const GetProductList = params => {
  return axios.get(`${base}/productlist`, { params: params })
}

//获取查询商品接口
export const SearchProductList = params => {
  return axios.get(`${base}/search`, { params: params })
}

//获取商品详情接口
export const GetProduct = params => {
  return axios.get(`${base}/product`, { params: params })
}
