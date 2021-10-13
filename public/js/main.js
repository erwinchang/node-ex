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

	$('#txt_type').on('keypress', function(e){
		console.log('txt_type - keypress %d',e.keyCode)
	})

})

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