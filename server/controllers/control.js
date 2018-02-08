
const { User, Product } = require('../models/model')
const formidable = require('formidable')
const form = new formidable.IncomingForm()

module.exports = {
  //注册
  regin: async (req, res, next) => {
    console.log(req.body);
    const newuser = new User(req.body)
    const adduser = await newuser.save()
    res.status(200).send({
      adduser: adduser
    })
  },
  //登录
  login: async (req, res, next) => {
    console.log(req.body)
    const user = await User.findOne(req.body)

    res.status(200).json({
      code: 200,
      msg: '登录成功',
      user: user
    })
  }
}
