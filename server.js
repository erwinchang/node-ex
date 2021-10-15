const express = require('express')
const app = express()
const router = express.Router()
const { v5: uuid } = require('uuid')

const port = process.env.PORT || 3000

app.use(express.static('public'))
router.get('/api', (req, res) => {
	res.status(200).send({
		message: 'Hello ithelp'
	})
})

app.use(router)
const server = app.listen(port, () => {
	console.log(`Server is listening on port ${port}`)
})

const io = require('socket.io')(server)

io.on('connect', (socket) => {
	console.log('connect',socket.id)

	socket.on('join-room', (roomId) => {
		console.log('join-room:',roomId)
	})

	socket.on('create-room', () => {
		console.log('create-room')
		const roomId = uuid(`${Date.now()}`, uuid.DNS);
		console.log('roomId',roomId)
		socket.join(roomId)

		socket.emit('join-room-message', `You've join ${roomId} room`)
		io.to(roomId).emit('room-brocast', `${socket.id} has join this room`)
	})

})