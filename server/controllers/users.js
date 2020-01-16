const path = require('path')

exports.getLandingPage = (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/build/index.html'))
}
exports.getTestCsv = (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/data/hog-with-summary.csv'))
}
