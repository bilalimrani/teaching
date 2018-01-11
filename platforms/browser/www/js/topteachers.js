$(document).ready(()=>{
    // Top Rated Teachers 

    var base_url = localStorage.getItem('base_url');

$(document).on(`click`, `#litopteachers`, (e)=>{

    $(`.toppteachers`).html(``); 
    $(`.topsteachers`).html(``); 
/*  Top Rated Teachers by Parents  */
    document.getElementsByClassName('loader')[0].style.display = "block";
    $.get(`${base_url}/topteachersbyparents`, {}, function(res){

        let toppteachers_html = ``;
        if(res.responseCode == 204){
            toppteachers_html = ` <div class="col-md-2" >${res.message}
                                  </div>`
            $(`.toppteachers`).append(toppteachers_html); 
        }
        else{
            if(res.responseCode == 200){    
                let t_img;
                let pg;
                $.each(res.response.teachersP, function(index, value){
                    $.ajax({
                        url : `${localStorage.getItem("base_url")}/teacher/${value.teachers.id}`,
                        method : "GET",
                        success : function(resp){
                            pg = resp.response.pGrade;
                            
                            if(value.teachers.image){
                                t_img = `${res.response.teacher_img_url}/${value.teachers.image}`;
                            }
                            else{
                                t_img = "http://bonniesomerville.nz/wp-content/uploads/2015/08/profile-icon.png";
                            }
                            
                            toppteachers_html = `
                                        <div class="col-xs-12 teacher-detail-section">
                                            <div class="col-xs-4 teacher-icon">
                                                <div class="Top-teacher-icon" style="background: url(${t_img});"></div>
                                            </div>
                                            <div class="col-xs-8 Teacher-tab-detail top-parents-detail">
                                                <h1 id=${value.teachers.id} class="tablinks tDetail" onclick="openCity(event, 'Teacher-detail','Teacher Detail')">${value.teachers.name}</h1>
                                                <p class="t-heading">Grade:</p>
                                                <p class="t-content">${JSON.parse(value.teachers.grade)}</p>
                                                <div class="search-buttons-layout">
                                                    <button type="button" class="btn btn-secondary btn-lg btn-teacher-grading">
                                                        <p class="btn-S-content">Parents
                                                            <br>grading
                                                            <p class="btn-S-grade p-grade-btn  ${value.teachers.id}toppt">${pg}</p>
                                                        </p>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        `;
                            $(`.toppteachers`).append(toppteachers_html); 
                        }
                    });
                });
            }
        }
        document.getElementsByClassName('loader')[0].style.display = "none";
    });


/*  Top Rated Teachers by Students   */

    $.get(`${base_url}/topteachersbystudents`, {}, function(res){

        console.log(res);
        let topsteachers_html =  ``;
        if(res.responseCode == 204)
        {
            topsteachers_html = ` <div class="col-md-2" >${res.message}
                                  </div>`
            $(`.topsteachers`).append(topsteachers_html); 
        }
        else{
            if(res.responseCode == 200){
                let t_img;
                let sg;
                $.each(res.response.teachersS, function(index, value){
                    
                    $.ajax({
                        url : `${localStorage.getItem("base_url")}/teacher/${value.teachers.id}`,
                        method : "GET",
                        success : function(resp){
                            sg = resp.response.sGrade;
                            if(value.teachers.image){
                                t_img = `${res.response.teacher_img_url}/${value.teachers.image}`;
                            }
                            else{
                                t_img = "http://bonniesomerville.nz/wp-content/uploads/2015/08/profile-icon.png";
                            }
                            topsteachers_html = `
                                        <div class="col-xs-12 teacher-detail-section">
                                            <div class="col-xs-4 teacher-icon">
                                                <div class="Top-teacher-icon" style="background: url(${t_img});"></div>
                                            </div>
                                            <div class="col-xs-8 Teacher-tab-detail top-parents-detail top-studs-detail">
                                                <h1 id=${value.teachers.id} class="tablinks tDetail" onclick="openCity(event, 'Teacher-detail','Teacher Detail')" >${value.teachers.name}</h1>
                                                <p class="t-heading">Grade:</p>
                                                <p class="t-content">${JSON.parse(value.teachers.grade)}</p>
                                                <div class="search-buttons-layout">
                                                    <button type="button" class="btn btn-secondary btn-lg btn-student-grading">
                                                        <p class="btn-S-content">Student 
                                                            <br>grading 
                                                            <p class="btn-S-grade ${value.teachers.id}topst">${sg}</p>
                                                        </p>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        `;
                            $(`.topsteachers`).append(topsteachers_html); 
                        }
                    });
                });
            }
        }
        document.getElementsByClassName('loader')[0].style.display = "none";
    });
});



})