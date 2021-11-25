const express = require('express')
const Supply = require('../../models/Supply')

const router = express.Router()
const fs = require('fs')
const path = require('path')
const dir = __dirname

router.get('/', async (req, res) => {
  try {
    res.send('You are hitting the attributes Api endpoint')
  } catch (err) {
    console.log(err.message)
    res.status(500).send('Internal Server Error')
  }
})

//@route GET api/attributes/:stonk_id
//@desc GET details of a stonks NFT
//@access Public

router.get('raritymeta/:stonks_id', async (req, res) => {
  try {
    const searchLimit = parseInt(req.query.limit)
    var imgUrl
    const nft_id = req.params.stonks_id
    resolvedPath = `${dir}/data/${nft_id}_rarity.json`

    if (nft_id >= 1 && nft_id <= searchLimit) {
      imgUrl = `/nft-images/${nft_id}`

      fs.readFile(resolvedPath, (err, data) => {
        if (err) throw err
        let metadata = JSON.parse(data)
        res.json({
          nft_id,
          metadata,
          image_src: imgUrl,
          error: null
        })
      })
    } else {
      res.json({
        nft_id: null,
        metadata: null,
        image_src: null,
        error: `Please enter ID between 1 and ${searchLimit}`
      })
    }
  } catch (err) {
    console.log(err.message)
    res.status(500).send('Internal Server Error')
  }
})

router.get('meta/:stonks_id', async (req, res) => {
  try {
    var imgUrl
    const nft_id = req.params.stonks_id
    resolvedPath = `${dir}/metadata/${nft_id}.json`

    if (nft_id >= 1 && nft_id <= 100) {
      imgUrl = `/nft-images/${nft_id}`

      fs.readFile(resolvedPath, (err, data) => {
        if (err) throw err
        let metadata = JSON.parse(data)
        res.json({
          nft_id,
          metadata,
          image_src: imgUrl,
          error: null
        })
      })
    } else {
      res.json({
        nft_id: null,
        metadata: null,
        image_src: null,
        error: `Please enter ID between 1 and ${searchLimit}`
      })
    }
  } catch (err) {
    console.log(err.message)
    res.status(500).send('Internal Server Error')
  }
})

router.get('/nft-images/:art', (req, res) => {
  try {
    const supply = Supply.findOne({ purpose: 'supply-tracking' })
    const currentSupply = supply.currentSupply
    const searchRange = Number(currentSupply)

    const artNumber = parseInt(req.params.art)

    if (artNumber <= searchRange) {
      res.sendFile(path.resolve(root, 'images', `${artNumber}.png`))
    } else {
      res.json({ response: 'NFT not minted yet' })
    }
  } catch (err) {
    res.json({ response: 'Internal Server Error, Try after some time!' })
  }
})

router.post('/update-supply-snapshot', async (req, res) => {
  try {
    const { currentSupply } = req.body

    const filter = { purpose: 'supply-tracking' }
    const update = { currentSupply: currentSupply }

    let updatedSupply = await Supply.findOneAndUpdate(filter, update)
    updatedSupply.save()

    res.json({ updatedSupply: JSON.stringify(currentSupply) })
  } catch (err) {
    res.json({ response: 'Internal Server Error, Try after some time!' })
  }
})

module.exports = router
