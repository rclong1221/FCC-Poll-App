'use strict'

var path = process.cwd()
var Poll = require(path + '/src/controllers/pollController.server.js')

module.exports = function (app, passport) {

	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next()
		} else {
			res.redirect('/login')
		}
	}

	app.route('/')
		.get(function (req, res) {
			res.sendFile(path + '/public/index.html')
		})

	app.route('/login')
		.get(function (req, res) {
			res.sendFile(path + '/public/login.html')
		})

	app.route('/logout')
		.get(function (req, res) {
			req.logout()
			res.redirect('/login')
		})

	app.route('/profile')
		.get(isLoggedIn, function (req, res) {
			res.sendFile(path + '/public/profile.html')
		})

	app.route('/api/user/:id')
		.get(isLoggedIn, function (req, res) {
			res.json(req.user.github || req.user.twitter)
		})

	app.route('/auth/github')
		.get(passport.authenticate('github'))

	app.route('/auth/github/callback')
		.get(passport.authenticate('github', {
			successRedirect: '/',
			failureRedirect: '/login'
		}))

	app.route('/auth/twitter')
		.get(passport.authenticate('twitter'))

	app.route('/auth/twitter/callback')
		.get(passport.authenticate('twitter', {
			successRedirect: '/',
			failureRedirect: '/login'
		}))

	app.route('/create')
		.get(isLoggedIn, function (req, res) {
			res.sendFile(path + '/public/create.html')
		})

	app.route('/my-polls')
		.get(isLoggedIn, function (req, res) {
			res.sendFile(path + '/public/my-polls.html')
		})

	app.route('/api/user/:id/polls/')
		.get(isLoggedIn, Poll.getMyPolls)

	app.route('/api/polls/')
		.get(Poll.getAll)
		.post(isLoggedIn, Poll.createPoll)

	app.route('/api/polls/:pollID')
		.get(Poll.getPoll)
		.delete(isLoggedIn, Poll.deletePoll)

	app.route('/polls/:pollID')
		.get(function (req, res) {
			res.sendFile(path + '/public/vote.html')
		})
}
