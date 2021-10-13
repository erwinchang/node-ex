const express = require('express')
const path = require('path')
const http = require('http')
const socket = require('socket.io')
const port = process.env.PORT || 3006


const app = express()
const server = http.createServer(app)
const io = socket(server)

app.use(express.static(path.join(__dirname,'public')))

server.listen(port, () => {
	console.log('Server listening at port %d', port)
})