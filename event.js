const Room1 = 'general'


const leaveBoard = (socket) => () => {
	console.log('Socket.io disconnect:', socket.id)
	let obj = new Object
	obj.msg = socket.name
	obj.msg = socket.name + ' 已離開'
	socket.broadcast.emit('msg', obj)
}

const loginBoard = (socket) => (data) => {
	console.log('loginBoard:', socket.id)
	console.log('connected')

	let obj = new Object
	obj.name = data.name
	obj.msg = data.name + '已上線'

	socket.name = data.name
	
	socket.emit('msg',obj)

	//To all connected clients except the sender
	socket.broadcast.emit('msg', obj)
}


module.exports = {
	leaveBoard,
	loginBoard
}