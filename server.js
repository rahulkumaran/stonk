const colors = require('colors')
const environment = require('./helpers/environment.js')
const connectDB = require('./helpers/connectDB.js')
const path = require('path')
const fs = require('fs')
const express = require('express')

environment()
connectDB()

const app = express()

app.use(express.json({ extended: false }))

let PORT

app.use('/nft-images', express.static(path.join(__dirname, '/images'))) // making /uploads accsible in frontend as static

//api route
app.use('/api/attributes', require('./routes/api/attributes'))

//serve static assets in prod

if (process.env.NODE_ENV === 'production') {
  PORT = process.env.SERVER_PORT

  //set static folder
  app.use(express.static('frontend/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  })
} else {
  PORT = 6000
}

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`.yellow.bold)
})
