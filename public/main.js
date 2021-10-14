const socket = io.connect()

const inboxPeople = document.querySelector('.inbox__people')

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
};

// new user is created so we generate nickname and emit event
newUserConnected();

socket.on("new user", function (data) {
  data.map((user) => addToUsersBox(user));
});

socket.on("user disconnected", function (userName) {
  document.querySelector(`.${userName}-userlist`).remove();
});