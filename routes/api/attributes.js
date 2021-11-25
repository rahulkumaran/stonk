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

// metadata with rarity attributes
router.get('/nft-rarity-metadata/:stonks_id', async (req, res) => {
  try {
    const supply = await Supply.findOne({ purpose: 'supply-tracking' })
    const currentSupply = supply.currentSupply
    const searchRange = parseInt(currentSupply)

    // const searchLimit = parseInt(req.query.limit)
    var imgUrl
    const nft_id = req.params.stonks_id

    if (nft_id >= 1 && nft_id <= searchRange) {
      const resolvedPath = `${dir}/data/${nft_id}_rarity.json`
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
      res.json({ response: 'NO NAUGHTY! ;) This NFT has not been minted yet!' })
    }
  } catch (err) {
    console.log(err.message)
    res.status(500).send('Internal Server Error')
  }
})

// original metadata without rarity
router.get('/nft-metadata/:stonks_id', async (req, res) => {
  try {
    const supply = await Supply.findOne({ purpose: 'supply-tracking' })
    const currentSupply = supply.currentSupply
    const searchRange = parseInt(currentSupply)

    var imgUrl
    const nft_id = req.params.stonks_id

    if (nft_id >= 1 && nft_id <= searchRange) {
      const resolvedPath = `${dir}/metadata/${nft_id}.json`

      imgUrl = `https://alphatest.thestonksociety.com/api/attributes/nft-images/${nft_id}`

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
      res.json({ response: 'NO NAUGHTY! ;) This NFT has not been minted yet!' })
    }
  } catch (err) {
    console.log(err.message)
    res.status(500).send('Internal Server Error')
  }
})

// api to get the nft images <= minted
router.get('/nft-images/:stonks_id', async (req, res) => {
  try {
    const supply = await Supply.findOne({ purpose: 'supply-tracking' })
    const currentSupply = supply.currentSupply
    const searchRange = parseInt(currentSupply)

    const nft_id = parseInt(req.params.stonks_id)

    if (nft_id <= searchRange) {
      res.sendFile(path.resolve('images', `${nft_id}.png`))
    } else {
      res.json({ response: 'NO NAUGHTY! ;) This NFT has not been minted yet!' })
    }
  } catch (err) {
    res.json({ response: 'Internal Server Error, Try after some time!' })
  }
})

// api to update the supply in db to keep track for fetching metadata and images
router.post('/update-supply-snapshot', async (req, res) => {
  try {
    const { currentSupply } = req.body
    const filter = { purpose: 'supply-tracking' }
    const update = { currentSupply: currentSupply }

    let updatedSupply = await Supply.findOneAndUpdate(filter, update)
    await updatedSupply.save()

    res.json({ updatedSupply: JSON.stringify(currentSupply) })
  } catch (err) {
    res.json({ response: 'Internal Server Error, Try after some time!' })
  }
})

module.exports = router
