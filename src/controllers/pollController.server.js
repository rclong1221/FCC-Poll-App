const path = process.cwd()

const Polls = require(path + '/src/models/polls.js')

class Poll {
  static getPoll(req, res) {
    let pID = req.params.pollID
    Polls.findOne({publicID: pID})
      .exec(function (err, result) {
        if (err) throw err
        res.json(result)
      })
  }

  static createPoll(req, res) {
    let d = new Polls({
      publicID: "1",
      question: req.body.question,
      options: req.body.options,
      votes: [{
        count: 0,
        voters: []
      }]
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
