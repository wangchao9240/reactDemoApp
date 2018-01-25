const express = require('express')
const Router =  express.Router()
const model = require('./model')
const User = model.getModel('user')

Router.get('/list', async (req, res) => {
  try {
    const users = await User.find({}).exec()
    return res.json(users)
  } catch (err) {
    return res.json({ code: 1, msg: `后端出错了， 错误信息${err}` })
  }
})

Router.post('/register', async (req, res) => {
  const data = req.body
  try {
    const user = await User.findOne({ user: data.user }).exec()
    if (user) return res.json({ code: 1, msg: '用户名重复' })
    const newUser = await User.create({ ...data })
    return res.json({ code: 0 })
  } catch (err) {
    return res.json({ code: 1, msg: `后端出错了， 错误信息${err}` })
  }
})

Router.get('/info', (req, res) => {
  // 用户有没有cookie
  res.json({
    code: 0
  })
})

module.exports = Router