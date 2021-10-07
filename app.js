const express = require('express')
const path = require('path')
const http = require('http')
const socket = require('socket.io')
const events = require('./event')
const port = process.env.PORT || 3005

const app = express()
const server = http.createServer(app)
const io = socket(server)

app.use(express.static(path.join(__dirname,'public')))

server.listen(port, () => {
	console.log('Server listening at port %d', port)
})


const onConnection = (socket) => {
	console.log('Socket.io init success:', socket.id)

	socket.on('disconnect',events.leaveBoard(socket))
	socket.on('login', (data) => events.loginBoard(socket)(data))
}
io.on('connection',onConnection)
