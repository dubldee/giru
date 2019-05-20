// Child process to fork
let express = require('express')
let app = express()
let giru = require('../index.js')

// Necessary routes/middleware
app.use(giru())
app.get('/', (req, res) => res.send('Hello World!'))
app.get('/404', (req, res) => {
  res.status(404).send('404 Error')
})

// Send a message after server is up
app.listen(3000, () => process.send('Express test server listening on port 3000'))

// Exit forked app cleanly
process.on('message', (msg) => {
  if (msg === 'stop') {
    process.exit(0)
  }
})
