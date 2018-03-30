const path = process.cwd()

const Polls = require(path + '/src/models/polls.js')

class Poll {
  static getPoll(req, res) {
    let pID = req.params.pollID
    Polls.findOne({_id: pID})
      .exec(function (err, result) {
        if (err) throw err
        res.json(result)
      })
  }

  static createPoll(req, res) {
    let v = req.body.options.map(function (item) {
      return 0;
    })
    let vs = req.body.options.map(function (item) {
      return [];
    })
    let d = new Polls({
      publicID: "1",
      creator: req.user.github.id || req.user.twitter.id,
      question: req.body.question,
      options: req.body.options,
      votes: v,
      voters: vs
    })
    d.save(function (err) {
      if (err) throw err
      res.status(200).send({ redirect: '/' })
    })
  }

  static getAll(req, res) {
    Polls.find()
      .exec(function (err, result) {
        if (err) throw err
        res.json(result)
      })
  }

  static deletePoll(req, res) {
    Polls.deleteOne({ _id: req.body._id, creator: req.user.twitter.id || req.user.github.id })
      .exec(function (err, result) {
        if (err) throw err
        res.status(200).send({ redirect: '/' })
      })
  }

  static getMyPolls(req, res) {
    Polls.find({ creator: req.user.github.id || req.user.twitter.id })
      .exec(function (err, result) {
        if (err) throw err
        res.json(result)
      })
  }

  static votePoll(req, res) {
    // Get IP Address
    let ip = req.ip.slice(":")
    ip = ip[ip.length - 1]

    // Use AuthID or IP address as voting token
    let uid = (req.user) ? (req.user.github.id || req.user.twitter.id) : ip

    Polls.findOne({ _id: req.params.pollID })
      .then(function (poll) {
        if (poll) {
          // Remove old user vote
          poll.voters = poll.voters.filter(function (votes) {
            votes.voters = votes.voters.filter(function (vote) {
              return vote !== (uid)
            })
            return votes
          })

          // Add new user vote
          poll.voters[req.body.index].voters.push(uid)

          // Save to database
          poll.save(function (err) {
            if (err) throw err
            res.status(200).send({ redirect: req.get('referer') })
          })
        }
      })
      .catch(function (err) {
        throw err
      });
    }
}

module.exports = Poll
