$(document).ready(()=>{
	console.log("ok")

$(".btn_profileUpdate").click(()=>{
	let formData = new FormData($('#profile-editable')[0]);
	console.log(document.getElementsByClassName('pro_C')[0].value)
	formData.append('fName', document.getElementsByClassName('f_name')[0].value);
	formData.append('lName', document.getElementsByClassName('l_name')[0].value);
	formData.append('city', document.getElementsByClassName('pro_C')[0].value);
	formData.append('state', document.getElementsByClassName('pro_S')[0].value);
	console.log("school",document.getElementsByClassName('pro_sch')[0].value)
	
	formData.append('image', $('.profile_pic')[0].files[0]);
	formData.append('api_token', localStorage.getItem("api_token"));

	
	var reg_name = /^[a-zA-Z\s\.]+$/; /*ONLY words with single space*/

	if(localStorage.getItem("role") == "student"){
		formData.append('school_id_fk', document.getElementsByClassName('pro_sch')[0].value);
		formData.append('grade', document.getElementsByClassName('pro_G')[0].value);
	}

	let pro_first_name = document.getElementsByClassName("f_name")[0].value;
	let pro_last_name = document.getElementsByClassName("l_name")[0].value;
	let pro_city = document.getElementsByClassName("pro_C")[0].value;
	let pro_state = document.getElementsByClassName("pro_S")[0].value;
	let pro_school = document.getElementsByClassName("pro_sch1")[0].value;

	
	if ($('.profile_pic')[0].files[0] && !ValidateFileType($('.profile_pic')[0].files[0])) {
		toastr.warning('Please Enter Valid Image (jpg, jpeg, png)');		
	}
	else if ($('.profile_pic')[0].files[0] && !ValidateFileSize($('.profile_pic')[0].files[0])) {
		toastr.warning('File size maximum 2MB');
	}
	else if(pro_first_name.length == 0){
		toastr.warning('Please Enter first name');
	}
	else if (!(reg_name.test(pro_first_name))) {
		toastr.warning('Please Enter Valid First Name');
	}
	else if(pro_first_name.length < 2){
		toastr.warning('Please Enter minimum 2 characters in first name field');
	}
	else if(pro_first_name.length > 25){
		toastr.warning('Please Enter maximum 25 characters in first name field');
	}
	else if(pro_last_name.length == 0){
		toastr.warning('Please Enter last name');
	}
	else if (!(reg_name.test(pro_last_name))) {
		toastr.warning('Please Enter Valid Last Name');
	}
	else if(pro_last_name.length < 2){
		toastr.warning('Please Enter minimum 2 characters in last name field');
	}
	else if(pro_last_name.length >25){
		toastr.warning('Please Enter maximum 25 characters in last name field');
	}
	else if(pro_city.length == 0){
		toastr.warning('Please Enter city name');
	}
	else if (!(reg_name.test(pro_city))) {
		toastr.warning('Please Enter Valid City');
	}
	else if(pro_city.length < 2){
		toastr.warning('Please Enter minimum 2 characters in city name field');
	}
	else if(pro_city.length > 25){
		toastr.warning('Please Enter maximum 25 characters in city name field');
	}
	else if(pro_state.length == 0){
		toastr.warning('Please select state');
	}
	else{
		document.getElementsByClassName('loader')[0].style.display = "block"
		$.ajax({
			url: `${localStorage.getItem("base_url")}/userUpdate`,
			type: 'POST',
			cache: false,
			processData: false,
			contentType: false,

			data: formData,
			success: resultFunc
		});
	}	
});

function resultFunc(res){
	
	document.getElementsByClassName('loader')[0].style.display = "none"
	if(res.responseCode == 200){
		console.log(res)
		document.getElementsByClassName('pro_N')[0].innerHTML = `${res.response.fName} ${res.response.lName}`;
		document.getElementsByClassName('pro_name')[0].innerHTML = `${res.response.fName} ${res.response.lName}`;
		document.getElementsByClassName('f_name')[0].value = res.response.fName;
		document.getElementsByClassName('l_name')[0].value = res.response.lName;
		document.getElementsByClassName('pro_C')[0].value = res.response.city;
		document.getElementsByClassName('pro_S')[0].value = res.response.state;
		$(".pro_sch").html(`<option value=${res.response.school_id_fk}>${res.response.school_name}</option>`)
		document.getElementsByClassName('pro_G')[0].value = res.response.grade;
		console.log('yes',localStorage.getItem("user_img_url"));
		if(res.response.image){
			$(".profile-icon").css('background-image', `url(${localStorage.getItem("user_img_url")}/${res.response.image})`);
			
		}
		else{
			$(".profile-icon").css('background-image', `url("images/top-io.jpg")`)
		}
		if(res.response.image){
			$(".pro_img").attr('src', `${localStorage.getItem("user_img_url")}/${res.response.image}`)
		}
		else{
			$(".pro_img").attr('src', 'images/top-io.jpg')
		}

		setLocalValues(res)
		toastr.success("Profile updated");

	}
	else if(res.responseCode == 203){
		toastr.warning(res.message)
	}
	else if(res.responseCode == 206){
		toastr.warning(res.message)
	}
	else{
		toastr.error("Internal server error")
	}

};

function setLocalValues(res){
	localStorage.setItem("first_name", res.response.fName);
	localStorage.setItem("last_name", res.response.lName);
	localStorage.setItem("image", res.response.image);
	localStorage.setItem("city", res.response.city);
	localStorage.setItem("state", res.response.state);
	localStorage.setItem("grade", res.response.grade);
	localStorage.setItem("school_name", res.response.school_name);
	localStorage.setItem("school_id_fk", res.response.school_id_fk);
	localStorage.setItem("school", res.response.school_id_fk);
	localStorage.setItem("image", res.response.image);
}
})