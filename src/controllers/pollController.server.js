const path = process.cwd()

const Polls = require(path + '/src/models/polls.js')

class Poll {
  static getPoll(req, res) {
    // console.log(req.params.pollID)
    // res.send({
    //   question: "Should I wear shoes?",
    //   options: ["Yes", "No"],
    //   votes: [
    //     { count: 3, voters: ["abc123", "bcd234", "cde345"]},
    //     { count: 2, voters: ["bc23", "cd34"]}
    //   ]
    // })

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
      question: "How do I save?",
      options: ["Yes", "No"],
      votes: [{
        count: 0,
        voters: []
      }]
    })
    d.save(function (err) {
      if (err) throw err
      res.redirect('/')
    })
  }
}

module.exports = Poll
