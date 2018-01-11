$(document).ready(()=>{
	
let email;
let reset_code;
$(".forgot_btn").click(()=>{

	email = document.getElementsByClassName('forgot_email')[0].value;

	if(!email){
		toastr.warning(`Please enter your email`);
	}
	else{
		
		$.get(`${localStorage.getItem("base_url")}/attemptreset?email=${email}`, (res)=>{
			
			if(res.responseCode == 200){
				toastr.success('Reset code sent to your email, Please check your email');
				$('#forgotModal').modal('toggle');
				$('#codeModal').modal('toggle');
			}
			else if(res.responseCode == 204){
				toastr.error(res.message)
			}
			else if(res.responseCode == 203){
				toastr.error(res.message)
			}
			else{
				toastr.error('Internal server error')
			}
		});
	}
});

$(".code_btn").click(()=>{
	reset_code = document.getElementsByClassName('code')[0].value;
	document.getElementsByClassName('loader')[0].style.display = "block";
	$.post(`${localStorage.getItem("base_url")}/verifycode`, {email : email, reset_code : reset_code}, (data)=>{
		document.getElementsByClassName('loader')[0].style.display = "none";
		if(data.responseCode == 204){
			toastr.warning('Incorrect code');
		}
		else if(data.responseCode == 203){
			toastr.warning('Empty reset code');
		}
		else if(data.responseCode == 200){
			toastr.success('Now please reset your password');
			$('#codeModal').modal('toggle');
			$('#resetModal').modal('toggle');
		}
		else{
			toastr.error('Internal server error');
		}
	});
});

$(".reset_password").click(()=>{
	let password = document.getElementsByClassName('fPassword')[0].value;
	let password_confirmation = document.getElementsByClassName('cPassword')[0].value;
	if(!password || password.length == 0){
			toastr.warning("Please enter password")
		}
		else if(password.length < 6){
			toastr.warning("Please enter minimum 6 character password")
		}
		else if(password.length > 15){
			toastr.warning("Please enter maximum 15 character password")
		}
		else if(password.indexOf(' ') !== -1){
			toastr.warning("Spaces are not allowed in password")
		}
		else if(password_confirmation.length == 0){
			toastr.warning("Please Enter Confirm Password")
		}
		else if(password !== password_confirmation){
			toastr.warning("Password does not match")
		}
		else{
			$.post(`${base_url}/resetpassword`, {email : email, reset_code : reset_code, password : password, password_confirmation : password_confirmation}, (res)=>{

				if(res.responseCode == 200){
					toastr.success('Your password has been reset');
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