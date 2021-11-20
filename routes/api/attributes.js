const express = require('express')

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

router.get('/:stonks_id', async (req, res) => {
  try {
    var imgUrl
    const nft_id = req.params.stonks_id
    resolvedPath = `${dir}/data/metadata_${nft_id}.json`

    if (nft_id >= 1 && nft_id <= 10) {
      imgUrl = `/nft-images/${nft_id}.png`

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
        error: 'Please enter ID between 1 and 3333'
      })
    }
  } catch (err) {
    console.log(err.message)
    res.status(500).send('Internal Server Error')
  }
})

module.exports = router