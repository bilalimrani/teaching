	
console.log("token",localStorage.getItem("api_token"))
let std_section = $(".std_section");
let prt_section = $(".prt_section");
let teacher_id;
let S_grade = document.getElementsByClassName('S-grade')[0];
let btn_P_grade = document.getElementsByClassName('btn-P-grade')[0]
$(document).on('click', '.tDetail', (e)=>{
	teacher_id = e.target.id;
	document.getElementsByClassName('loader')[0].style.display = "block"
	$.ajax({
		url : `${localStorage.getItem("base_url")}/teacher/${teacher_id}`,
		method : "GET",
		success : teacherProfile
	});
});

function teacherProfile(res){
	std_section.html('');
	prt_section.html('');
	console.log("clicked",res);
	if(localStorage.getItem("user_id") != "null" && localStorage.getItem("user_id") != null && localStorage.getItem("user_id") == res.response.teacher.addedby){
		$(".btn_appendTeacher").html(`<button type="button" data-id=${res.response.teacher.id} class="btn btn-secondary btn-sm pull-right btn_edit_teacher">Edit</button>`)
	}
	else{
		$(".btn_appendTeacher").html(`<div></div>`)	
	}
	document.getElementsByClassName('loader')[0].style.display = "none"
	if(res.response.teacher.image){
		$(".teacher-detail-content").css('background-image', `url(${res.response.teacher_img_url}/${res.response.teacher.image})`)
	}
	else{
		$(".teacher-detail-content").css('background-image', `url("images/top-io.jpg")`)
	}
	$("#get_teacherID").attr('value', teacher_id)
	document.getElementsByClassName('teacher_n')[0].innerHTML = res.response.teacher.name
	document.getElementsByClassName('teacher_grd')[0].innerHTML = JSON.parse(res.response.teacher.grade)
	if(res.response.teacher.subject){
		document.getElementsByClassName('teacher_sub')[0].innerHTML = res.response.teacher.subject
	}
	else{
		document.getElementsByClassName('teacher_sub')[0].innerHTML = "N/A"
	}
	if(res.response.teacher.email){
		document.getElementsByClassName('teacher_em')[0].innerHTML = res.response.teacher.email
	}
	else{
		document.getElementsByClassName('teacher_em')[0].innerHTML = "N/A"
	}
	document.getElementsByClassName('teacher_sch')[0].innerHTML = res.response.teacher.schools.name
	// if(res.response.sGrade){
	// 	document.getElementsByClassName('teacher_grd')[0].innerHTML = res.response.sGrade
	// }
	// else{
	// 	document.getElementsByClassName('teacher_grd')[0].innerHTML = "N/A"
	// }

	if(res.response.sGrade){
		S_grade.innerHTML = res.response.sGrade;
	}
	else{
		S_grade.innerHTML = "N/A";
	}

	if(res.response.pGrade){
		btn_P_grade.innerHTML = res.response.pGrade;
	}
	else{
		btn_P_grade.innerHTML = "N/A";
	}
	// if(res.response.pGrade){
	// 	document.getElementsByClassName('pGrade')[0].innerHTML = res.response.pGrade
	// }
	// else{
	// 	document.getElementsByClassName('pGrade')[0].innerHTML = "N/A"
	// }
	if(res.response.teacher.about){
		document.getElementsByClassName('teacher_abt')[0].innerHTML = res.response.teacher.about
	}
	else{
		document.getElementsByClassName('teacher_abt')[0].innerHTML = "N/A"
	}

	// edit comment section

	

	let std_sectionHTML = "";

	if(res.response.studentRating.length > 0){
		let sgradeusers = [];
		let studentRating = $.each(res.response.studentRating, (index, value)=>{
			let s_img;
			if(value.image){
				s_img = `${res.response.user_img_url}/${value.image}`;
			}
			else{
				s_img = "images/top-io.jpg";
			}

			std_grade = `
						<button type="button" class="btn btn-secondary btn-lg btn-student-grading">
							<p class="btn-S-content">Student
							<br>grading
							<p class="btn-S-grade">${value.grade}</p>
							</p>
						</button>`;			
			std_sectionHTML = `
			<div class="col-xs-12 teacher-detail-section std-grading-section" id=${value.id}>
			<div class="col-xs-4 teacher-icon">
			<div class="Top-teacher-icon stdRating_img" style="background: url(${s_img})"></div>
			</div>

			<div class="col-xs-8 Teacher-tab-detail top-parents-detail">
			<h1>${value.fName} ${value.lName}</h1>
			<div class="comment_val" id=comment_val${value.id} value=${value.comment}><p>${value.comment}</p></div>

			<div class="search-buttons-layout">

			${sgradeusers.includes(value.users_id) ? "" : std_grade}
			<div class="btn_edit_comment">${localStorage.getItem("user_id") == value.users_id ? `<button type="button" value=${value.id} class="btn btn-secondary fa fa-pencil-square-o btn-sm pull-right btn_editComment"></button>` : ""}</div>
			<div class="btn_edit_comment">${localStorage.getItem("user_id") == value.users_id ? `<button type="button" value=${value.id} class="btn btn-secondary fa fa-trash-o btn-sm pull-right del_comment" data-teacherid="${value.teachers_id}"></button>` : ""}</div>
			</div>

			</div>
			</div>
			`;
			sgradeusers.push(value.users_id);
			std_section.append(std_sectionHTML);

		});

	}

	else{
		std_section.html(`<div class="sgsnorecord"><h1>No record found</h1></div>`);
	}


	let prt_sectionHTML = "";
	if(res.response.parentRating.length > 0 ){
		let pgradeusers = [];
		let parentRating = $.each(res.response.parentRating, (index, value)=>{
			let p_img;
			if(value.image){
				p_img = `${res.response.user_img_url}/${value.image}`;
			}
			else{
				p_img = "images/top-io.jpg";
			}

			prt_grade = `
						<button type="button" class="btn btn-secondary btn-lg btn-student-grading">
						<p class="btn-S-content">Parent
						<br>grading
						<p class="btn-S-grade">${value.grade}</p>
						</p>
						</button>
						`;
			prt_sectionHTML = `
			<div class="col-xs-12 teacher-detail-section std-grading-section" id=${value.id}>
			<div class="col-xs-4 teacher-icon">
			<div class="Top-teacher-icon stdRating_img" style="background: url(${p_img})"></div>
			</div>

			<div class="col-xs-8 Teacher-tab-detail top-parents-detail">
			<h1>${value.fName} ${value.lName}</h1>
			<div class="comment_val" id=comment_val${value.id} value=${value.comment}><p>${value.comment}</p></div>

			<div class="search-buttons-layout">

			${pgradeusers.includes(value.users_id) ? "" : prt_grade}
			<div class="btn_edit_comment">${localStorage.getItem("user_id") == value.users_id ? `<button type="button" value=${value.id} class="btn btn-secondary fa fa-pencil-square-o btn-sm pull-right btn_editComment"></button>` : ""}</div>
				<div class="btn_edit_comment">${localStorage.getItem("user_id") == value.users_id ? `<button type="button" value=${value.id} class="btn btn-secondary fa fa-trash-o btn-sm pull-right del_comment"  data-teacherid="${value.teachers_id}"></button>` : ""}</div>
			</div>

			</div>
			</div>
			`;
			pgradeusers.push(value.users_id);
			prt_section.append(prt_sectionHTML);			
		});

	}

	else{
		prt_section.html(`<div class="pgsnorecord"><h1>No record found</h1></div>`);
	}

}	
