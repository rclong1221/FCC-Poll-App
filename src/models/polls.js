'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

var Voters = new Schema({
  voters: [String]
})

var Polls = new Schema({
  publicID: String,
  creator: String,
  question: String,
  options: [String],
  voters: [Voters],
})

module.exports = mongoose.model('Polls', Polls)
