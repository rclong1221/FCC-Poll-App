'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
// const User = require('./users.js').UserSchema

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
