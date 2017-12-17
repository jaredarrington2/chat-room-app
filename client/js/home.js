$(document).ready(function(){

	$('#sign_up_form').on('submit', function(e){
		e.preventDefault();
		var signUpObj = {
			name: $('#name-input').val(),
			last: $('#last-input').val(),
			email: $('#sign-up-email-input').val(),
			password: $('#sign-up-password-input').val(),
			confirm_password: $('#confirm_password-input').val()
		}

		$.ajax({
			method: 'POST',
			url: '/api/sign-up',
			data: signUpObj
		}).then(function(res){
			console.log(res)
		})

	})

	$('#sign_in_form').on('submit', function(e){

		e.preventDefault();
		var signInObj = {
			email: $('#sign-in-email').val(),
			password: $('#sign-in-password').val()
		}
    

		$.ajax({
			method: 'POST',
			url: '/api/sign-in',
			dataType: 'json',
			data: JSON.stringify(signInObj),
			contentType: 'application/json'
		}).then(function(res){
			console.log(res)
			// if(res.error === "Incorrect Password"){
			// 	alert("Incorrect Password")
			// } else {
			window.location.href = '/api/profile/' + res.results.rows[0].id
			// }
		});

		$('#sign-in-email').val("");
		$('#sign-in-password').val("");
	});
});
