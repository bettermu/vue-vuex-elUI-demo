var Mock = require('mockjs')
var Random = Mock.Random
var dataArr=[]

Mock.Random.extend({
  productclass:function(){
    let classes=['shiliu','songzi','huotui','other']
    return this.pick(classes)
  }
})

for(var i=0;i<5;i++){
  dataArr.push(Mock.mock({
    title:Mock.Random.ctitle(),
    name:Mock.Random.cname(),
    province:Mock.Random.province(),
    productclass:Mock.Random.productclass()
  }))
}

var data = Mock.mock({
  // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
  'list|1-10': [{
    // 属性 id 是一个自增数，起始值为 1，每次增 1
    'id|+1': 1
  }]
})
// 输出结果
console.log(JSON.stringify(dataArr, null,4))  //4的值代表缩进，格式化
