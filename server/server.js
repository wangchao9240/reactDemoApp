const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const path = require('path')

// work width express
const server = require('http').Server(app)
const io = require('socket.io')(server)

const model = require('./model')
const Chat = model.getModel('chat')
// const utils = require('utility')

const csshook = require('css-modules-require-hook/preset')
require('asset-require-hook')({
  extensions: ['png']
})

import React from 'react'
const { renderToNodeStream } = require('react-dom/server')
const { Provider } = require('react-redux')
const { createStore, applyMiddleware, compose } = require('redux')
const thunk = require('redux-thunk').default
const { StaticRouter } = require('react-router-dom')
const App = require('../src/app').default
const reducers = require('../src/reducer').default
const staticPath = require('../build/asset-manifest.json')

io.on('connection', (socket) => {
  socket.on('sendmsg', async (data) => {
    try {
      const { from, to, msg } = data
      const chatId = [from, to].sort().join('_')
      const chatModel = new Chat({ chatId, from, to, content: msg })
      const newChat = await chatModel.save()
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
app.use(function(req, res, next) {
  if (req.url.startsWith('/user/') || req.url.startsWith('/static/')) return next()
  const store = createStore(reducers, compose(
    applyMiddleware(thunk)
  ))

  res.write(`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta name="theme-color" content="#000000">
        <title>React App</title>
        <link rel="stylesheet" href="${staticPath['main.css']}" />
      </head>
      <body>
        <noscript>
          You need to enable JavaScript to run this app.
        </noscript>
        <div id="root">`)

  let context = {}
  const markupStream = renderToNodeStream((
    <Provider store={ store }>
      <StaticRouter
        location={ req.url }
        context={ context }
      >
        <App></App>
      </StaticRouter>
    </Provider>
  ))

  markupStream.pipe(res, { end: false })
  markupStream.on('end', () => {
    res.write(`</div>
        <script src="/${staticPath['main.js']}"></script>
      </body>
    </html>`)
    res.end()
  })

  // const pageHtml = `<!DOCTYPE html>
  //   <html lang="en">
  //     <head>
  //       <meta charset="utf-8">
  //       <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  //       <meta name="theme-color" content="#000000">
  //       <title>React App</title>
  //       <link rel="stylesheet" href="${staticPath['main.css']}" />
  //     </head>
  //     <body>
  //       <noscript>
  //         You need to enable JavaScript to run this app.
  //       </noscript>
  //       <div id="root">${markup}</div>
  //       <script src="/${staticPath['main.js']}"></script>
  //     </body>
  //   </html>
  // `

  return res.send(pageHtml)
})
app.use('/', express.static(path.resolve('build')))

server.listen(9093, () => {
  console.log('node app start at port 9093')
})
