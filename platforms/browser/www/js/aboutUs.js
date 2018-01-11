$(document).ready(()=>{
	
let about_content = $(".about_content");
let privacy_content = $(".privacy_content");
let terms_content = $(".terms_content");
$(".aboutClass").click(()=>{
	document.getElementsByClassName('loader')[0].style.display = "block"
	$.ajax({
		url : `${localStorage.getItem("base_url")}/about`,
		method : "GET",
		processData : false,
		success : resultFunc
	});

	function resultFunc(res){
		let about_html;
		document.getElementsByClassName('loader')[0].style.display = "none"
		if(res.responseCode == 200){
			about_html = `
				<div>${res.response.content}</div>
			`;

			displayContent(about_content,about_html);
		}
		else if(res.responseCode == 204){
			about_html = `
				<div>No Record Found</div>
			`
			displayContent(about_content, about_html);
		}
		else{
			toastr.error("Internal server error")
		}
	};
});


// privacy_policy section

$(".privacy_policy").click(()=>{
	privacy_content.css("display", "block");
	document.getElementsByClassName('loader')[0].style.display = "block"
	$.ajax({
		url : `${localStorage.getItem("base_url")}/policy`,
		method : "GET",
		processData : false,
		success : resultFunc
	});

	function resultFunc(res){
		let policy_html;
		document.getElementsByClassName('loader')[0].style.display = "none"
		if(res.responseCode == 200){
			policy_html = `
				<div>${res.response.content}</div>
			`;

			displayContent(privacy_content, policy_html);
		}
		else if(res.responseCode == 204){
			policy_html = `
				<div>No Record Found</div>
			`
			displayContent(privacy_content, policy_html);
		}
		else{
			alert("Internal server error")
		}
	};
});


$(".terms").click(()=>{
	terms_content.css("display", "block");
	document.getElementsByClassName('loader')[0].style.display = "block"
	$.ajax({
		url : `${localStorage.getItem("base_url")}/terms`,
		method : "GET",
		processData : false,
		success : resultFunc
	});

	function resultFunc(res){
		let terms_html;
		document.getElementsByClassName('loader')[0].style.display = "none"
		if(res.responseCode == 200){
			terms_html = `
				<div>${res.response.content}</div>
			`;

			displayContent(terms_content, terms_html);
		}
		else if(res.responseCode == 204){
			terms_html = `
				<div>No Record Found</div>
			`
			displayContent(terms_content, terms_html);
		}
		else{
			alert("Internal server error")
		}
	};
});


function displayContent(tag, content){
	tag.html(content);
};
})