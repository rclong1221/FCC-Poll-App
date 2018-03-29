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
}

module.exports = Poll
