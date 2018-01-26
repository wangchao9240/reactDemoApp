const express = require('express')
const Router =  express.Router()
const model = require('./model')
const User = model.getModel('user')
const utils = require('utility')

Router.get('/list', async (req, res) => {
  try {
    const users = await User.find({}).exec()
    return res.json(users)
  } catch (err) {
    return res.json({ code: 1, msg: `后端出错了， 错误信息${err}` })
  }
})

Router.post('/login', async (req, res) => {
  const { user, pwd } = req.body
  try {
    const findUser = await User.findOne({ user: user, pwd: md5Pwd(pwd) }).exec()
    if (!findUser) return res.json({ code: 1, msg: '用户名或密码错误' })
    else return res.json({ code: 0, data: findUser })
  } catch (err) {
    return res.json({ code: 1, msg: `后端出错了， 错误信息${err}` })
  }
})

Router.post('/register', async (req, res) => {
  const data = req.body
  try {
    const user = await User.findOne({ user: data.user }).exec()
    if (user) return res.json({ code: 1, msg: '用户名重复' })
    const newUser = await User.create(Object.assign(data, { pwd: md5Pwd(data.pwd) }))
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

const md5Pwd = (pwd) => {
  const salt = 'missu'
  return utils.md5(utils.md5(pwd + salt))
}

module.exports = Router
