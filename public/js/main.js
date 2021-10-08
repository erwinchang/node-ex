$(document).ready(function() {
	const socket = io.connect()

	socket.on('connect', function () {
		let obj = new Object
		obj.name = prompt('尊姓大名？')
		socket.emit('login',obj)
	})

	socket.on('msg', function(data) {
		console.log('data',data)
		$('#member_msg').append('<div>' + data.msg + '</div>');
	})
})