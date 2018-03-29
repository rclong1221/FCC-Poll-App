'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

var Polls = new Schema({
  publicID: String,
  question: String,
  options: [String],
  votes: [{
    count: Number,
    voters: [String]
  }]
})

module.exports = mongoose.model('Polls', Polls)