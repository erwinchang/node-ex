const check_login = (socket) => (username) => {
	console.log('check_login:', socket.id)

	let numID = Math.random()
	numID = numID.toString()
	numID = numID.replace('.','')

	socket.username = username
	socket.userid = numID

	socket.emit('add_new_user_myself', {
		new_user_id: numID,
		new_user_name:username
	})

	socket.broadcast.emit('add_new_user',{
		new_user_id: numID,
		new_user_name: username
	})
}

const feedback_other_exist = (socket) => (data) => {
	console.log('feedback_other_exist:', socket.id)
	console.log(data)

	socket.broadcast.emit('feedback_where_I_am',{
		id: data.id,
		name: data.name,
		new_user_id: data.new_user_id
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
	leaveBoard
}