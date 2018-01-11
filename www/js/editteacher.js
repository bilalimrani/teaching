$(document).ready(()=>{
	
let t_id;
$(document).on(`click`, `.btn_edit_teacher`, (e)=>{
	arr = [];
	arr.length = 0;
	
    document.getElementsByClassName('loader')[0].style.display = "block";
	t_id = e.target.dataset.id;
	if(localStorage.getItem('api_token') || !localStorage.getItem('api_token') == null)
	{
		document.getElementsByClassName('loader')[0].style.display = "none";
		openCity(event, 'Edit-teacher','Edit Teacher');
		$.ajax({
			url : `${localStorage.getItem("base_url")}/teacher/${t_id}`,
			method : "GET",
			success : showteacheronedit,
			 error : ()=>{
			 	document.getElementsByClassName('loader')[0].style.display = "none"
               toastr.warning("Please check your internet connection and try again.")
            }	
		});

	}else{
        $(".signoutClass").empty();
        $(".loginClass").show();
        toastr.info('Please login to edit teacher.');

	}
	document.getElementsByClassName('loader')[0].style.display = "none";
});

function showteacheronedit(res) {

	// console.log(res, JSON.parse(res.response.teacher.grade.length), arr.push(res.response.teacher.grade));
	// let len = JSON.parse(res.response.teacher.grade)
	// console.log("len",len.split(","))

	if (res.response.teacher.addedby == localStorage.getItem('user_id')) 
	{
		$('.edit_teacher_name').val(res.response.teacher.name);
		$('.edit_teacher_email').val(res.response.teacher.email);
		$('.edit_teacher_subject').val(res.response.teacher.subject);
		// $('.edit_teacher_grade').val(JSON.parse(res.response.teacher.grade));
		$('.edit_teacher_about').val(res.response.teacher.about);
		$('.edit_teacher_school').val(res.response.teacher.schools.name);
		$('.edit_teacher_pic').attr('src', `${res.response.teacher_img_url}/${res.response.teacher.image}`);
		
		
		let temp = JSON.parse(res.response.teacher.grade);
	                    for (var i = temp.length - 1; i >= 0; i--) {
	                        temp[i] = " "+temp[i];
	                    }
	    arr = temp;
		var listItems = $("#gradelevelModal li");
		for (var i = 0 ; i < temp.length; i++) {
			listItems.each(function(idx, li) {

			    if (temp[i].includes($(this).find('p').text())) 
			    {
					$(this).addClass("color-change");
				    
			    }

			    // and the rest of your code
			});
		}
		$(".GL").val(temp)
		$(".edit_teach").append(`<option value=${res.response.teacher.schools.id}>${res.response.teacher.schools.name}</option>`)
		var zip=$('.edit_teacher_zip');
		var taddress=$('.edit_teacher_address');
		var state=$('.edit_teacher_state');
		var city=$('.edit_teacher_city');
		var zip=$('.edit_teacher_zip');

		

		// arr = gr[0].split(',');
		// console.log("grade arr", gr)
		
	}else{
		toastr.warning('You are not authorized for this action!.');
	}

}


$(document).on(`click`, `#btn_editteacher`, (e)=>{
	var grade_arr;
   
	var tname = $('.edit_teacher_name');
	var email = $('.edit_teacher_email');
	var tsubject = $('.edit_teacher_subject');
	var grade = $('.edit_teacher_grade').val();
	grade = grade.replace(/\s*,\s*/g, ",");
	var tabout = $('.edit_teacher_about');
	var school_id = document.getElementsByClassName("edit_teach")[0].value;


	
	var image = $('.edit_teacher_image')[0].files[0];

	if (image && !ValidateFileType(image)) {
		toastr.warning('Please enter a valid image (jpg, jpeg, png).');		
	}else
	if(image && image.size > 2097152){
		toastr.warning("File size should be maximum 2MB.")
	}
	else if(!validateName(tname.val())){
		
		if (tname.val() =="") {
			toastr.warning('Please provide teacher name.');
		}else if(tname.val().length < 2){
			toastr.warning('Please provide minimum 2 characters for teacher name.');
		}else if(tname.val().length > 25){
			toastr.warning('Please provide maximum 25 characters for teacher name.');
		}else{
			toastr.warning('Please provide a valid teacher name.');
		}
	}
	else if(email.val() && !check_email(email.val())){
		toastr.warning("Please provide a valid teacher email.");
	}
	
	else if(!validateWords(tsubject.val())){
		
		if (tsubject.val() =="") {
			toastr.warning('Please provide teaching subject.');
		}else if (tsubject.val().length < 2){
			toastr.warning('Please provide minimum 2 characters for teaching subject.');
		}else if (tsubject.val().length > 50){
			toastr.warning('Please provide maximum 50 characters for teaching subject.');
		}else{
			toastr.warning('Please provide a valid teaching subject.');
		}
	}
	else if(!school_id){
		toastr.warning("Please select a valid teacher school.");
	}
	else if(!grade){
		toastr.warning("Please select a valid teacher grade.");
	}

	else{
		
			$('.edit_teacher_name').val($('.edit_teacher_name').val().trim());
        

			var data1 = new FormData($('#editteacherform')[0]);

			data1.append('name', tname.val());
			data1.append('email', email.val());
			data1.append('subject', tsubject.val());
			data1.append('school_id_fk', school_id);
			
			data1.append('grade', grade);


			if (image && ValidateFileType(image)) {
				data1.append('image', image);		
			}
			
			data1.append('about', tabout.val());
			data1.append('teacher_id', t_id);
			data1.append('api_token', localStorage.getItem("api_token"))

			
			// let data2 = {teacher_id : t_id, name:tname.val(), email:email.val(), image : image, subject:tsubject.val(), grade: grade_arr, school_id_fk:1, about:tabout.val(), api_token: localStorage.getItem("api_token") };
			 document.getElementsByClassName('loader')[0].style.display = "block";
			 
			$.ajax({
				url: `${localStorage.getItem("base_url")}/teacherUpdate`,
				type: 'POST',
				cache: false,
				processData: false,
				contentType: false,
				// dataType : 'json',
				data: data1,
				success: function(res) {
					arr = [];
					arr.length = 0;
					
					document.getElementsByClassName('loader')[0].style.display = "none";
					
					if(res.responseCode == 200){

						toastr.success('Teacher has been successfully updated!');
						openCity(event, 'Search','TeachingSBS');
						$( '#teacherform' ).each(function(){

						    this.reset();
						});
					}
					else if(res.responseCode == 203){
		                $.each(res.message, function(index, value){
							toastr.error(`${index}`, `${value}`);
							
		                });
					}
					else if(res.responseCode == 204){
						toastr.warning('Invalid Token');
					}
				},
				error : ()=>{
				 	document.getElementsByClassName('loader')[0].style.display = "none"
	               toastr.warning("Please check your internet connection and try again.")
	            }		
			});
		
	}

	

});
});

