const express = require('express')
const path = require('path')
const http = require('http')
const socket = require('socket.io')
const events = require('./event')
const port = process.env.PORT || 3006


const app = express()
const server = http.createServer(app)
const io = socket(server)

app.use(express.static(path.join(__dirname,'public')))

server.listen(port, () => {
	console.log('Server listening at port %d', port)
})

const onConnection = (socket) => {
	console.log('Socket.io init success:', socket.id)
	socket.on('send_msg', (data) => events.send_msg(socket)(data))
	socket.on('check_login', (data) => events.check_login(socket)(data))
	socket.on('feedback_other_exist', (data) => events.feedback_other_exist(socket)(data))
	socket.on('disconnect',events.leaveBoard(socket))
	socket.on('other_user_position', (data) => events.other_user_position(socket)(data))
}
io.on('connection',onConnection)