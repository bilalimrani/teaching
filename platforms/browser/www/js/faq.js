$(document).ready(()=>{
	
let faq_tag = $("#faq")
$(".faqClass").click(()=>{
	faq_tag.css("display", "block");
	document.getElementsByClassName('loader')[0].style.display = "block"
	$.ajax({
		url : `${localStorage.getItem("base_url")}/faq`,
		method : "GET",
		processData : false,
		success : resultFunc
	});

	function resultFunc(res){
		let faq_html;
		document.getElementsByClassName('loader')[0].style.display = "none"
		if(res.responseCode == 200){
			faq_html = `
				<div>${res.response.content}</div>
			`;

			displayContent(faq_html);
		}
		else if(res.responseCode == 204){
			faq_html = `
				<div>No Record Found</div>
			`
			displayContent(faq_html);
		}
		else{
			alert("Internal server error")
		}
	};

	function displayContent(content){
		faq_tag.html(content);
	};
})
})