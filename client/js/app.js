$( document ).ready(function() {
  $(function () {
    var socket = io();
    // var screenname = req.body;

    //get list of users and log to console.
    $.ajax({
  		method: 'GET',
  		url: '/api/username'
  	}).then(function(results){
      console.log(results.username);
    });
    //add users to the user panel
    $.ajax({
  		method: 'GET',
  		url: '/api/room'
  	}).then(function(res){
      console.log(res.roomname);
      //add usernames to active users panel
      for(var i = 0; i < res.roomname[0].active_users.length; i++){
        console.log(res.roomname[0].active_users[i]);
        socket.on('connection', function(){
          $('#users').append($('<li>').text(res.roomname[0].active_users[i]));
        })
        socket.emit('active users', $('#users'), function(){
          $('#users').append($('<li>').text(res.roomname[0].active_users[i]));
      });
    };
    });
    // $.ajax({
    //   method: 'POST';
    //   url: 'api/add-user'
    // });
        //add message data using enter key
    $('form').submit(function(){
      socket.emit('chat message', $('#m').val());
      $('#m').val('');
      return false;
    });
    socket.on('chat message', function(msg){
      $('#messages').append($('<li>').text("username" + ": " + msg));
    });
    //make sure send button sends message data
    $('button').click(function(){
      socket.emit('chat message', $('#m').val());
      $('#m').val('');
      return false;
    });
  });
});
