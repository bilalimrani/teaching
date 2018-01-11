$(document).ready(()=>{
	
	/*	Search Module	*/

	var base_url = localStorage.getItem('base_url');
	let school_img_url = "";
	let teacher_img_url = "";
	let page = 1;
	let teacherlist = 1;
	let keyword = '';
	let city = '';
	let state = '';
	let zip = '';

	function search(page, teacherlist){
		$('.school_listing').html(``);
		$('.teacher_listing').html(``);
		
		document.getElementsByClassName('loader')[0].style.display = "block";
		$.post(`${base_url}/search`, {keyword : keyword, city : city, state : state, zip : zip, page : page, "teacher-list":teacherlist}, (res)=>{
			
			document.getElementsByClassName('loader')[0].style.display = "none";
			if(res.responseCode == 200){
				var school_html = ``;
				school_img_url = res.response.school_img_url;
				teacher_img_url = res.response.teacher_img_url;
				
				localStorage.setItem(teacher_img_url, res.response.teacher_img_url)
				/*	Schools Listing Start	*/
				if(res.response.schools.data.length > 0){

					$.each(res.response.schools.data, (key, value)=>{
						console.log("full address",value)
						let s_img;
						
						if(value.logo){
							s_img = `${school_img_url}/${value.logo}`;
						}
						else{
							s_img = "images/Teaching-s.png";
						}
						school_html = `
						<div class="col-xs-12 School-detail-section">
						<div class="col-xs-4 school-icon">
						<div class="Top-teacher-icon" style="background: url(${s_img})"></div>
						</div>

						<div class="col-xs-8 school-tab-detail">
						<a class="tablinks" onclick="openCity(event, 'School-detail','School Detail','gotosearch')"><h1 class="sch_click" id=${value.id}>${value.name}</h1></a> 
						<p><span class="school_bold">Add:</span> <span class="text-uppercase">${value.fullAddress == null || value.fullAddress == "" ? "N/A" : value.fullAddress}</span></p>
						<p><span class="school_bold">Ph:</span> ${value.number == null || value.number == "" ? "N/A" : value.number}</p>
						<p><span class="school_bold">Web:</span> ${value.url == null || value.url == "" ? "N/A" : value.url}</p>
						<p class="theme-color">Teachers: ${value.teacherscount}</p>
						</div>

						</div>
						`;
						$('.school_listing').append(school_html);
					});
					/*	Pagimaton for School ListingStart Here	*/
					if (res.response.schools.last_page >= page && res.response.schools.total > 5) 
					{
						school_pagination = `<nav aria-label="...">
						<ul class="pagination pagination-sm justify-content-end">
						<li class="page-item firstschool">
						<a class="page-link" href="#" tabindex="-1">First</a>
						</li>
						<li class="page-item previousschool">
						<a class="page-link" href="#" tabindex="-1"><<</a>
						</li>
						<li class="page-item currentschool disabled ">
						<a class="page-link" href="#">${page}</a>
						</li>
						<li class="page-item nextschool">
						<a class="page-link" href="#">>></a>
						</li>
						<li class="page-item lastschool">
						<a class="page-link" href="#" data-page="${res.response.schools.last_page}">${res.response.schools.last_page}</a>
						</li>
						</ul>
						</nav>`;
						$('.school_listing').append(school_pagination);
						if (page<=1) 
						{
							$('.firstschool').hide();
							$('.previousschool').hide();
						}else{
							for (let i = page-1; i >= page-1; i--) {
								if (i==1) 
								{
									$('.firstschool').hide();
								}
								if (i>0) 
								{
									$(`.previousschool`).after(`
										<li class="page-item ">
										<a class="page-link previousschools" data-id="${i}" href="#">${i}</a>
										</li>
										`);
								}
							}
						}
						if(page>=res.response.schools.last_page){
							$('.nextschool').hide();
							$('.lastschool').hide();
						}else{
							for (let i = page+1; i >= page+1; i--) {
								if (i==res.response.schools.last_page) 
								{
									$('.nextschool').hide();
								}
								if (i<res.response.schools.last_page) 
								{
									$(`.currentschool`).after(`
										<li class="page-item ">
										<a class="page-link nextschools" data-id="${i}" href="#">${i}</a>
										</li>
										`);
								}
							}
						}
					}
					/*	Pagimaton for School Listing End Here	*/
				}
				/*	School Listing End	*/
				else{
					school_html =  `<p>
					<h3>
					No record found
					</h3>
					</p><br>
					`;
					$('.school_listing').append(school_html);
				}

				teachers_html = ``;
				/*	Teachers Listing Start	*/
				if(res.response.teachers.data.length > 0){
					$.each(res.response.teachers.data, (key, value)=>{
						let t_img;
						if(value.image){
							t_img = `${res.response.teacher_img_url}/${value.image}`;
						}
						else{
							t_img = "images/top-io.jpg";
						}
						
						console.log("value1",value)
						let temp = JSON.parse(value.grade);
	                    for (var i = temp.length - 1; i >= 0; i--) {
	                        temp[i] = " "+temp[i];
	                    }

	                    
						teachers_html =  `
						<div class="col-xs-12 teacher-detail-section">
						<div class="col-xs-4 teacher-icon">
						<div class="Top-teacher-icon" style="background: url(${t_img})"></div>
						</div>

						<div class="col-xs-8 Teacher-tab-detail">
						<a class="tablinks tDetail" onclick="openCity(event, 'Teacher-detail','Teacher Detail','gotosearch')" data-dismiss="modal">  <h1 id=${value.id}>${value.name == null || value.name == "" ? "N/A" : value.name}</h1> </a>
						<p class="t-heading">Gr:</p> <p class="t-content">${value.grade == null || value.grade == "null" ? "N/A" : temp}</p>
						<p class="t-heading">Sub:</p> <p class="t-content">${value.subject == null || value.subject == "" ? "N/A" : value.subject}</p>
						<p class="t-heading">E:</p> <p class=${value.email == null || value.email == "" ? "t-content" : "lower-caps"}>${value.email == null || value.email == "" ? "N/A" : value.email}</p>
						<p class="t-heading">Sch:</p> <p class="t-content">${value.schools.name == null || value.schools.name == "" ? "N/A" : value.schools.name}</p>
						<div class="search-buttons-layout">
						<button type="button" class="btn btn-secondary btn-lg btn-student-grading"><p class="btn-S-content">Student <br>grading <p class="btn-S-grade S">${value.sGrade == null || value.sGrade == "" ? "N/A" : value.sGrade}</p></p></button>
						<button type="button" class="btn btn-secondary btn-lg btn-teacher-grading"><p class="btn-S-content">Parent <br>grading <p class="btn-S-grade P">${value.pGrade == null || value.pGrade == "" ? "N/A" : value.pGrade}</p></p></button>
						</div>
						</div>
						</div>
						`;
						$('.teacher_listing').append(teachers_html);
					});
					/*	Pagimaton for School ListingStart Here	*/
					if (res.response.teachers.last_page >= teacherlist && res.response.teachers.total > 5) 
					{
						teacher_pagination = `<nav aria-label="...">
						<ul class="pagination pagination-sm justify-content-end">
						<li class="page-item firstteacher">
						<a class="page-link" href="#" tabindex="-1">First</a>
						</li>
						<li class="page-item previousteacher">
						<a class="page-link" href="#" tabindex="-1"><<</a>
						</li>
						<li class="page-item currentteacher disabled">
						<a class="page-link" href="#">${teacherlist}</a>
						</li>
						<li class="page-item nextteacher">
						<a class="page-link" href="#">>></a>
						</li>
						<li class="page-item lastteacher">
						<a class="page-link" href="#" data-page="${res.response.teachers.last_page}">Last</a>
						</li>
						</ul>
						</nav>`;
						$('.teacher_listing').append(teacher_pagination);
						if (teacherlist<=1) 
						{
							$('.firstteacher').hide();
							$('.previousteacher').hide();
						}else{
							for (let j = teacherlist-1; j >= teacherlist-1; j--) {
								if (j==1) 
								{
									$('.firstteacher').hide();
								}
								if (j>0) 
								{
									$(`.previousteacher`).after(`
										<li class="page-item ">
										<a class="page-link previousteachers" data-id="${j}" href="#">${j}</a>
										</li>
										`);
								}
							}
						}
						if(teacherlist>=res.response.teachers.last_page){
							$('.nextteacher').hide();
							$('.lastteacher').hide();
						}else{
							for (let j = teacherlist+1; j >= teacherlist+1; j--) {
								if (j==res.response.teachers.last_page) 
								{
									$('.nextteacher').hide();
								}
								if (j<res.response.teachers.last_page) 
								{
									$(`.currentteacher`).after(`
										<li class="page-item ">
										<a class="page-link nextteachers" data-id="${j}" href="#">${j}</a>
										</li>
										`);
								}
							}
						}
					}
					/*	Pagimaton for School Listing End Here	*/

				}
				/*	Teachers Listing End	*/
				else{
					teachers_html =  `
					<p>
					<h3>
					No record found
					</h3>
					</p><br>
					`;
					$('.teacher_listing').append(teachers_html);
				}
			}
			else{
				alert(res.message)
			}
		})
		.fail(function() {
			document.getElementsByClassName('loader')[0].style.display = "none"
		    toastr.warning("Please check your internet connection and try again.")
		  })
}


/*	Search Request Starts Here	*/
$(document).on(`click`, '#search_btn', (e)=>{

	keyword = $('#search_keyword_input').val();
	city = $('#search_city_input').val();
	state = $('#search_state_input').val();
	zip = $('#search_zip_input').val();
	page = 1;
	teacherlist = 1;
	if (validatesearchform(zip)) 
	{
		search(page, teacherlist);
		openCity(event, 'Search-result','Search Results');
	}

	
});

$(document).on('click', '.nextschool', (e)=>{

    document.getElementsByClassName('loader')[0].style.display = "block"; // Start Loader
    page++;
    search(page, teacherlist);
    document.getElementsByClassName('loader')[0].style.display = "none"; 
});

$(document).on('click', '.previousschool', (e)=>{

    document.getElementsByClassName('loader')[0].style.display = "block"; // Start Loader
    page--;
    search(page, teacherlist);
    document.getElementsByClassName('loader')[0].style.display = "none"; 
});

$(document).on('click', '.firstschool', (e)=>{

    document.getElementsByClassName('loader')[0].style.display = "block"; // Start Loader
    page=1;
    search(page, teacherlist);
    document.getElementsByClassName('loader')[0].style.display = "none"; 
});

$(document).on('click', '.lastschool', (e)=>{

    document.getElementsByClassName('loader')[0].style.display = "block"; // Start Loader
    page=e.target.dataset.page;
    search(page, teacherlist);
    document.getElementsByClassName('loader')[0].style.display = "none"; 
});

$(document).on('click', '.nextteacher', (e)=>{

    document.getElementsByClassName('loader')[0].style.display = "block"; // Start Loader
    teacherlist++;
    search(page, teacherlist);
    document.getElementsByClassName('loader')[0].style.display = "none"; 
});

$(document).on('click', '.previousteacher', (e)=>{

    document.getElementsByClassName('loader')[0].style.display = "block"; // Start Loader
    teacherlist--;
    search(page, teacherlist);
    document.getElementsByClassName('loader')[0].style.display = "none"; 
});

$(document).on('click', '.firstteacher', (e)=>{

    document.getElementsByClassName('loader')[0].style.display = "block"; // Start Loader
    teacherlist=1;
    search(page, teacherlist);
    document.getElementsByClassName('loader')[0].style.display = "none"; 
});

$(document).on('click', '.lastteacher', (e)=>{

    document.getElementsByClassName('loader')[0].style.display = "block"; // Start Loader
    teacherlist=e.target.dataset.page;
    search(page, teacherlist);
    document.getElementsByClassName('loader')[0].style.display = "none"; 
});

$(document).on('click', '.nextschools', (e)=>{
    document.getElementsByClassName('loader')[0].style.display = "block"; // Start Loader
    page = parseInt(e.target.dataset.id);
    search(page, teacherlist);
    document.getElementsByClassName('loader')[0].style.display = "none"; 
});

$(document).on('click', '.previousschools', (e)=>{
    document.getElementsByClassName('loader')[0].style.display = "block"; // Start Loader
    page = parseInt(e.target.dataset.id);
    search(page, teacherlist);
    document.getElementsByClassName('loader')[0].style.display = "none"; 
});

$(document).on('click', '.nextteachers', (e)=>{
    document.getElementsByClassName('loader')[0].style.display = "block"; // Start Loader
    teacherlist = parseInt(e.target.dataset.id);
    search(page, teacherlist);
    document.getElementsByClassName('loader')[0].style.display = "none"; 
});

$(document).on('click', '.previousteachers', (e)=>{
    document.getElementsByClassName('loader')[0].style.display = "block"; // Start Loader
    teacherlist = parseInt(e.target.dataset.id);
    search(page, teacherlist);
    document.getElementsByClassName('loader')[0].style.display = "none"; 
});

function validatesearchform(zip) {

	if(validateNumber(zip) || zip=="")
	{
		return true;	
	}else{
		toastr.warning('Please provide a valid zip code.');
		return false;	
	}
}


})