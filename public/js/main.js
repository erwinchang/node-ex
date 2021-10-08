$(document).ready(function() {
	const socket = io.connect()

	socket.on('connect', function () {
		let obj = new Object
		obj.name = prompt('尊姓大名？')
		socket.emit('login',obj)
	})

	socket.on('msg', function(data) {
		//console.log('data',data)
		$('#member_msg').append('<div>' + data.msg + '</div>');
	})

	socket.on('show', function(data) {
		//console.log('show',data)
		$('#size').val(data.size)
		ctx.lineWidth = data.size

		drawOneLine(data.x,data.y,data.new_x,data.new_y)
	})	

	$(document).on('mousedown', '#whiteboard', function(e){
		e.preventDefault();
		drawing = true

		offset = $(e.currentTarget).offset();
		x = e.pageX - offset.left
		y = e.pageY - offset.top
		drawLine(x,y,x+1,y+1)
	})

	$(document).on('mouseup', '#whiteboard', function(e){
		e.preventDefault();
		drawing = false
	})

	$(document).on('mousemove', '#whiteboard', function(e){
		e.preventDefault();
		
		if(drawing){
			offset = $(e.currentTarget).offset();
			new_x = e.pageX - offset.left
			new_y = e.pageY - offset.top
			drawLine(x,y,new_x,new_y)
			x = new_x
			y = new_y
		}
	})

	$(document).on('change', '#size', function(e){
		ctx.lineWidth = $(this).val()
	})

	var c = document.getElementsByTagName('canvas')[0]
	c.width  = 648
	c.height = 770
	var drawing = false

	var ctx = c.getContext('2d')
	ctx.lineCap = 'round'
	ctx.lineJoin = 'round'
	ctx.strokeStyle = '#000000'
	ctx.lineWidth = 1
	var offset, x, y, new_x, new_y;

	function drawOneLine(x, y, new_x, new_y)
	{ 
			ctx.beginPath()
			ctx.moveTo(x, y)
			ctx.lineTo(new_x, new_y)
			ctx.closePath()
			ctx.stroke()
	}	

	function drawLine(x, y, new_x, new_y)
	{ 
			ctx.beginPath()
			ctx.moveTo(x, y)
			ctx.lineTo(new_x, new_y)
			ctx.closePath()
			ctx.stroke()

			var obj = new Object
			obj.x = x
			obj.y = y
			obj.new_x = new_x
			obj.new_y = new_y
			obj.size = $('#size').val()
			socket.emit('draw',obj)
	}	
})