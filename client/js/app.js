$(document).ready(function() {
  //send message to users
    var socket = io();
    var join_button = $('#join_button');
    var door = "abc"
    var chatroom_name=[];
    $('form').submit(function(){
      socket.emit('chat message', $('#m').val());
      $('#m').val('');
      return false;
    });
    socket.on('chat message', function(msg){
      $('#messages').append($('<li>').text(msg));
      window.scrollTo(0, document.body.scrollHeight);
    });
  })

  // $.ajax({
  //   method: 'GET',
  //   url: '/x/chatrooms'
  // }).then((rooms) => {
  //   for (var i = 0; i < rooms.length; i++) {
  //     join_room[i]
  //   }
  //   console.log(j)
  // })

  $.ajax({
		method: 'GET',
		url: '/api/chatrooms'
	}).then(function(results){
		var newRow, numTd, artistTd, titleTd;
		for(var i = 0; i < results.chatrooms.length; i++){
			newRow = $('<tr class="song-row" data-song_name=' + results.chatrooms[i].room_name.split(" ").join("+").toLowerCase() +'>')
			numTd = $('<td>');
			artistTd = $('<td>');
			titleTd = $('<td>');

			numTd.text(i + 1);
			artistTd.text(results.chatrooms[i].room_name);
			titleTd.text(results.chatrooms[i].user_id);
			newRow.append(numTd).append(artistTd).append(titleTd);
			$('#tbody').append(newRow)
		}
	});

	$(document).on('click', '.song-row', function(){
		var roomName = $(this).data('room_name');
		window.location.href = '/api/chatrooms/' + roomName;
	});
