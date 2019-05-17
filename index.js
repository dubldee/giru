// Color output to terminal
require('colors')

module.exports = giru

function giru () {
  return function logger (req, res, next) {
    let userIP = req.ip || req._remoteAddress || (req.connection && req.connection.remoteAddress) || null
    let time = new Date().toLocaleString()
    let bad = res.statusCode > 399

    if (bad) {
      console.log(`[${time}] ${userIP} ${req.protocol} ${req.method} "${req.originalUrl}" ${res.statusCode}`.red)
    } else {
      console.log(`[${time}] ${userIP} ${req.protocol} ${req.method} "${req.originalUrl}" ${res.statusCode}`)
    }

    next()
  }
}