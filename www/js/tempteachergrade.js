/*
let res
let grade_modal = $("#grade_modal");
let ans = [];
let i = 0;
let x = null;
let A_grade = document.getElementsByClassName('A_grade')[0];
std_section = $(".std_section");
prt_section = $(".prt_section");
new Promise((resolve, reject)=>{
	$.get(`${localStorage.getItem("base_url")}/grade`, (result)=>{
		resolve(result)
	});
}).then((data)=>{
	res = data
});

$("#gradeM").click(()=>{
	let html;
	x = null;
	if(localStorage.getItem("api_token")){
		$.get(`${base_url}/grade`, (res)=>{
			if(res.responseCode == 200){
				$("#gradingModal").modal('toggle');
				i=0;
				ans = [];
				ques(i);
			}
			else if(res.responseCode == 204){
				alert(res.message)
			}
			else{
				alert("Internal server error")
			}
		})

	}
	else{
		toastr.warning("You are not authorized for this action please login")
	}
});

function ques(n) 
{
	if (i<10) 
	{
		questions = res.response[n];
		let radio_html = "";
		questions.answers.forEach((key, index)=>{
			let selected_ans = [];
			radio_html += `
			<li><a href="#" class="grade-A next1" id=${key.weight} value=${key.weight} name=ans[${questions.id}]>${key.answer}</a></li>
			`
		})

		html = `
		<div class="col-xs-12 login-heading">
		<h1 class="tansform-upper">Teacher Evaluation</h1>
		</div>
		<div class="col-xs-12 Grade-content">
		<h2 class="tansform-upper">Q${i+1}/10</h2>
		<h4>${questions.question}</h4>
		</div>

		<ul class="all-grades">
		${radio_html}
		</div>

		<div class="modal_footer">
		<button type="button" class="btn btn-secondary btn-lg btn-block btn-search next">Next</button>
		</div>
		`
		grade_modal.html(html);
	}
	else{
		html = `
		<div class="container">
		<div class="col-xs-12 login-heading">
		<h1>Give <br> Feedback</h1>
		<form>
		<textarea class="form-control" rows="4" cols="50" id="comment"></textarea>
		</form>

		</div>

		<div class="modal_footer">

		<button type="button" id="up" class="btn btn-secondary btn-lg btn-block btn-search" data-dismiss="modal">Submit</button>

		</div>

		</div>
		`
		grade_modal.html(html);
	}

}

$(document).on('click', '.next', function(){
	if(x == null){
		toastr.warning("Please select an answer");
	}
	else{
		ans.push(x);
		x = null;
		i++;
		ques(i);
	}

});			


$(document).on('click', '.next1', (e)=>{
	x = e.target.id;
	// ans.push(e.target.id);
	
});

$(document).on('click', '#up', ()=>{
	document.getElementsByClassName('loader')[0].style.display = "block";
	$.post(`${localStorage.getItem("base_url")}/grade`, {api_token : localStorage.getItem("api_token"), comment : document.getElementById('comment').value, ans : ans, teacher_id : document.getElementById('get_teacherID').value}, (data)=>{
		console.log("token",data, localStorage.getItem("user_id"), data.response[0])
		document.getElementsByClassName('loader')[0].style.display = "none";
		if(data.responseCode == 200){
			$("#gradeSuccessModal").modal('toggle');
			A_grade.innerHTML = data.response[0].grade;
			toastr.success("Rated successfully");
			let prt_html = "";
			let std_html = "";
			let img = "";
			console.log("images",data.response)
			if(data.response[0].role == "parent"){
				console.log("images",data.response)
				if(data.response[2].image){
					console.log("ifff")
					img = `http://132.148.133.186/tsbs/public/uploads/User/${data.response[2].image}`
				}
				else{
					img = `images/top-io.jpg`
				}
				prt_html = `
				<div class="col-xs-12 teacher-detail-section std-grading-section" id=${data.response[0].id}>
				<div class="col-xs-4 teacher-icon">
				<div class="Top-teacher-icon stdRating_img" style="background: url(${img})"></div>
				</div>

				<div class="col-xs-8 Teacher-tab-detail top-parents-detail">
				<h1>${data.response[1].name}</h1>
				<div class="comment_val" id=comment_val${data.response[0].id} value=${data.response[0].comment}><p>${data.response[0].comment}</p></div>

				<div class="search-buttons-layout">

				<button type="button" class="btn btn-secondary btn-lg btn-student-grading">
				<p class="btn-S-content">Student
				<br>grading
				<p class="btn-S-grade">${data.response[0].grade}</p>
				</p>
				</button>
				<div class="btn_edit_comment">${localStorage.getItem("user_id") == data.response[0].users_id ? `<button type="button" value=${data.response[0].id} class="btn btn-secondary fa fa-pencil-square-o btn-sm pull-right btn_editComment"></button>` : ""}</div>
				<div class="btn_edit_comment">${localStorage.getItem("user_id") == data.response[0].users_id ? `<button type="button" value=${data.response[0].id} class="btn btn-secondary fa fa-trash-o btn-sm pull-right del_comment"></button>` : ""}</div>
				</div>

				</div>
				</div>
				`
				prt_section.prepend(prt_html);
				$('.pgsnorecord').hide();
			}
			else{
				if(data.response[2].image){
					console.log("ifff")
					img = `http://132.148.133.186/tsbs/public/uploads/User/${data.response[2].image}`
				}
				else{
					img = `images/top-io.jpg`
				}
				std_html = `
				<div class="col-xs-12 teacher-detail-section std-grading-section" id=${data.response[0].id}>
				<div class="col-xs-4 teacher-icon">
				<div class="Top-teacher-icon stdRating_img" style="background: url(${img})"></div>
				</div>

				<div class="col-xs-8 Teacher-tab-detail top-parents-detail">
				<h1>${data.response[1].name}</h1>
				<div class="comment_val" id=comment_val${data.response[0].id} value=${data.response[0].comment}><p>${data.response[0].comment}</p></div>

				<div class="search-buttons-layout">

				<button type="button" class="btn btn-secondary btn-lg btn-student-grading">
				<p class="btn-S-content">Student
				<br>grading
				<p class="btn-S-grade">${data.response[0].grade}</p>
				</p>
				</button>
				<div class="btn_edit_comment">${localStorage.getItem("user_id") == data.response[0].users_id ? `<button type="button" value=${data.response[0].id} class="btn btn-secondary fa fa-pencil-square-o btn-sm pull-right btn_editComment"></button>` : ""}</div>
				<div class="btn_edit_comment">${localStorage.getItem("user_id") == data.response[0].users_id ? `<button type="button" value=${data.response[0].id} class="btn btn-secondary fa fa-trash-o btn-sm pull-right del_comment"></button>` : ""}</div>
				</div>

				</div>
				</div>
				`
				console.log('resss',data.response[0]);
				std_section.prepend(std_html);
				$('.sgsnorecord').hide();
			}
				$.ajax({
					url : `${localStorage.getItem("base_url")}/teacher/${data.response[0].teachers_id}`,
					method : "GET",
					success : function(res){
						console.log(res);
						$('.S-grade').html(res.response.sGrade);
						$('.btn-p-grade').html(res.response.pGrade);
						console.log('s',res.response.sGrade);
						console.log('p',res.response.pGrade);
						console.log('id',data.response[0].teachers_id);
						$(`#${data.response[0].teachers_id}`).closest('.Teacher-tab-detail').find('.btn-student-grading .btn-S-grade').html(res.response.sGrade);
						$(`#${data.response[0].teachers_id}`).closest('.Teacher-tab-detail').find('.btn-teacher-grading .btn-S-grade').html(res.response.pGrade);
						$(`.${data.response[0].teachers_id}topst`).html(res.response.sGrade);
						$(`.${data.response[0].teachers_id}toppt`).html(res.response.pGrade);
					}
				});

		}
		else if(data.responseCode == 206){
			toastr.warning("Select all ans")
		}
		else if(data.responseCode == 203){
			toastr.warning("Empty access token")
		}
		else if(data.responseCode == 204){
			toastr.warning(data.message);
		}
		else{
			toastr.error("Internal server error");
		}

	})


})*/