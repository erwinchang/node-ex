const express = require('express')
const path = require('path')
const http = require('http')
const socket = require('socket.io')
const events = require('./event')
const port = process.env.PORT || 3000

const app = express()
const server = http.createServer(app)
const io = socket(server)

app.use(express.static(path.join(__dirname,'public')))

server.listen(port, () => {
	console.log('Server listening at port %d',port)
})

const onConnection = (socket) => {
	console.log('Socket.io init success')
	socket.on('joinRoom',events.joinRoom(socket))
	socket.on('disconnect', () =>
		events.leaveRoom(socket)({room: 'general'})
	)

	socket.on('offer', (offer) => events.offer(socket)({room: 'general', offer}))
	socket.on('answer', (answer) => events.answer(socket)({room: 'general', answer}))
	socket.on('icecandiate', (icecandiate) => events.icecandiate(socket)({room: 'general', icecandiate}))

}

io.on('connection',onConnection)