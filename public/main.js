const socket = io.connect()

//container
//|--inbox
//|   |-inbox_people...........inboxPeople
//|   |-inbox_message
//|   |  |-messages_history....messageBox
//|   |  |-fallback............fallback
//|
//|--mssage_form...............messageForm
//|   |-message_form_input.....inputField
//|   |-message_form_button

const inboxPeople = document.querySelector('.inbox__people')
const inputField = document.querySelector(".message_form__input")
const messageForm = document.querySelector(".message_form")
const messageBox = document.querySelector(".messages__history")
const fallback = document.querySelector(".fallback")

let userName = ''

const newUserConnected = (user) => {
  userName = user || `User${Math.floor(Math.random() * 1000000)}`
	console.log('newUserConnected',userName)

  socket.emit("new user", userName)
	console.log('emit: new user',userName)

  addToUsersBox(userName)
}

const addToUsersBox = (userName) => {
  if (!!document.querySelector(`.${userName}-userlist`)) {
    return
  }

  const userBox = `
    <div class="chat_ib ${userName}-userlist">
      <h5>${userName}</h5>
    </div>
  `

//	<div class="chat_ib User536165-userlist">
//	<h5>User536165</h5>
//  </div>	
	console.log(userBox)

  inboxPeople.innerHTML += userBox
}

const addNewMessage = ({ user, message }) => {
  const time = new Date();
  const formattedTime = time.toLocaleString("en-US", { hour: "numeric", minute: "numeric" })

  const receivedMsg = `
  <div class="incoming__message">
    <div class="received__message">
      <p>${message}</p>
      <div class="message__info">
        <span class="message__author">${user}</span>
        <span class="time_date">${formattedTime}</span>
      </div>
    </div>
  </div>`

  const myMsg = `
  <div class="outgoing__message">
    <div class="sent__message">
      <p>${message}</p>
      <div class="message__info">
        <span class="time_date">${formattedTime}</span>
      </div>
    </div>
  </div>`

  messageBox.innerHTML += user === userName ? myMsg : receivedMsg;
}

// new user is created so we generate nickname and emit event
newUserConnected()

messageForm.addEventListener("submit", (e) => {
  e.preventDefault()
  if (!inputField.value) {
    return
  }

	console.log('submit',{
    message: inputField.value,
    nick: userName,		
	})

  socket.emit("chat message", {
    message: inputField.value,
    nick: userName,
  })

  inputField.value = ""
})

socket.on("new user", function (data) {
  data.map((user) => addToUsersBox(user));
})

socket.on("user disconnected", function (userName) {
  document.querySelector(`.${userName}-userlist`).remove();
})

socket.on("chat message", function (data) {
  addNewMessage({ user: data.nick, message: data.message })
})