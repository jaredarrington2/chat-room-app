$( document ).ready(function() {
  $(function () {
    var socket = io();
    // var username = moniker.choose();
    var _typing  = false;
    var _timeout = undefined;
    var _users   = [];
    function resetTyping() {
      _typing = false;
      socket.emit('user typing', false);
    }
    // var screenname = req.body;

    //get list of users and log to console.
    // $.ajax({
  	// 	method: 'GET',
  	// 	url: '/api/user/:username'
  	// }).then(function(results){
    //   const username = results;
    // });
    //add users to the user panel
    $.ajax({
  		method: 'GET',
  		url: '/api/chat'
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
    $("#m").keypress((e) => {
      if (e.which !== 13) {
        if (_typing === false && $('#m').is(':focus')) {
          _typing = true;
          socket.emit('user typing', true);
          _timeout = setTimeout(resetTyping, 3000);
        } else {
          clearTimeout(_timeout);
          _timeout = setTimeout(resetTyping, 3000);
        }
      }
      // socket.on('user typing', (isTyping) => {
      //   if (isTyping === true) {
      //     socket.broadcast.emit('user typing', $('#m').val(){
      //       nickname: socket.username,
      //       isTyping: true
      //     });
      //   } else {
      //     socket.broadcast.emit('user typing', {
      //       nickname: socket.username,
      //       isTyping: false
      //     });
      //   };
    });

        //add message data using enter key
    $('form').submit(function(){
      socket.emit('chat message', $('#m').val());
      $('#m').val('');
      return false;
    });
    socket.on('chat message', function(msg){
      $.ajax({
    		method: 'GET',
    		url: '/api/user/:username'
    	}).then(function(results){
        var username = results;
        console.log(username);
      $('#messages').append($('<li>').text(username + ": " + msg));
      });
    });

    //make sure send button sends message data
    $('button').click(function(){
      socket.emit('chat message', $('#m').val());
      $('#m').val('');
      return false;
    });
  });
});
