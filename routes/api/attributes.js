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
      imgUrl = `https://thestonksociety.com/serve/attributes/nft-images/${nft_id}`

      fs.readFile(resolvedPath, (err, data) => {
        if (err) throw err
        let metadata = JSON.parse(data)
        res.json({
          nft_id,
          metadata,
          image: imgUrl,
          error: null
        })
      })
    } else {
      res.json({ response: 'NO NAUGHTY! ;) This NFT has not been minted yet!' })
    }
  } catch (err) {
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

      imgUrl = `https://thestonksociety.com/serve/attributes/nft-images/${nft_id}`

      fs.readFile(resolvedPath, (err, data) => {
        if (err) throw err
        let metadata = JSON.parse(data)
        res.json({
          tokenId: Number(nft_id),
          ...metadata,
          image: imgUrl,
        })
      })
    } else {
      res.json({ response: 'NO NAUGHTY! ;) This NFT has not been minted yet!' })
    }
  } catch (err) {
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
router.post('/uss', async (req, res) => {
  try {
    let saveSupply = ''
    // fs.writeFileSync('./supplySnapshot.json', saveSupply)

    // to db
    const { currentSupply } = req.body
    const filter = { purpose: 'supply-tracking' }
    const update = { currentSupply: currentSupply }

    let updatedSupply = await Supply.findOneAndUpdate(filter, update)
    await updatedSupply.save()

    // to backup file 
    saveSupply = JSON.stringify([currentSupply])
    fs.writeFile('./supplySnapshot.json', saveSupply, (err) => {
      if (err) {
        console.log("Error Writing Data!")
      }
    })

    res.send("USS Successful!")
  } catch (err) {
    res.json({ response: 'Internal Server Error, Try after some time!' })
  }
})

//api to get the snapshot of the current supply from the database
router.get('/get-supply-snapshot', async (req, res) => {
  try {
    //from db
    const filter = { purpose: 'supply-tracking' }

    const supplyObj = await Supply.findOne(filter)
    const currentSupply = supplyObj.currentSupply

    res.json({ currentSupply: currentSupply })
  } catch (err) {

    // from backup file
    fs.readFile('./supplySnapshot.json', (err, data) => {
      if (err) {
        res.json({ response: err })
      }

      const supplyFromFile = JSON.parse(data)
      const backupSupply = supplyFromFile[0]
      res.json({ currentSupply: backupSupply })
    })

  }
})

//api to deliver my stonks
router.post('/show-my-stonks', async (req, res) => {
  try {
    let myStonksArray = []
    const resolvedPath = `${dir}/combined-data/_metadata_rarity.json`

    const ownedStonks = (req.body.ownedStonks)

    fs.readFile(resolvedPath, (err, data) => {
      if (err) throw err
      let metadata = JSON.parse(data)


      ownedStonks.map((stonkId, index) => {
        let stonk = stonkId - 1
        myStonksArray.push({
          ...metadata[stonk],
          image: `https://thestonksociety.com/serve/attributes/nft-images/${stonkId}`
        })
      })

      res.json({
        myStonksArray
      })
    })
    // res.send(ownedStonks)

  } catch (err) {
    console.log(err)
    res.json({ response: 'Internal Server Error, Try after some time!' })
  }
})
module.exports = router
