const check_login = (socket) => (data) => {
	let numID = Math.random()
	numID = numID.toString()
	numID = numID.replace('.','')

	socket.username = data.name
	socket.userid = numID

	console.log('0-1 check_login',socket.id,data.name,numID)
	console.log('0-2 add_new_user_myself',{
		new_user_id: numID,
		new_user_name:data.name,
		new_user_imgid:data.imgID
	})
	

	socket.emit('add_new_user_myself', {
		new_user_id: numID,
		new_user_name:data.name,
		new_user_imgid:data.imgID
	})

	console.log('0-3 add_new_user',{
		new_user_id: numID,
		new_user_name: data.name,
		new_user_imgid:data.imgID
	})

	socket.broadcast.emit('add_new_user',{
		new_user_id: numID,
		new_user_name: data.name,
		new_user_imgid:data.imgID
	})
}

const feedback_other_exist = (socket) => (data) => {
	console.log('1-1 feedback_other_exist:', data)
	console.log('1-2 feedback_where_I_am',{
		id: data.id,
		name: data.name,
		new_user_id: data.new_user_id,
		new_user_imgid: data.new_user_imgid
	})

	socket.broadcast.emit('feedback_where_I_am',{
		id: data.id,
		name: data.name,
		new_user_id: data.new_user_id,
		new_user_imgid: data.new_user_imgid
	})
}

const other_user_position = (socket) => (data) => {
	console.log('other_user_position:', socket.id)
	console.log(data)

	socket.broadcast.emit('feedback_user_position',{
		otherID: data.id,
		left:data.left,
		top:data.top,
		imgV:data.imgV
	})
}

const leaveBoard = (socket) => (data) => {
	console.log('loginBoard:', socket.id)
	console.log('username:',socket.username)
	console.log('userid:',socket.userid)
}

const send_msg = (socket) => (data) => {
	console.log('send_msg:', socket.id)
	console.log(data)

	socket.emit('return_msg',{
		id: data.id,
		name: data.name,
		msg: data.msg,
		time: getTodayDate
	})

	socket.broadcast.emit('return_msg',{
		id: data.id,
		name: data.name,
		msg: data.msg,
		time: getTodayDate
	})	
}

//取得今天的日期（ISO 8601），讓使用者送出訊息時參考用
function getTodayDate() {
	let str = ''

	// 宣告日期物件
	let today = new Date()

	// 年
	let today_year = today.getFullYear()
	str += today_year;

	// 月
	let today_month = today.getMonth() + 1
	if (today_month >= 10)
						str += '-' + today_month
	else
						str += '-0' + today_month

	// 日
	let today_date = today.getDate()
	if (today_date >= 10)
						str += '-' + today_date
	else
						str += '-0' + today_date

	let today_hour = today.getHours()
	if (today_hour >= 10)
						str += ' ' + today_hour
	else
						str += ' 0' + today_hour

	let today_minute = today.getMinutes()
	if (today_minute >= 10)
						str += ':' + today_minute
	else
						str += ':0' + today_minute

	let today_second = today.getSeconds()
	if (today_second >= 10)
						str += ':' + today_second
	else
						str += ':0' + today_second

	return str
}

module.exports = {
	check_login,
	send_msg,
	feedback_other_exist,
	leaveBoard,
	other_user_position
}