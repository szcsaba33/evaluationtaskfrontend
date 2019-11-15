const express = require('express')
const serveStatic = require('serve-static')
const path = require('path')

const app = express()

app.use('/', serveStatic(path.join(__dirname, '/dist')))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', process.env.ORIGIN || '*')
  next()
})

// this * route is to serve project on different page routes except root `/`
app.get(/.*/, function (req, res) {
  res.sendFile(path.join(__dirname, '/dist/index.html'))
})

const port = process.env.PORT || 8080 || 3001
app.listen(port)
console.log(`app is listening on port: ${port}`)
