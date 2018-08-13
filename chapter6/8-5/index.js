const os = require('os')

const http = require('http')

const server = http.createServer((req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain')
  res.end(os.hostname())
})

server.listen(3002, () => {
  console.log('start')
})
