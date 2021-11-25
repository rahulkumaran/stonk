// MongoDB model for announcement posts

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const SupplySchema = new Schema({
  purpose: {
    type: String
  },
  currentSupply: {
    type: String,
    required: true
  }
})

const Supply = mongoose.model(`stonk_society_nft_supply`, SupplySchema)

module.exports = Supply
