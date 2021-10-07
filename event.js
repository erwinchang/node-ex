const Room1 = 'general'
const users = {
	[Room1]: {},
}

const joinRoom = (socket) => ({username, room = Room1}) => {
	socket.join(room, () => {
		users[room][socket.client.id] = { username: username, id: socket.client.id }
		socket.broadcast.in(room).emit('newUser',users[room])
	})
}

const leaveRoom = (socket) => ({ room, username }) => {
	socket.leave(room, () => {
		delete users[room][socket.client.id]
		socket.broadcast.in(room).emit('userLeave',users[room])
	})
}

const offer = (socket) => ({room, offer}) => {
	console.log('switch offer')
	socket.broadcast.in(room).emit('offer',offer)
}

const answer = (socket) => ({rootm, answer}) => {
	console.log('switch answer')
	socket.broadcast.in(room).emit('answer',answer)
}

const icecandiate = (socket) => ({rootm, icecandiate}) => {
	console.log('switch icecandiate')
	socket.broadcast.in(room).emit('icecandiate',icecandiate)
}

module.exports = {
	joinRoom,
	leaveRoom,
	offer,
	answer,
	icecandiate
}