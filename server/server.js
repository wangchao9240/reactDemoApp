const express = require('express')
const app = express()
const mongoose = require('mongoose')

// 链接mongodb
const DB_URL = 'mongodb://127.0.0.1:27017/imooc'
mongoose.connect(DB_URL)
mongoose.connection.on('connected', () => {
  console.log('mongo connect success')
})

const User = mongoose.model('user', new mongoose.Schema({
  user: {
    type: String,
    require: true
  },
  age: {
    type: Number,
    require: true
  }
}))

User.create({
  user: 'xiaohua',
  age: 10
}, (err, doc) => {
  if (!err) console.log(doc)
  else console.log(err)
})

// User.remove({ age: 18 }, (err, doc) => {
//   console.log(doc)
// })

User.update({ user: 'xiaohua' }, { '$set': { age: 26 } }, (err, doc) => {
  console.log(doc)
})

app.get('/data', (req, res) => {
  User.find({}, (err, users) => {
    res.json(users)
  })
})

// app.get('/delete', () )

app.listen(9093, () => {
  console.log('node app start at port 9093')
})