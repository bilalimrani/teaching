$(document).ready(()=>{ 
    var base_url = localStorage.getItem('base_url');

    $(document).on(`click`, `#litopteachers`, (e)=>{

        toprate(e);
    });


    function toprate(e){
        $(`.toppteachers`).html(``); 
        $(`.topsteachers`).html(``); 
    /*  Top Rated Teachers by Parents  */
        document.getElementsByClassName('loader')[0].style.display = "block";
        $.get(`${base_url}/topteachersbyparents`, {}, function(res){
            console.log("data top rated",res)
            let toppteachers_html = ``;
            if(res.responseCode == 204){
                toppteachers_html = ` <h1>${res.message}
                                      </h1>`
                $(`.toppteachers`).append(toppteachers_html); 
            }
            else{
                if(res.responseCode == 200){    
                    let t_img;
                    let pg;
                    $.each(res.response.teachersP, function(index, value){
                        pg = value.avgGrade;
                        
                        if(value.image){
                            t_img = `${res.response.teacher_img_url}/${value.image}`;
                        }
                        else{
                            t_img = "images/top-io.jpg";
                        }

                        let temp = JSON.parse(value.grade);
                        for (var i = temp.length - 1; i >= 0; i--) {
                            temp[i] = " "+temp[i];
                        }
                        
                        toppteachers_html = `
                                    <div class="col-xs-12 teacher-detail-section">
                                        <div class="col-xs-4 teacher-icon">
                                            <div class="Top-teacher-icon" style="background: url(${t_img});"></div>
                                        </div>
                                        <div class="col-xs-8 Teacher-tab-detail top-parents-detail">
                                            <h1 id=${value.id} class="tablinks tDetail" onclick="openCity(event, 'Teacher-detail','Teacher Detail')">${value.name}</h1>
                                            <p class="t-heading">Gr:</p>
                                            <p class="t-content">${temp}</p>
                                            <div class="search-buttons-layout">
                                                <button type="button" class="btn btn-secondary btn-lg btn-teacher-grading">
                                                    <p class="btn-S-content">Parents
                                                        <br>grading
                                                        <p class="btn-S-grade p-grade-btn  ${value.id}toppt">${pg}</p>
                                                    </p>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    `;
                        $(`.toppteachers`).append(toppteachers_html); 
                    });
                }
            }
            document.getElementsByClassName('loader')[0].style.display = "none";
        })
        .fail(function() {
            document.getElementsByClassName('loader')[0].style.display = "none"
            toastr.warning("Please check your internet connection and try again.")
          })


    /*  Top Rated Teachers by Students   */

        $.get(`${base_url}/topteachersbystudents`, {}, function(res){

            console.log(res);
            let topsteachers_html =  ``;
            if(res.responseCode == 204)
            {
                topsteachers_html = ` <h1 >${res.message}
                                      </h1>`
                $(`.topsteachers`).append(topsteachers_html); 
            }
            else{
                if(res.responseCode == 200){
                    let t_img;
                    let sg;
                    $.each(res.response.teachersS, function(index, value){
                        
                        sg = value.avgGrade;
                        if(value.image){
                            t_img = `${res.response.teacher_img_url}/${value.image}`;
                        }
                        else{
                            t_img = "images/top-io.jpg";
                        }
                        let temp = JSON.parse(value.grade);
                        for (var i = temp.length - 1; i >= 0; i--) {
                            temp[i] = " "+temp[i];
                        }
                        topsteachers_html = `
                                    <div class="col-xs-12 teacher-detail-section">
                                        <div class="col-xs-4 teacher-icon">
                                            <div class="Top-teacher-icon" style="background: url(${t_img});"></div>
                                        </div>
                                        <div class="col-xs-8 Teacher-tab-detail top-parents-detail top-studs-detail">
                                            <h1 id=${value.id} class="tablinks tDetail" onclick="openCity(event, 'Teacher-detail','Teacher Detail')" >${value.name}</h1>
                                            <p class="t-heading">Gr:</p><p class="t-content">${temp}</p>
                                            <div class="search-buttons-layout">
                                                <button type="button" class="btn btn-secondary btn-lg btn-student-grading">
                                                    <p class="btn-S-content">Student 
                                                        <br>grading 
                                                        <p class="btn-S-grade ${value.id}topst">${sg}</p>
                                                    </p>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    `;
                        $(`.topsteachers`).append(topsteachers_html); 
                    });
                }
            }
            document.getElementsByClassName('loader')[0].style.display = "none";
        });
    }
})