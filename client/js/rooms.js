$(document).ready(function() {

  //shows room names
  $.ajax({
    method: 'GET',
    url: '/api/chatrooms'
  }).then(function(results) {
    var newRow, roomnum, doorRm, user_count, xButton;
    for (var i = 0; i < results.chatrooms.length; i++) {
      newRow = $('<tr class="song-row">')
      joinbtn = $('<button id="joinrm" data-room_name=' + results.chatrooms[i].room_name + '>Join</button>')
      roomnum = $('<td>');
      doorRm = $('<td>');
      user_count = $('<td>');
      xButton = $('<button class="btn btn-danger x-button" data-id=' + results.chatrooms[i].room_name.id + '>');
      xButton.css({
        padding: "0px 4px 0px 4px",
        float: 'right'
      })
      xButton.text("x");

      roomnum.text(i + 1);
      doorRm.text(results.chatrooms[i].room_name);
      user_count.text(results.chatrooms[i].rowCount);
      newRow.append(roomnum).append(doorRm).append(user_count).append(joinbtn).append(xButton);
      $('#tbody').append(newRow)
    }
  })

  $(document).on('click', '#joinrm', function() {
    var roomName = $(this).data('room_name');
    window.location.href = '/chatroom-joined-' + roomName;
  })
});

  // function updateChatRoom() {
  //   $.ajax({
  //     method: 'GET',
  //     url: '/api/chatrooms',
  //     success: function(response) {
  //       console.log(results);
  //       var newRow, roomnum, doorRm, user_count, xButton;
  //       for (var i = 0; i < results.chatrooms.length; i++) {
  //         newRow = $('<tr class="song-row">')
  //         joinbtn = $('<button id="joinrm" data-room_name=' + results.chatrooms[i].room_name + '>Join</button>')
  //         roomnum = $('<td>');
  //         doorRm = $('<td>');
  //         user_count = $('<td>');
  //         xButton = $('<button class="btn btn-danger x-button" data-id=' + results.chatrooms[i].room_name.id + '>');
  //         xButton.css({
  //           padding: "0px 0px 0px 4px",
  //           float: 'right'
  //         })
  //         xButton.text("x");
  //
  //         roomnum.text(i + 1);
  //         doorRm.text(results.chatrooms[i].room_name);
  //         user_count.text(results.chatrooms[i].length);
  //         newRow.append(roomnum).append(doorRm).append(user_count).append(joinbtn).append(xButton);
  //         $('#tbody').append(newRow)
  //       }
  //       $('.container').append(newRow)
  //     }
  //   })
  // }
  //
  // updateChatRoom();

  // $('#submit-this').on('submit', function() {
  //   //Adds new row to Table
  //   $.ajax({
  //     method: 'POST',
  //     url: '/api/create-room',
  //     src: $('#name-input').val()
  //   }).then(function(yep) {})
  // })
  //
  // var Obj = {
  //   name: $('#name-input').val()
  // };


//   $.ajax({
//     method: 'POST',
//     url: '/api/create-room',
//     dataType: 'json',
//     data: JSON.stringify(Obj),
//     contentType: 'application/json'
//   }).then(function(res) {
//     if (res === "null_message") {
//       alert("Please Enter Room Name")
//     }
//     updateChatroom();
//   });
//   $('#name-input').val("");
// })
