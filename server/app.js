

/**
 * author:bettermu
 * date：2018-1-31
 * email:1113783908@qq.com
 */
/*
//引入各种包
const express=require('express');
const formidable=require('formidable');

//DB.js  大神封装好的库
const DB=require('../lib/DB');

//数据库地址和集
let dburl='mongodb://localhost:27017/learn'
let collection='users'

const mondb=new DB(dburl,collection)

//解析传过来的数据
const form = new formidable.IncomingForm()

const app=express();
app.use(express.static('./dist'))

//注册接口
app.post('/regin',(req,res)=>{
  form.parse(req,(err,fields,files)=>{
    let obj={
      username:fields.username,
      password:fields.password,
      tel:fields.tel,
      email:fields.email,
      name:fields.name,
      time:new Date()
    }
    //把数据插入到数据库中，表示注册成功，并把传过来的数据返回方便登录
    mondb.insert(obj).then(result=>{
      res.send(obj)
    })
  })
})


//登录接口
app.post('/login',(req,res)=>{
  form.parse(req,(err,fields,files)=>{
    let user={
      username:fields.username,
      password:fields.password
    }

    //数据库查询
    mondb.query(user).then(result=>{
      res.send(result)
    })
  })
})

app.listen(8088);
console.log('ok')

*/


/**
 * author:bettermu
 * date：2018-2-7
 * email:1113783908@qq.com
 */

const express = require('express')
const logger = require('morgan')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

//连接数据库
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/learn', { useMongoClient: true })
const connection = mongoose.connection
connection.on('error', err => {
  if (err) {
    console.log(err)
  }
})

connection.on('open', () => {
  console.log('opened MongoDB')
})

//路由
const route = require('./routes/route')
//app
const app = express()

//middlewares
//日志记录
app.use(logger('dev'))

//body-parser
app.use(bodyParser.json())

//routes
const base = ''
app.use(base, route)

//catch 404 err and then to err handler
app.use((req, res, next) => {
  const err = new Error('Not Found 404')
  err.status = 404
  next(err)
})

// err handler
app.use((err, req, res, next) => {
  const error = app.get('env') === 'development' ? err : {}
  const status = err.status || 500
  res.status(status).json({
    error: {
      message: error.message
    }
  })
  console.error(err)
})

//监听端口
const port = app.get('port') || 8088
app.listen(port, () => {
  console.log('your server are listening at localhost:' + port)
})
