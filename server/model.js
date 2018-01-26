const mongoose = require('mongoose')

// 链接mongodb
const DB_URL = 'mongodb://127.0.0.1:27017/imooc'

mongoose.Promise = global.Promise
mongoose.connect(DB_URL)
mongoose.connection.on('connected', () => {
  console.log('mongo connect success')
})

const models = {
  user: {
    user: {
      type: String,
      require: true
    },
    pwd: {
      type: String,
      require: true
    },
    type: {
      type: String,
      require: true
    },
    avatar: String, // 头像
    desc: String, // 简介
    title: String, // 职位名
    company: String, // boss onlt
    money: String // boss only
  }
}

for (let m in models) {
  mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
  getModel(name) {
    return mongoose.model(name)
  }
}
