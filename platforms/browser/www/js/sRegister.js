$(document).ready(()=>{
	
$(document).on('click', '.register-passwrd', (e)=>{
	console.log('test');
	$('.ajax').select2('data', null);
	$('.ajax').select2('data', {id: null, text: null});
	$('.ajax').text("");

});
$(".sRegister_btn").click(()=>{
	let first_name = document.getElementById("sfirst_name").value;
	let last_name = document.getElementById("slast_name").value;
	let register_city = document.getElementById("sregister_city").value;
	let register_state = document.getElementsByClassName("sregister_state")[0].value;
	let email = document.getElementById("semail").value;

	let school = document.getElementsByClassName('pro_sch1')[0].value;
	let sgrade = document.querySelector('.sg').id;
	let register_password = document.getElementById("sregister_password").value;
	let register_confirm_password = document.getElementById("sregister_confirm_password").value;
	let role = "student";
	
	var reg_name = /^[a-zA-Z\s\.]+$/; /*ONLY words with single space*/

	if(role == undefined){
		toastr.warning('Please select role');
	}
	else if(first_name.length == 0){
		toastr.warning('Please Enter First Name');
	}
	else if (!(reg_name.test(first_name))) {
		toastr.warning('Please Enter Valid First Name');
	}
	else if(first_name.length < 2){
		toastr.warning('Please Enter minimum 2 characters in first name field');
	}
	else if(first_name.length > 25){
		toastr.warning('Please Enter maximum 25 characters in first name field');
	}
	else if(last_name.length == 0){
		toastr.warning('Please Enter last name');
	}
	else if (!(reg_name.test(last_name))) {
		toastr.warning('Please Enter Valid Last Name');
	}
	else if(last_name.length < 2){
		toastr.warning('Please Enter minimum 2 characters in last name field');
	}
	else if(last_name.length > 25){
		toastr.warning('Please Enter maximum 25 characters in last name field');
	}
	else if(register_city.length == 0){
		toastr.warning('Please Enter city name');
	}
	else if (!(reg_name.test(register_city))) {
		toastr.warning('Please Enter Valid City');
	}
	else if(register_city.length < 2){
		toastr.warning('Please Enter Minimum 2 characters in city name field');
	}
	else if(register_city.length > 25){
		toastr.warning('Please Enter Maximum 25 Characters in city name field');
	}
	else if(register_state.length == 0){
		toastr.warning('Please select state');
	}
	else if(!school){
		toastr.warning('Please select school');
	}
	
	else if(!sgrade){
		toastr.warning('Please select grade');
	}
	
	else if(email){
		if (check_email(email)) {
			if(register_password.length == ""){
				toastr.warning('Please Enter Password');
			}
			else if(register_password.length < 6 && email){
				toastr.warning('Please Enter minimum 6 character Password');
			}
			else if(register_password.length > 15 && email){
				toastr.warning('Please Enter maximum 15 character Password');
			}
			else if(register_password.length >= 6){
				if (register_confirm_password.length == 0) {
					toastr.warning('Please Enter Confirm Password');
				}else
				if(register_password == register_confirm_password){
					if (!Svalpass) 
					{
						toastr.warning('Please Enter Correct Password');
					}else if (!Svalcpass) 
					{
						toastr.warning('Please Enter Correct Confirm Password');
					}else
					{
						document.getElementsByClassName('loader')[0].style.display = "block";
						$.post(`${base_url}/reg`, {role : role, fName : first_name, lName : last_name, school_id_fk : school, email : email, city : register_city, grade : sgrade, state : register_state, password : register_password, password_confirmation : register_confirm_password}, (data)=>{
							document.getElementsByClassName('loader')[0].style.display = "none";
							$("#registerModal").modal('toggle')
							if(data.responseCode == 200){
								toastr.success('A verification link has been sent to your inbox. Please click on the link to verify your email and activate your account.');
							}
							else if(data.responseCode == 206){
								toastr.error('An account with this email address already exists in the system');
							}
						})
					}
				}
				else{
					toastr.warning('Password does not match');
				}
			}
		}else{
			toastr.warning('Please enter valid email address');
		}
	}
	else{
		toastr.warning('Please enter an email address');
	}
});


let Svalpass;
let Svalcpass;
function validatePassword(password){  
	var reg = /^\S*$/;   
	var min_max = /^.{6,15}$/;
	if(reg.test(password) && min_max.test(password)){
		return true;
	}else{  
		return false;
	}  
}

function confirmPassword(val,val2){  
	if(val === val2 && val !=""){
		return true;
	}else{  
		return false;
	}  
}

$('#sregister_password').focusout(function (argument) {
	if(validatePassword($(this).val())){

		Svalpass = true;
		$(this).closest('div').find('label').remove();
		$(this).closest('div').removeClass('has-error');
		$(this).closest('div').addClass('has-success');
	}else{

		Svalpass = false;
		$(this).closest('div').find('label').remove();
		if ($(this).val() =="") {
			$(this).after('<label class="error_messages">Please enter password<label>');
		}else{
			$(this).after('<label class="error_messages">Password must be 6-15 characters long. Special characters are allowed. Do not enter spaces.<label>');
		}
		$(this).closest('div').addClass('has-error');
		$(this).closest('div').removeClass('has-success');
	}
});

$('#sregister_confirm_password').focusout(function (argument) {
	if(confirmPassword($('#sregister_password').val(),$(this).val())){

		Svalcpass = true;
		$(this).closest('div').find('label').remove();
		$(this).closest('div').removeClass('has-error');
		$(this).closest('div').addClass('has-success');
	}else{
		$(this).closest('div').find('label').remove();
		if ($(this).val() =="") {
			$(this).after('<label class="error_messages">Please confirm password<label>');
		}else{
			$(this).after('<label class="error_messages">Password does not match<label>');
			Svalcpass = false;
		}
		$(this).closest('div').addClass('has-error');
		$(this).closest('div').removeClass('has-success');
	}

});
})