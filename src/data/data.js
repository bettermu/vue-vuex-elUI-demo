import avatarLee from '../assets/avatar.jpg'
import avatarZhang from '../assets/avatar2.jpg'

import Mock from 'mockjs'

//模拟用户数据
const users = [
  {
    username: 'lytton',
    password: '123456',
    emial: '123@163.com',
    tel: '13344445555',
    name: '李小白',
    time: '2018-1-31',
    avatar: avatarLee
  },
  {
    username: 'zhangsan',
    password: '123456',
    emial: '321@163.com',
    tel: '13355554444',
    name: '张三',
    time: '2018-1-30',
    avatar: avatarZhang
  }]

//模拟商品数据
const products = []
Mock.Random.extend({
  productclass: function () {
    let classes = ['pomegranate', 'pine', 'ham', 'other']
    return this.pick(classes)
  }
})
for (let index = 0; index < 25; index++) {
  products.push(Mock.mock({
    productname: Mock.Random.ctitle(),
    productclass: Mock.Random.productclass(),
    'productprice|100-200': 1,
    productintro: Mock.Random.cparagraph(),
    productimage: "@image('200x200', '@hex()')",
    'productsells|20-700': 1,
    productselling: Mock.Random.boolean()
  }))
}

export { users, products }


