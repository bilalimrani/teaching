$(document).ready(()=>{
	

$(".signoutClass").click(()=>{
	if (localStorage.getItem("api_token")) {
		document.getElementsByClassName('loader')[0].style.display = "block"
		$.post(`${base_url}/logout`, {api_token : localStorage.getItem("api_token")}, (data)=>{
			document.getElementsByClassName('loader')[0].style.display = "none"
			if(data.responseCode == 200){
				localStorage.removeItem("api_token");
				localStorage.removeItem("first_name");
				localStorage.removeItem("last_name");
				localStorage.removeItem("email");
				localStorage.removeItem("image");
				localStorage.removeItem("role");
				localStorage.removeItem("city");
				localStorage.removeItem("state");
				localStorage.removeItem("grade");
				localStorage.removeItem("school");
				localStorage.removeItem("school_id_fk");
				localStorage.removeItem("user_id");
				// localStorage.clear();
				location.reload();
			}
			else if(data.responseCode == 204){
				toastr.error(`<a href="javascript:showConfirm();">invalid token, Please Login</a>`);
				localStorage.removeItem("api_token");
				localStorage.removeItem("first_name");
				localStorage.removeItem("last_name");
				localStorage.removeItem("email");
				localStorage.removeItem("image");
				localStorage.removeItem("role");
				localStorage.removeItem("city");
				localStorage.removeItem("state");
				localStorage.removeItem("grade");
				localStorage.removeItem("school");
				localStorage.removeItem("school_id_fk");
				localStorage.removeItem("user_id");
				// localStorage.clear();
				location.reload();
			}
			else if(data.responseCode == 203){
				toastr.error(`<a href="javascript:showConfirm();">Empty access token</a>`);
			}
			else{
				toastr.error(`<a href="javascript:showConfirm();">Internal Server error</a>`);
			}
		})
	}
})
})