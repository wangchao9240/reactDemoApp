const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

// work width express
const server = require('http').Server(app)
const io = require('socket.io')(server)
// const utils = require('utility')

io.on('connection', (socket) => {
  socket.on('sendmsg', (data) => {
    io.emit('recvmsg', data)
  })
})

const userRouter = require('./user')

app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user', userRouter)

server.listen(9093, () => {
  console.log('node app start at port 9093')
})
