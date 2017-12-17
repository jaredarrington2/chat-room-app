$(document).ready(function(){

	$('#guestbook-form').on('submit', function(e){
		e.preventDefault();

		var guestBookObj = {
			chatroom: $('#name-input').val(),
			message: $('#message-input').val()
		}

		$.ajax({
			method: 'POST',
			url: '/api/message',
			dataType: 'json',
			data: JSON.stringify(guestBookObj),
			contentType: 'application/json'
		}).then(function(res){
			if(res === "null_message"){
				alert("Please Enter Message")
			}
			appendGuestbook();
		});

		$('#name-input').val("");
		$('#message-input').val("");
	});

	function appendGuestbook(){
		$('#all-div').remove();
		$.ajax({
			method: 'GET',
			url: '/api/messages'
		}).then(function(messages){
			var allDiv = $('<div id="all-div">');
			var guestDiv, nameP, messageP, xButton;
			messages.rows.sort(function(a, b) {
				return a.id - b.id;
			});
			for(var i = 0 ; i < messages.rows.length; i++){
				guestDiv = $('<div class="well guest-div">');
				guestDiv.css({display: 'inline-block', margin: '10px', overflow: 'hidden'});

				xButton = $('<button class="btn btn-danger x-button" data-id=' + messages.rows[i].id + '>');
				xButton.css({padding: "0px 4px 0px 4px", float: 'right'})
				xButton.text("x");

				nameP = $('<p>');
				messageP = $('<p class="message" data-id=' + messages.rows[i].id + '>');

				nameP.text("Name: " + messages.rows[i].name);
				nameP.css({fontWeight: 'bold'})
				messageP.text("Message: " + messages.rows[i].message);
				guestDiv.append(xButton).append(nameP).append(messageP);
				allDiv.append(guestDiv);
			}
			$('#everything-div').append(allDiv)
		});
	}
	appendGuestbook();

	$(document).on('click', '.x-button', function(){
		$.ajax({
			method: 'DELETE',
			url: '/api/delete-message/' + $(this).data('id')
		});
		appendGuestbook();
	});

	$(document).on('click', '.message', function(){
		$('#modal-input-div').remove();
		var messageId = $(this).data('id');
		$('#update-message-modal').modal();

		var inputDiv = $('<div id="modal-input-div">');

		$.ajax({
			method: 'GET',
			url: '/api/messages'
		}).then(function(messages){
			for(var i = 0; i < messages.rows.length; i++){
				if(messages.rows[i].id == messageId){
					var textInput = $("<textarea id='message-update-input'>");
					textInput.val(messages.rows[i].message);
					inputDiv.append(textInput);
				}
			}
			var submitButton = $('<button>');
			submitButton.addClass('btn btn-info enter-button');
			submitButton.attr('data-id', messageId);
			submitButton.text("Enter");
			inputDiv.append("<br>").append(submitButton);
		});
		$('.modal-body').append(inputDiv);
	});

	$(document).on('click', '.enter-button', function(){
		var updatedMessage = $("#message-update-input").val();

		if(updatedMessage !== ""){
			$.ajax({
				method: 'PUT',
				url: '/api/update-message/' + $(this).data('id'),
				data: {message: updatedMessage}
			}).then(function(res){
				appendGuestbook();
				$('#update-message-modal').modal('toggle');
			});
		} else {
			alert ('Please Enter Text')
		}

	});

});
