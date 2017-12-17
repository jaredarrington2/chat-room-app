function showRooms(doors){
	var spanStr = "";
	var roomArr = doors.split("\n");
	for(var i = 0; i < roomArr.length; i++){
		spanStr += "<span>" + roomArr[i] + "</span><br>"
	}
	return spanStr;
}

module.exports = (obj) => {
	var str = "<html>";
	str += "<head><title>" + chatroom + "</title>"
	str += "<link rel='stylesheet' href='../css/styles.css'></head>";
	str += "<a href='/'><button class='btn btn-warning'><span class='glyphicon glyphicon-home' aria-hidden='true'></span></button></a>"
	str += '<body><ul id="messages">' + '</ul><br>';
	str += '<form action="">'
	str += '<input id="m" autocomplete="off"/>' + '<button>' + Send + '</button>'
	str += '</form>'
	str += showRooms(obj.doors)
	str += "<script src='https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js'></script>";
	str += "<script src='https://code.jquery.com/jquery-1.11.1.js'></script>";
	str += "<script type='text/javascript' src='../js/app.js'></script>";
	str += "</body></html>";
	return str;
}
