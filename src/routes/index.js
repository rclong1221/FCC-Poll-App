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

	function loggedIn (req) {
		return (req.isAuthenticated()) ? true : false
	}

	app.route('/')
		.get(function (req, res) {
			res.render('index', {loggedIn: loggedIn(req)})
		})

	app.route('/login')
		.get(function (req, res) {
			res.render('login', {loggedIn: loggedIn(req)})
		})

	app.route('/logout')
		.get(function (req, res) {
			req.logout()
			res.redirect('/')
		})

	app.route('/api/user/:id')
		.get(isLoggedIn, function (req, res) {
			res.json(req.user)
		})

	app.route('/auth/github')
		.get(passport.authenticate('github'))

	app.route('/auth/github/callback')
		.get(passport.authenticate('github', {
			successRedirect: '/redirect',
			failureRedirect: '/login'
		}))

	app.route('/auth/twitter')
		.get(passport.authenticate('twitter'))

	app.route('/auth/twitter/callback')
		.get(passport.authenticate('twitter', {
			successRedirect: '/redirect',
			failureRedirect: '/login'
		}))

	app.route('/create')
		.get(isLoggedIn, function (req, res) {
			res.render('create', {loggedIn: loggedIn(req)})
		})

	app.route('/my-polls')
		.get(isLoggedIn, function (req, res) {
			res.render('my-polls', {loggedIn: loggedIn(req)})
		})

	app.route('/api/user/:id/polls/')
		.get(isLoggedIn, Poll.getMyPolls)
		.post(isLoggedIn, Poll.editPoll)

	app.route('/api/polls/')
		.get(Poll.getAll)
		.post(isLoggedIn, Poll.createPoll)

	app.route('/api/polls/:pollID')
		.get(Poll.getPoll)
		.put(Poll.votePoll)
		.delete(isLoggedIn, Poll.deletePoll)

	app.route('/polls/:pollID')
		.get(function (req, res) {
			res.render('vote', {loggedIn: loggedIn(req)})
		})

	app.route('/edit/:pid')
		.get(isLoggedIn, function (req, res) {
			res.render('edit', {loggedIn: loggedIn(req)})
		})

	app.route('/redirect')
		.get(function (req, res) {
			res.render('redirect', {loggedIn: loggedIn(req)})
		})
}
