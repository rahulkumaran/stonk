const environment = require('./helpers/environment.js')
const path = require('path')
const express = require('express')
const fs = require('fs')

environment()

const app = express()

app.use(express.json({ extended: false }))

let PORT

app.use('/nft-images', express.static(path.join(__dirname, '/images'))) // making /uploads accsible in frontend as static

//api route
app.use('/api/attributes', require('./routes/api/attributes'))

app.get('/nft-images-test/:art', (req, res) => {
  try {
    let readCurrentSupply = fs.readFileSync('./supplySnapshot.json')

    const currentSupply = JSON.parse(readCurrentSupply)
    const searchRange = Number(currentSupply[0])

    const artNumber = parseInt(req.params.art)

    if (artNumber <= searchRange) {
      res.sendFile(path.resolve(__dirname, 'images', `${artNumber}.png`))
    } else {
      res.json({ response: 'NFT not minted yet' })
    }
  } catch (err) {
    res.json({ response: 'Internal Server Error, Try after some time!' })
  }
})

app.post('/update-supply-snap', (req, res) => {
  try {
    let saveSupply = ''
    fs.writeFileSync('./supplySnapshot.json', saveSupply)

    const { currentSupply } = req.body

    saveSupply = JSON.stringify([currentSupply])

    fs.writeFileSync('./supplySnapshot.json', saveSupply)
    res.json({ updatedSupply: JSON.stringify(currentSupply) })
  } catch (err) {
    res.json({ response: 'Internal Server Error, Try after some time!' })
  }
})

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
  console.log(`server starting on port ${PORT}`)
})
