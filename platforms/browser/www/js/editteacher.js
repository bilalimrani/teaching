$(document).ready(()=>{
	
let t_id;
$(document).on(`click`, `.btn_edit_teacher`, (e)=>{
	arr = [];
	arr.length = 0;
	
	console.log("val",document.getElementsByClassName("GL")[0].value)
    document.getElementsByClassName('loader')[0].style.display = "block";
	t_id = e.target.dataset.id;
	if(localStorage.getItem('api_token') || !localStorage.getItem('api_token') == null)
	{
		document.getElementsByClassName('loader')[0].style.display = "none";
		openCity(event, 'Edit-teacher','Edit Teacher');
		$.ajax({
			url : `${localStorage.getItem("base_url")}/teacher/${t_id}`,
			method : "GET",
			success : showteacheronedit
		});

	}else{
        $(".signoutClass").empty();
        $(".loginClass").show();
        toastr.info('Please Login to Edit Teacher');

	}
	document.getElementsByClassName('loader')[0].style.display = "none";
});

function showteacheronedit(res) {
	console.log("resres", res);
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
		$(".GL").val(JSON.parse(res.response.teacher.grade))
		$(".edit_teach").append(`<option value=${res.response.teacher.schools.id}>${res.response.teacher.schools.name}</option>`)
		var zip=$('.edit_teacher_zip');
		var taddress=$('.edit_teacher_address');
		var state=$('.edit_teacher_state');
		var city=$('.edit_teacher_city');
		var zip=$('.edit_teacher_zip');

		let gr = JSON.parse(res.response.teacher.grade);
		arr = gr[0].split(',');
		console.log(gr);
		console.log(arr);
		var listItems = $("#gradelevelModal li");
		listItems.each(function(idx, li) {
		    if (arr.includes($(this).find('p').text())) 
		    {
				$(this).addClass("color-change");
			    console.log(idx, arr.includes($(this).find('p').text()));
			    console.log('li', $(this).find('p').text());
		    }

		    // and the rest of your code
		});
	}else{
		toastr.warning('You Are Not Authorized For This Action');
	}

}


$(document).on(`click`, `#btn_editteacher`, (e)=>{
	var grade_arr = [];
   
	var tname = $('.edit_teacher_name');
	var email = $('.edit_teacher_email');
	var tsubject = $('.edit_teacher_subject');
	var grade = $('.edit_teacher_grade').val();
	var tabout = $('.edit_teacher_about');
	var school_id = document.getElementsByClassName("edit_teach")[0].value
	
	var image = $('.edit_teacher_image')[0].files[0];

	if (image && !ValidateFileType(image)) {
		toastr.warning('Please Enter Valid Image (jpg, jpeg, png)');		
	}else
	if(image && image.size > 2097152){
		toastr.warning("File size maximum 2MB")
	}
	else if(!validateName(tname.val())){
		
		if (tname.val() =="") {
			toastr.warning('Please Provide Teacher Name');
		}else if(tname.val().length < 2){
			toastr.warning('Please Provide Minimum 2 Character Teacher Name');
		}else if(tname.val().length > 25){
			toastr.warning('Please Provide Maximum 25 Character Teacher Name');
		}else{
			toastr.warning('Please Provide Valid Teacher Name');
		}
	}
	else if(email.val() && !check_email(email.val())){
		toastr.warning("Please Provide Valid Teacher Email");
	}
	
	else if(!validateWords(tsubject.val())){
		
		if (tsubject.val() =="") {
			toastr.warning('Please Provide Teaching Subject');
		}else if (tsubject.val().length < 2){
			toastr.warning('Please Provide Minimum 2 Character Teaching Subject');
		}else if (tsubject.val().length > 50){
			toastr.warning('Please Provide Maximum 50 Character Teaching Subject');
		}else{
			toastr.warning('Please Provide Valid Teaching Subject');
		}
	}
	else if(!school_id){
		toastr.warning("Please Select Valid Teacher School");
	}
	else if(!grade){
		toastr.warning("Please Select Valid Teacher Grade");
	}

	else{
		
			$('.edit_teacher_name').val($('.edit_teacher_name').val().trim());
        

			var data1 = new FormData($('#editteacherform')[0]);

			data1.append('name', tname.val());
			data1.append('email', email.val());
			data1.append('subject', tsubject.val());
			data1.append('school_id_fk', school_id);
			
			data1.append('grade[]', grade);
			data1.append('image', image);
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

						toastr.success('Teacher Updated Successfully');
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
				}	
			});
		
	}

	

});
});

