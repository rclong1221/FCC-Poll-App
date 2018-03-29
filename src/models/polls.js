'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

var Polls = new Schema({
  question: String,
  options: [String],
  votes: [{
    user_id: String,
    vote: Number
  }]
})

export.modules = mongoose.model('Polls', Polls)
