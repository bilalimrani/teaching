$(document).ready(()=>{
	
let email;
let reset_code;
$(".forgot_btn").click(()=>{

	email = document.getElementsByClassName('forgot_email')[0].value;

	if(!email){
		toastr.warning(`Please enter your email.`);
	}
	else{
		
		$.get(`${localStorage.getItem("base_url")}/attemptreset?email=${email}`, (res)=>{
			
			if(res.responseCode == 200){
				toastr.success(`A reset code has been sent to your email.`);
				document.getElementsByClassName('forgot_email')[0].value = ''
				$('#forgotModal').modal('toggle');
				$('#codeModal').modal('toggle');
			}
			else if(res.responseCode == 204){
				toastr.error(res.message)
			}
			else if(res.responseCode == 203){
				toastr.error(res.message)
			}
			else if(res.responseCode == 403){
				toastr.error('This email address needs to be activated.')
			}
			else{
				toastr.error(res.message)
			}
		})
		.fail(function() {
					document.getElementsByClassName('loader')[0].style.display = "none"
				    toastr.warning("Please check your internet connection and try again.")
				  })
	}
});

$(".code_btn").click(()=>{
	reset_code = document.getElementsByClassName('code')[0].value;
	document.getElementsByClassName('loader')[0].style.display = "block";
	$.post(`${localStorage.getItem("base_url")}/verifycode`, {email : email, reset_code : reset_code}, (data)=>{
		document.getElementsByClassName('loader')[0].style.display = "none";
		console.log("ressss",data)
		if(data.responseCode == 204){
			toastr.warning('The code entered is incorrect.');
		}
		else if(data.responseCode == 203){
			toastr.warning('The code entered is empty.');
		}
		else if(data.responseCode == 200){
			// toastr.success('Now please reset your password');
			$('#codeModal').modal('toggle');
			$('#resetModal').modal('toggle');
			document.getElementsByClassName('code')[0].value = ''
		}
		else{
			toastr.error(data.message);
		}
	})
	.fail(function() {
					document.getElementsByClassName('loader')[0].style.display = "none"
				    toastr.warning("Please check your internet connection and try again.")
				  })
});

$(".reset_password").click(()=>{
	let password = document.getElementsByClassName('fPassword')[0].value;
	let password_confirmation = document.getElementsByClassName('cPassword')[0].value;
	if(!password || password.length == 0){
			toastr.warning("Please enter password.")
		}
		else if(password.length < 6){
			toastr.warning("Please enter minimum 6 characters for password.")
		}
		else if(password.length > 15){
			toastr.warning("The password cannot be longer than 15 characters.")
		}
		else if(password.indexOf(' ') !== -1){
			toastr.warning("Please remove spaces from your password.")
		}
		else if(password_confirmation.length == 0){
			toastr.warning("Please enter confirm password.")
		}
		else if(password !== password_confirmation){
			toastr.warning("Password does not match.")
		}
		else{
			$.post(`${base_url}/resetpassword`, {email : email, reset_code : reset_code, password : password, password_confirmation : password_confirmation}, (res)=>{

				if(res.responseCode == 200){
					document.getElementsByClassName('fPassword')[0].value = '';
					document.getElementsByClassName('cPassword')[0].value = '';
					toastr.success('Your password has been reset.');
					
					$('#resetModal').modal('toggle');
				}
				else if(res.responseCode == 206){
					toastr.error(res.response.password[0])
				}
				else{
					toastr.error('Error')
				}
			})
		}
})


})