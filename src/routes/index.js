'use strict'

var path = process.cwd()
var ClickHandler = require(path + '/src/controllers/clickHandler.server.js')
var Poll = require(path + '/src/controllers/pollController.server.js')

module.exports = function (app, passport) {

	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next()
		} else {
			res.redirect('/login')
		}
	}

	var clickHandler = new ClickHandler()

	app.route('/')
		.get(isLoggedIn, function (req, res) {
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
			res.json(req.user.github)
		})

	app.route('/auth/github')
		.get(passport.authenticate('github'))

	app.route('/auth/github/callback')
		.get(passport.authenticate('github', {
			successRedirect: '/',
			failureRedirect: '/login'
		}))

	// app.route('/create')
	// 	.get(isLoggedIn, Poll.createPoll)

	app.route('/create')
		.get(isLoggedIn, function (req, res) {
			res.sendFile(path + '/public/create.html')
		})

	app.route('/submit-poll')
		.post(isLoggedIn, Poll.createPoll)

	app.route('/api/user/:id/clicks')
		.get(isLoggedIn, clickHandler.getClicks)
		.post(isLoggedIn, clickHandler.addClick)
		.delete(isLoggedIn, clickHandler.resetClicks)

	app.route('/api/user/:id/polls/')
		.get(function (req, res) {
			res.render('partials/pollView', { pollText: "Shit", pollURL: "#", pollID: 20 })
		})

	app.route('/api/polls/')
		.get(function (req, res) {
			Poll.getAll(req, res)
		})

	app.route('/api/polls/:pollID')
		.get(function (req, res) {
			Poll.getPoll(req, res)
		})

	app.route('/polls/:pollID')
		.get(function (req, res) {
			res.sendFile(path + '/public/vote.html')
		})
}
