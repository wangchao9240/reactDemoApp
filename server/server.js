const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

// work width express
const server = require('http').Server(app)
const io = require('socket.io')(server)

const model = require('./model')
const Chat = model.getModel('chat')
// const utils = require('utility')

io.on('connection', (socket) => {
  socket.on('sendmsg', async (data) => {
    try {
      const { from, to, msg } = data
      const chatId = [from, to].sort().join('_')
      const chatModel = new Chat({ chatId, from, to, content: msg })
      const newChat = await chatModel.save()
      console.log('newChat-->', newChat)
      io.emit('recvmsg', Object.assign({}, newChat))
    } catch (err) {
      console.log(err)
    }
  })
})

const userRouter = require('./user')

app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user', userRouter)

server.listen(9093, () => {
  console.log('node app start at port 9093')
})
