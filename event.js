const Room1 = 'general'


const leaveBoard = (socket) => () => {
	console.log('Socket.io disconnect:', socket.id)
}

const loginBoard = (socket) => (data) => {
	console.log('loginBoard:', socket.id)
	console.log('connected')

	let obj = new Object
	obj.name = data.name
	obj.msg = data.name + '已上線'
	
	socket.emit('msg',obj)
}


module.exports = {
	leaveBoard,
	loginBoard
}