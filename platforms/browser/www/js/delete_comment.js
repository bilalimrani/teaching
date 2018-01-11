$(document).ready(()=>{
	

$(document).on('click', '.del_comment', (e)=>{
	let id = e.target.value;
	let teachers_id = e.target.dataset.teacherid;
	
	let comment_del = document.getElementById(`${id}`);
	comment_del.remove();
	document.getElementsByClassName('loader')[0].style.display = "block";
	console.log("delete",localStorage.getItem("api_token"))
	$.post(`${localStorage.getItem("base_url")}/deletecomment`, {api_token : localStorage.getItem("api_token"), comment_id : id}, (res)=>{
		document.getElementsByClassName('loader')[0].style.display = "none";
		console.log("delete",res)
		if(res.responseCode == 200){
			$.ajax({
				url : `${localStorage.getItem("base_url")}/teacher/${teachers_id}`,
				method : "GET",
				success : function(res){
					console.log(res);
					$(`.${teachers_id}topst`).html(res.response.sGrade);
					$(`.${teachers_id}toppt`).html(res.response.pGrade);
					teacherProfile(res);
				}
			});
			toastr.success("Comment deleted")
		}
		else{
			toastr.warning("Something went wrong")
		}
	})

})
})