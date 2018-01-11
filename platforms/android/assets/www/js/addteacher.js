$(document).ready(()=>{
	
// Add Teacher Module

	// localStorage.setItem("api_token" , "ASD");
		// console.log(localStorage.getItem('api_token'));
		// onclick="openCity(event, 'add-School', 'Add School')"
		$(document).on(`click`, `#liaddteacher`, (e)=>{
			$(".sa").html(`<option value=""></option>`)
		})

$(document).on(`click`, `#liaddteacher`, (e)=>{

	if(localStorage.getItem('api_token') || !localStorage.getItem('api_token') == null)
	{
		arr = [];
		arr.length = 0;
		openCity(event, 'Add-teacher','Add Teacher');
	}else{
		$(".signoutClass").empty();
		$(".loginClass").show();
        toastr.info('Please login to add teacher.');

	}


});

/*===========================================##################========================================================*/
/*===========================================addteacher form starts========================================================*/
/*===========================================##################========================================================*/
$('#addteacher_btn').on('click',function (argument) {
	let grades_arr;

	var tname = $('.add_teacher_name').val();
	var email = $('.add_teacher_email').val();
	var tsubject = $('.add_teacher_subject').val();



	var grade = $('.add_teacher_grade').val();
	grade = grade.replace(/\s*,\s*/g, ",");



	var tabout = $('.add_teacher_about').val();
	let school = document.getElementById("teacher_school").value;
	var image = $('.add_teacher_image')[0].files[0];
	
	var zip=$('.add_teacher_zip').val();
	var taddress=$('.add_teacher_address').val();
	var state=$('#teacher_input_gradelevel').val().split(",");
	// if(image && image.size>2048){
		
	// 	toastr.warning("Image Size Must Be 2MB")
		
	// }
	console.log(image)
	if (image && !ValidateFileType(image)) {
		toastr.warning('Please enter a valid image (jpg, jpeg, png).');		
	}else
	if(image && image.size > 2097152){
		toastr.warning("File size should be maximum 2MB.")
	}
	else if(!validateName(tname)){
		
		if (tname =="") {
			toastr.warning('Please provide teacher name.');
		}else if(tname.length < 2){
			toastr.warning('Please provide minimum 2 characters for teacher name.');
		}else if(tname.length > 25){
			toastr.warning('Please provide maximum 25 characters for teacher name.');
		}else{
			toastr.warning('Please provide a valid teacher name.');
		}
	}
	else if(email && !check_email(email)){
		toastr.warning("Please provide a valid teacher email.");
	}
	
	else if(!validateWords(tsubject)){
		
		if (tsubject =="") {
			toastr.warning('Please provide teaching subject.');
		}else if (tsubject.length < 2){
			toastr.warning('Please provide minimum 2 characters for teaching subject.');
		}else if (tsubject.length > 50){
			toastr.warning('Please provide maximum 50 characters for teaching subject.');
		}else{
			toastr.warning('Please provide a valid teaching subject.');
		}
	}
	else if(!school){
		toastr.warning("Please select a valid teacher school.");
	}
	else if(!grade){
		toastr.warning("Please select a valid teacher grade.");
	}

	else{
		$('#addteacher_name').val($('#addteacher_name').val().trim());
			var formData = new FormData($('#teacherform')[0]);

			formData.append('name', tname);
			formData.append('email', email);
			formData.append('subject', tsubject);
			formData.append('school_id_fk', school);
			formData.append('grade', grade);
			
			formData.append('image', image);
			formData.append('about', tabout);
			// formData.append('state', state);
			formData.append('api_token', localStorage.getItem("api_token"))
			document.getElementsByClassName('loader')[0].style.display = "block";
			// let data1 = {name: tname, email: email, subject: tsubject, school_id_fk: school, grade: grades_arr, image: ima}
			$.ajax({
				url: `${base_url}/teachers`,
				type: 'POST',
				cache: false,
				processData: false,
				contentType: false,

				data: formData,
				success: function(res) {
					document.getElementsByClassName('loader')[0].style.display = "none";
					if(res.responseCode == 200){
						toastr.success('Teacher has been successfully added!');
						openCity(event, 'Search','TeachingSBS');
						$( '#teacherform' ).each(function(){

						    this.reset();
						});
					}
					else if(res.responseCode == 206){
		                $.each(res.message, function(index, value){
							toastr.error(`${index}`);
							
		                });
					}
					else if(res.responseCode == 204){
						toastr.warning('Invalid Token');
					}
				},
				 error : ()=>{
               toastr.warning("Please check your internet connection and try again.")
            }	
			});
		
			
		}
});

// $('.add_teacher_name').focusout(function (argument) {
// 	if(!validateWords($(this).val())){
// 		if ($(this).val() =="") {
// 			toastr.warning('Please Provide Teacher Name');
// 		}else{
// 			toastr.warning('Please Provide Valid Teacher Name');
// 		}
// 	}	
// });

// $('.add_teacher_subject').focusout(function (argument) {
// 	if(!validateWords($(this).val())){
		
// 		if ($(this).val() =="") {
// 			toastr.warning('Please Provide Teaching Subect');
// 		}else{
// 			toastr.warning('Please Provide Valid Teaching Subject');
// 		}
// 	}	
// });
$('.add_teacher_email').focusout(function (argument) {
	if(!(check_email($(this).val()) || $(this).val() =="")){

		if ($(this).val() =="") {
			toastr.warning('Please provide teacher email.');
		}else{
			toastr.warning('Please provide a valid teacher email.');
		}
	}	
});
/*$('.add_teacher_address').focusout(function (argument) {
	if($(this).val() !=""){
		
		$(this).closest('div').find('span').remove();
		$(this).closest('div').removeClass('has-error');
		$(this).closest('div').addClass('has-success');
	}else{
		
		$(this).closest('div').find('span').remove();
		$(this).after('<span class="error_messages">Please provide text only<span>');
		$(this).closest('div').addClass('has-error');
		$(this).closest('div').removeClass('has-success');
	}	
});
*/

/*$('.add_teacher_zip').focusout(function (argument) {
	if(validateNumber($(this).val()) || $(this).val()==""){

		$(this).closest('div').find('span').remove();
		$(this).closest('div').removeClass('has-error');
		$(this).closest('div').addClass('has-success');
		
	}else{

		$(this).closest('div').find('span').remove();
		$(this).after('<span class="error_messages">Please enter valid zip<span>');
		$(this).closest('div').addClass('has-error');
		$(this).closest('div').removeClass('has-success');
		
	}	
});
*/
// function  addteacherform(tnameO,taddressO,tsubjectO,taboutO,stateO,cityO,zipO,school_idO,imageO,gradeO,emailO) {
// 	var tname=tnameO.val();
// 	var email=emailO.val();
// 	var taddress=taddressO.val();
// 	var tsubject=tsubjectO.val();
// 	var tabout=taboutO.val();
// 	var state=stateO.val();
// 	var city=cityO.val();
// 	var zip=zipO.val();
// 	var grade=gradeO.val();
// 	var school_id=school_idO.val();
// 	var image=imageO.val().split('\\').pop();

// 	var isname;
// 	var isaddress;
// 	var issubject;
// 	var issabout;
// 	var isstate;
// 	var iscity;
// 	var iszip;
// 	var isimage;
// 	var isgrade;
// 	var isschool_id;
// 	var iseamil;




// 	if(validateWords(tname)){
// 		isname=true;
// 	}else{
// 		isname=false;
// 		if (tname =="") {
// 			toastr.warning('Please Provide Teacher Name');
// 		}else{
// 			toastr.warning('Please Provide Valid Teacher Name');
// 		}
// 	}

// 	if(check_email(email) || email=="" ){
// 		iseamil=true;

// 	}else{
// 		iseamil=false;
// 		if ($(emailO).val() =="") {
// 			toastr.warning('Please Provide Teacher Email');
// 		}else{
// 			toastr.warning('Please Provide Valid Teacher Email');
// 		}
// 	}
	
// /*	if(taddress !=""){
// 		isaddress=true;
// 		taddressO.closest('div').find('span').remove();
// 		taddressO.closest('div').removeClass('has-error');
// 		taddressO.closest('div').addClass('has-success');
// 	}else{
// 		isaddress=false;
// 		taddressO.closest('div').find('span').remove();
// 		taddressO.after('<span class="error_messages">Please provide text only<span>');
// 		taddressO.closest('div').addClass('has-error');
// 		taddressO.closest('div').removeClass('has-success');
// 	}
// */
// 	if(validateWords(tsubject)){
// 		issubject=true;
// 	}else{
// 		issubject=false;
// 		if (tsubject =="") {
// 			toastr.warning('Please Provide Teaching Subect');
// 		}else{
// 			toastr.warning('Please Provide Valid Teaching Subect');
// 		}
// 	}


// 	if(state !=""){
// 		isstate=true;
// 		stateO.closest('div').find('span').remove();
// 		stateO.closest('div').removeClass('has-error');
// 		stateO.closest('div').addClass('has-success');
// 	}else{
// 		isstate=false;
// 		stateO.closest('div').find('span').remove();
// 		stateO.after('<span class="error_messages">Please select a state<span>');
// 		stateO.closest('div').addClass('has-error');
// 		stateO.closest('div').removeClass('has-success');
// 	}

// /*	if(city !=""){
// 		iscity=true;
// 		cityO.closest('div').find('span').remove();
// 		cityO.closest('div').removeClass('has-error');
// 		cityO.closest('div').addClass('has-success');
// 	}else{
// 		iscity=false;
// 		cityO.closest('div').find('span').remove();
// 		cityO.after('<span class="error_messages">Please select a city<span>');
// 		cityO.closest('div').addClass('has-error');
// 		cityO.closest('div').removeClass('has-success');
// 	}
// */
// 	if(grade !=""){
// 		isgrade=true;
// 		gradeO.closest('div').find('.error_messages').remove();
// 		gradeO.closest('div').removeClass('has-error');
// 		gradeO.closest('div').addClass('has-success');
// 	}else{
// 		isgrade=false;
// 		gradeO.closest('div').find('.error_messages').remove();
// 		$('.bait_span').after('<span class="error_messages">Please select Grade Level<span>');
// 		gradeO.closest('div').addClass('has-error');
// 		gradeO.closest('div').removeClass('has-success');
// 	}

// /*	if(validateNumber(zip) || zip==""){
// 		iszip=true;
// 		zipO.closest('div').find('span').remove();
// 		zipO.closest('div').removeClass('has-error');
// 		zipO.closest('div').addClass('has-success');
// 	}else{
// 		iszip=false;
// 		zipO.closest('div').find('span').remove();
// 		zipO.after('<span class="error_messages">Please enter valid zip<span>');
// 		zipO.closest('div').addClass('has-error');
// 		zipO.closest('div').removeClass('has-success');
// 	}
// */
// 	if(validateFiles(image) || image==""){
// 		if ( image !="") {
// 			var file = imageO.get(0).files[0];
// 			// File size, in bytes
// 			var size = file.size;
// 			if (size <= 2097152) {
// 				isimage=true;
// 			}else{
// 				isimage=false;
// 				toastr.warning('Image size should be less than 2MB ');
// 			}			
// 		}
// 		else{
// 				isimage=true;
// 		}
// 	}else{
// 		isimage=false;
// 		toastr.warning('Please Select Only Image');
		
// 	}

// 	if(school_id !=""){
// 		isschool_id=true;

// 	}else{
// 		isschool_id=false;
// 		toastr.warning('Please Select School');

// 	}

// 	if (isname==true && isaddress== true && issubject== true   && (isimage== true || image=="") && (iseamil==true && iseamil !="") && isgrade== true && isschool_id== true) {
// 		return true;
// 	}else{
// 		return false;
// 	}
// }



/*===========================================##################========================================================*/
/*===========================================addteacher form ends========================================================*/
/*===========================================##################========================================================*/

})