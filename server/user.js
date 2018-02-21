const express = require('express')
const Router =  express.Router()
const model = require('./model')
const User = model.getModel('user')
const Chat = model.getModel('chat')
const utils = require('utility')
const _filter = { pwd: 0, __v: 0 }

Router.get('/list', async (req, res) => {
  const { type } = req.query
  try {
    const users = await User.find({ type }).exec()
    return res.json({ code: 0, data: users })
  } catch (err) {
    return res.json({ code: 1, msg: `后端出错了， 错误信息${err}` })
  }
})

Router.get('/getmsglist', async (req, res) => {
  const { userid } = req.cookies
  try {
    // {'$or': [{ from: user, to: user }]}
    const msgs = await Chat.find({}).exec()
    return res.json({ code: 0, msgs: msgs })
  } catch (err) {
    return res.json({ code: 1, msg: `后端出错了，错误信息${err}` })
  }
})

Router.post('/update', async (req, res) => {
  const { userid } = req.cookies
  if (!userid) return res.json({ code: 1 })
  const { body } = req
  try {
    const user = await User.findByIdAndUpdate(userid, body).exec()
    const resData = Object.assign({}, {
      user: user.user,
      type: user.type
    }, body)
    return res.json({ code: 0, data: resData })
  } catch (err) {
    return res.json({ code: 1, msg: `后端出错了， 错误信息${err}` })
  }
})

Router.post('/login', async (req, res) => {
  const { user, pwd } = req.body
  try {
    const findUser = await User.findOne({ user: user, pwd: md5Pwd(pwd) }, _filter).exec()
    if (!findUser) return res.json({ code: 1, msg: '用户名或密码错误' })
    else {
      res.cookie('userid', findUser._id)
      return res.json({ code: 0, data: findUser })
    }
  } catch (err) {
    return res.json({ code: 1, msg: `后端出错了， 错误信息${err}` })
  }
})

Router.post('/register', async (req, res) => {
  const data = req.body
  try {
    const findUser = await User.findOne({ user: data.user }).exec()
    if (findUser) return res.json({ code: 1, msg: '用户名重复' })

    const userModel = new User(Object.assign(data, { pwd: md5Pwd(data.pwd) }))
    const newUser = await userModel.save()
    const { user, type, _id } = newUser
    res.cookie('userid', _id)
    return res.json({ code: 0, data: { user, type, _id } })
  } catch (err) {
    return res.json({ code: 1, msg: `后端出错了， 错误信息${err}` })
  }
})

Router.get('/info', async (req, res) => {
  // 用户有没有cookie
  const { userid } = req.cookies
  if (!userid) return res.json({ code: 1 })
  try {
    const findUser = await User.findOne({ _id: userid }, _filter).exec()
    return res.json({ code: 0, data: findUser })
  } catch (err) {
    return res.json({ code: 1, msg: `后端出错了，错误信息${err}` })
  }
})

const md5Pwd = (pwd) => {
  const salt = 'missu'
  return utils.md5(utils.md5(pwd + salt))
}

module.exports = Router
