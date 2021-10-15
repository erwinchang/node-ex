const socket = io()

const params = new URLSearchParams(window.location.search)
const roomId = params.get('room')

console.log('params',params)
console.log('roomId',roomId)

socket.on('connect', function() {
	if(roomId) {
		socket.emit('join-room', roomId)
	} else {
		socket.emit('create-room')
	}
})

socket.on('join-room-message', (message) => {
	console.log('join-room-message:',message)
})

socket.on('room-brocast', (message) => {
	console.log('room-brocast:',message)
})