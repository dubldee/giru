// Color output to terminal
module.exports = giru

function giru () {
  return function logger (req, res, next) {
    let time = new Date().toLocaleString() // Readable date string
    let start = process.hrtime() // Start time of middleware
    res.on('finish', function () {
      let bad = this.statusCode > 399 // Bad request if error code > 400
      let end = process.hrtime(start)[1] / 1000000 // End time of response
      if (bad) {
        console.log('\x1b[31m%s\x1b[0m', `[${time}] ${req.ip} ${req.protocol} ${req.method} "${req.originalUrl}" ${this.statusCode} ${end}ms`)
      } else {
        console.log(`[${time}] ${req.ip} ${req.protocol} ${req.method} "${req.originalUrl}" ${this.statusCode} ${end}ms`)
      }
    })

    next()
  }
}
