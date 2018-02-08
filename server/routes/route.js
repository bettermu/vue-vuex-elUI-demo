

const express = require('express')
const router = require('express-promise-router')()


const Controller = require('../controllers/control')

//注册
router.route('/regin')
  .post(Controller.regin)

//登录
router.route('/login')
  .post(Controller.login)

module.exports = router
