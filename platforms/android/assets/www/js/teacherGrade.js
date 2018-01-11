$(document).ready(()=>{
	
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
	})
	.fail(function() {
			document.getElementsByClassName('loader')[0].style.display = "none"
		    toastr.warning("Please check your internet connection and try again")
		  })
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
				toastr.warning(res.message)
			}
			else{
				toastr.warning("Please check your internet connection and try again.")
			}
		})
		

	}
	else{
		toastr.warning("You are not authorized for this action please login.")
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

		<button type="button" id="up" class="btn btn-secondary btn-lg btn-block btn-search" >Submit</button>

		</div>

		</div>
		`
		grade_modal.html(html);
	}

}

$(document).on('click', '.next', function(){
	if(x == null){
		toastr.warning("Please select an answer.");
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

$(document).on('click', '#up', (e)=>{
	document.getElementsByClassName('loader')[0].style.display = "block";

	if(document.getElementById('comment').value){
		$.post(`${localStorage.getItem("base_url")}/grade`, {api_token : localStorage.getItem("api_token"), comment : document.getElementById('comment').value, ans : ans, teacher_id : document.getElementById('get_teacherID').value}, (data)=>{
			
			document.getElementsByClassName('loader')[0].style.display = "none";
			if(data.responseCode == 200){
				document.getElementsByClassName('loader')[0].style.display = "none";
				$("#gradingModal").modal('toggle');
				$("#gradeSuccessModal").modal('toggle');
				A_grade.innerHTML = data.response[0].grade;
				toastr.success("We sent you an email.");
				let prt_html = "";
				let std_html = "";
				let img = "";
				console.log("images",data.response);
				$.ajax({
					url : `${localStorage.getItem("base_url")}/teacher/${data.response[0].teachers_id}`,
					method : "GET",
					success : function(res){
						$(`.${data.response[0].teachers_id}topst`).html(res.response.sGrade);
						$(`.${data.response[0].teachers_id}toppt`).html(res.response.pGrade);
						if (res.response.sGrade) {
							$(`#${data.response[0].teachers_id}`).closest('div').find('.S').html(res.response.sGrade)
						}
						else{
							$(`#${data.response[0].teachers_id}`).closest('div').find('.S').html("N/A")
						}

						if (res.response.pGrade) {
							$(`#${data.response[0].teachers_id}`).closest('div').find('.P').html(res.response.pGrade)
						}
						else{
							$(`#${data.response[0].teachers_id}`).closest('div').find('.P').html("N/A")
						}
						
						teacherProfile(res);
					}
				});

			}
			else if(data.responseCode == 206){
				document.getElementsByClassName('loader')[0].style.display = "none";
				toastr.warning("Select all answsers.");
			}
			else if(data.responseCode == 203){
				document.getElementsByClassName('loader')[0].style.display = "none";
				toastr.warning("Empty access token.");
			}
			else if(data.responseCode == 204){
				document.getElementsByClassName('loader')[0].style.display = "none";
				toastr.warning(data.message);
			}
			else{
				document.getElementsByClassName('loader')[0].style.display = "none";
				toastr.error("Internal server error");
			}
		})
		.fail(function() {
			document.getElementsByClassName('loader')[0].style.display = "none"
		    toastr.warning("Please check your internet connection and try again.")
		  })
	}

	else{
		e.preventDefault();
		toastr.warning("Please provide feedback.");
		document.getElementsByClassName('loader')[0].style.display = "none";
	}
	


})
})