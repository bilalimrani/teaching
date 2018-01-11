$(document).ready(()=>{
	

	$(".login_btn").click(()=>{
		loginFunc();
	});

	$('input').keypress(function(e) {
		var code = (e.keyCode ? e.keyCode : e.which);
	    if ( (code==13) || (code==10)){
	    	e.preventDefault();
	    	if ($(this).parents('#student-register').find('button').length) 
	    	{
	    		$(this).parents('#student-register').find('button').click();
	    	}else
	    	if ($(this).parents('#parent-register').find('button').length) 
	    	{
	    		$(this).parents('#parent-register').find('button').click();
	    	}else
	    	if ($(this).closest('.profile-page').find('button').length) 
	    	{
	    		$(this).closest('.profile-page').find('button').click();
	    	}else{
		    	console.log('testing keypress', $(this).closest('form').find('button'));
				$(this).closest('form').find('button').click();
			}
	    }
	});

	function loginFunc(){
		let Password = $(".login_password").val();
		let email = $(".login_email").val();
		if(email && email.includes("@")){
			if(Password.length == ""){
				toastr.warning('Please Enter Password');
			}
			else if(Password.length < 6 && email){
				toastr.warning('Please Enter minimum 6 character');
			}
			else if(Password.length >= 6){
				document.getElementsByClassName('loader')[0].style.display = "block";
				$.post(`${base_url}/login`, {email : email, password : Password}, (data)=>{
					
					document.getElementsByClassName('loader')[0].style.display = "none";
					if(data.responseCode == 204){
						toastr.warning('Either Your Email or Password has been entered incorrectly.');
					}

					else if(data.responseCode == 200){
						toastr.success("Logged in Successfully");
						data = jQuery.parseJSON(JSON.stringify(data));
						localStorage.setItem("user_token" , "");
						localStorage.setItem("user_id", data.response.id);
						localStorage.setItem("api_token", data.response.api_token);
						localStorage.setItem("first_name", data.response.fName);
						localStorage.setItem("last_name", data.response.lName);
						localStorage.setItem("email", data.response.email);
						localStorage.setItem("image", data.response.image);
						localStorage.setItem("role", data.response.role);
						localStorage.setItem("city", data.response.city);
						localStorage.setItem("state", data.response.state);
						localStorage.setItem("grade", data.response.grade);
						localStorage.setItem("school_name", data.response.school_name);
						localStorage.setItem("school", data.response.school_id_fk);
						localStorage.setItem("school_id", data.response.school_id_fk);
						localStorage.setItem("user_img_url", data.response.user_img_url);
						$(".loginClass").empty();
						document.getElementById('menu_pro').style.display = "block";
						if(localStorage.getItem("api_token") == null || localStorage.getItem("api_token") == "null"){
							document.getElementById('menu_pro').style.display = "none";
						}
						else{
							document.getElementById('menu_pro').style.display = "block";
						}
						if(localStorage.getItem("image") == null || localStorage.getItem("image") == "null" ){
							$(".pro_img").attr('src', 'images/top-io.jpg')

						}
						else{
							$(".pro_img").attr('src', `${localStorage.getItem("user_img_url")}/${localStorage.getItem("image")}`)
						}
						document.getElementsByClassName('pro_name')[0].innerHTML = `${localStorage.getItem("first_name")} ${localStorage.getItem("last_name")}`;

						if(localStorage.getItem("email") == null || localStorage.getItem("email") == "null" ){
							document.getElementsByClassName('pro_email')[0].innerHTML = "";

						}
						else{
							document.getElementsByClassName('pro_email')[0].innerHTML = localStorage.getItem("email");
						}

						document.getElementsByClassName('pro_N')[0].innerHTML = `${localStorage.getItem("first_name")} ${localStorage.getItem("last_name")}`;
						document.getElementsByClassName('pro_R')[0].innerHTML = localStorage.getItem("role");
						document.getElementsByClassName('f_name')[0].value = localStorage.getItem("first_name");
						document.getElementsByClassName('l_name')[0].value = localStorage.getItem("last_name");
						document.getElementsByClassName('pro_E')[0].value = localStorage.getItem("email");
						document.getElementsByClassName('pro_C')[0].value = localStorage.getItem("city");
						document.getElementsByClassName('pro_S')[0].value = localStorage.getItem("state");
						console.log("role",localStorage.getItem("role"))
						if(localStorage.getItem("role") == "parent"){
							
							$(".profile-row-four-hide").hide();
							$(".profile-row-five-hide").hide();
						}
						else{
							$(".profile-row-four-hide").show();
							$(".profile-row-five-hide").show();
						}
						if(localStorage.getItem("image") == "null" || localStorage.getItem("image") == "null"){
							$(".profile-icon").css('background-image', `url("images/top-io.jpg")`)
						}
						else{
							
							$(".profile-icon").css('background-image', `url(${localStorage.getItem("user_img_url")}/${localStorage.getItem("image")})`)
						}
						
						if(localStorage.getItem("school_name") == "null"){
							$(".pro_sch").html(`<option>N/A</option>`)
							document.getElementsByClassName('pro_sch')[0].value = "N/A";
						}
						else{
							$(".pro_sch").html(`<option value=${localStorage.getItem("school")}>${localStorage.getItem("school_name")}</option>`)
							
						}

						if(localStorage.getItem("grade") == "null"){
							document.getElementsByClassName('pro_G')[0].value = "N/A";
						}
						else{
							document.getElementsByClassName('pro_G')[0].value = localStorage.getItem("grade");
						}
						
						if(localStorage.getItem("api_token")){
							$(".loginClass").empty();
							$(".signoutClass").html("sign out");
						}
						else{
							$(".signoutClass").empty();
							$(".loginClass").show();
						}
						document.getElementsByClassName('dismiss')[0].click();

					}else if (data.responseCode == 203){
						toastr.warning(`${data.message}`);
					}
					else if(data.responseCode == 403){
						toastr.warning("Please Activate Your Account Before Login");
					}
				})
}
}
else{
	toastr.warning('Please Enter valid email');
}
	}
})