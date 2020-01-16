const express = require('express')
const path = require('path')
const router = require('./router')

const app = express()

app.use(express.json())

app.use(express.static(path.resolve(__dirname, '../client/build')))
app.use(router)
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../client/build/index.html'), function(
    err
  ) {
    if (err) {
      res.status(500).send(err)
    }
  })
})
module.exports = app
