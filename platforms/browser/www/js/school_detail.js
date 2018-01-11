$(document).ready(()=>{
	
let sch_bg = document.getElementsByClassName('sch_bg')[0];
let sch_name = document.getElementsByClassName('sch_name')[0];
let sch_address = document.getElementsByClassName('sch_address')[0];
let sch_phone = document.getElementsByClassName('sch_phone')[0];
let sch_url = document.getElementsByClassName('sch_url')[0];


let schTeacher_list = $(".schTeacher_list")
$(document).on('click', '.sch_click', (e)=>{
	let sch_id = e.target.id;
	document.getElementsByClassName('sch_btn')[0].style.display = "block";
	$.get(`${localStorage.getItem("base_url")}/school/${sch_id}`, (res)=>{
		document.getElementsByClassName('sch_btn')[0].style.display = "none";
		sch_name.innerHTML = res.response.name;
		console.log("match",res.response.addedby, localStorage.getItem("user_id"))
		if(res.response.addedby == localStorage.getItem("user_id")){
			document.getElementsByClassName('sch_btn')[0].style.display = "block";
			$(".btn_edit_school").attr('data-id', `${res.response.id}`)
		}
		if(localStorage.getItem("user_id") && res.response.addedby == localStorage.getItem("user_id")){
			document.getElementsByClassName('btn_edit_school')[0].style.display = "block";
			$(".btn_edit_school").attr('data-id', `${res.response.id}`)
		}
		else{
			document.getElementsByClassName('btn_edit_school')[0].style.display = "none";
		}
		if(res.response.logo){
			$(".sch_bg").css('background-image', `url(${res.response.school_img_url}/${res.response.logo})`)
		}
		else{
			$(".sch_bg").css('background-image', `url("images/Teaching-s.png")`)
		}
		if(res.response.number){
			sch_phone.innerHTML = res.response.number;
		}
		else{
			sch_phone.innerHTML = "N/A";
		}

		if(res.response.url){
			sch_url.innerHTML = res.response.url;
		}
		else{
			sch_url.innerHTML = "N/A";
		}

		if(res.response.address){
			sch_address.innerHTML = res.response.address;
		}
		else{
			sch_address.innerHTML = "N/A"
		}

		let teach_html = "";
		if(res.response.teachers.length > 0){
			$.each(res.response.teachers, (key, value)=>{
				let t_img;
				if(value.image){
					t_img = `${localStorage.getItem('user_img_url')}/${value.image}`;
				}
				else{
					t_img = "images/Teaching-s.png";
				}
				teach_html += `
				<div class="col-xs-4 school-icon v">
				<div class="Top-teacher-icon" style="background: url(${t_img})"></div>
				</div>

				<div class="col-xs-8 school-tab-detail school-teachr-dt">
				<h1 class="tDetail" id=${value.id} onclick="openCity(event, 'Teacher-detail','Teacher Detail')">${value.name}</h1>
				<p><span>Subject:</span>${value.subject ? value.subject : "N/A"}</p>
				<p class="lower-caps"><span>Email:</span>${value.email ? value.email : "N/A"}</p>
				<p><span>School:</span>${res.response.name ? res.response.name : "N/A"}</p>
				</div>
				`
			});
		}

		else{
			teach_html = `<h1>No record found</h1>`
		}


		schTeacher_list.html(teach_html);
	});
});
})