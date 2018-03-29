'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

var User = new Schema({
	github: {
		id: String,
		displayName: String,
		username: String,
      publicRepos: Number
	},
	twitter: {
		id: String,
		displayName: String,
		username: String,
	},
   nbrClicks: {
      clicks: Number
   }
})

module.exports = mongoose.model('User', User)
