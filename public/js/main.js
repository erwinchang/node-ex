var imgHorizontalNum = 0
var imgVerticalNum = 0
var timer
var current_x = 0
var current_y = 0
var old_x = 0
var old_y = 0
var myID = ''
var myName = ''
var socket

$(document).ready(function() {
	timer = setInterval(setAction, 300)

	const socket = io.connect()

	socket.on('connect',function(){
		socket.emit('check_login',prompt('貴姓大名？'))
	})

	socket.on('add_new_user_myself',function(obj){
		console.log('add_new_user_myself')
		myID = obj.new_user_id
		myName = obj.new_user_name
		let html = "<div class='div_container' id='role_" 
		         + obj.new_user_id + "'><div id='myMsg_" 
						 + obj.new_user_id + "' style='position: absolute; top: -35px; width: 500px;'></div><div class='div_role' id='myRole_" 
						 + obj.new_user_id + "'><img src='./images/roles/a" + getRandRoleImg() + ".png' /></div></div>";

		console.log(html)

		$('.div_scene').append(html)
	})

	socket.on('add_new_user',function(obj){
		console.log('add_new_user',obj)

		let html = "<div class='div_container' id='role_" 
		         + obj.new_user_id + "'><div id='myMsg_" 
						 + obj.new_user_id + "' style='position: absolute; top: -35px; width: 500px;'></div><div class='div_role' id='myRole_" 
						 + obj.new_user_id + "'><img src='./images/roles/a" + getRandRoleImg() + ".jpg' /></div></div>";
		$('.div_scene').append(html)

		html = "<p>" + obj.new_user_name +"</p>"
		$('.div_scene').append(html)
		
		socket.emit('feedback_other_exist',{
			id:myID,
			name:myName,
			new_user_id: obj.new_user_id
		})
	})

	socket.on('feedback_where_I_am',function(obj){
		console.log('feedback_where_I_am',obj)
		if( myID == obj.new_user_id){
			let html = "<div class='div_container' id='role_" 
			           + obj.id + "'><div id='myMsg_" + obj.id 
								 + "' style='position: absolute; top: -35px; width: 500px;'></div><div class='div_role' id='myRole_" 
								 + obj.id + "'><img src='./images/roles/a" + getRandRoleImg() + ".jpg' /></div></div>"; 			
			console.log('feedback_where_I_am')
			console.log(html)
			$('.div_scene').append(html)
		}
	})

	socket.on('return_msg',function(obj){
		console.log('return_msg',obj)
		$('#myMsg_'+obj.id).html('[' + obj.time + '] ' + obj.name + ' 說: ' + obj.msg)
	})

	$('#txt_type').on('keypress', function(e){
		if(e.keyCode == 13){
			e.preventDefault()
			socket.emit('send_msg',{
				id:myID,
				name:myName,
				msg:$('#txt_type').val()
			})
		}
		$('#txt_type').val('')
	})

})

$(document).on('mousemove','.div_scene',function(event){
	current_x = event.pageX
	current_y = event.pageY
	$('#myInfo').html(
		'目前滑鼠座標：<br />' 
		+ 'top:' + current_x + '<br />' 
		+	'left:' + current_y + '<br />' 
		+	'人物座標：<br />' 
		+	'top: ' + old_x + ' <br />' 
		+	'left: ' + old_y
	)
})

$(document).on('click','.div_scene',function(event){
	if(current_x > old_x){
		imgVerticalNum = 2
	}
	else if(current_x < old_x){
		imgVerticalNum = 1
	}
	else{
		if ( current_y >= old_y){
			imgVerticalNum = 0
		}
		else if(current_y < old_y){
			imgVerticalNum = 3
		}
	}

	old_x = current_x
	old_y = current_y

	$(".div_container[id=role_" + myID + "]").animate({
		'left': (current_x - 35) + 'px',
		'top': (current_y - 35) + 'px'
		},
		{duration: 2000})	

	$('#myRole_' + myID + ' img').css({'top': imgVerticalNum * - 48 + 'px'})
})

//取得隨機人物圖案
function getRandRoleImg()
{
           //人物圖片編號（min = 第一張；max = 最後一張）。
           //未來這裡可以改成「登入時選擇」
           var min = 1;
           var max = 4;

           //取得隨機人物圖片編號
           var num = Math.floor( Math.random() * (max - min + 1) ) + min;

           //在此範例中，因為人物圖片是01 ~ 04，所以不足 10 要補 0 在字串前面
           if( num >= 10 )
           {
                     num = num.toString();
           }
           else
           {
                     num = '0' + num.toString();
           }

           return num;
}

//人物原地連續動作
function setAction()
{
           //共四個動作，故從0開始，到2就是最後一張的範圍。若是超過，就到第一個圖示
           if( imgHorizontalNum > 3 ) imgHorizontalNum = 0;

           //切換圖片
           $('.div_container img').css({
                     'left': imgHorizontalNum * - 31.5 + 'px'
           });
          
           imgHorizontalNum++;
}