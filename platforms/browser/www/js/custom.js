
$(document).ready(function() {

 $.fn.modal.Constructor.prototype.enforceFocus = function () {};
 $('.select-form').select2();
});

// Add Teacher image Preview
document.getElementById('uploadfile').onchange = function (e) {

    var loadingImage = loadImage(
        e.target.files[0],
        function (img) {
            document.getElementById("top-inner-img").src = img.toDataURL();
        },
        {
            orientation: true
        }
    );
};

$("#btnfile").click(function () {
  $("#uploadfile").click();
function readURL(input) {

  if (input.files && input.files[1]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      $('#top-inner-img').attr('src', e.target.result);
    }

    reader.readAsDataURL(input.files[1]);
  }
}

$("#uploadfile").change(function(){
  readURL(this);

});
});

// Add school image Preview

document.getElementById('uploadfileSchool').onchange = function (e) {

    var loadingImage = loadImage(
        e.target.files[0],
        function (img) {
            document.getElementById("top-inner-img-add-sc").src = img.toDataURL();
        },
        {
            orientation: true
        }
    );
};

$("#btnfileSchool").click(function () {
  // $("#uploadfileSchool").click();
function readURL(input) {

  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      $('#top-inner-img-add-sc').attr('src', e.target.result);
    }

    reader.readAsDataURL(input.files[0]);
  }
}

$("#uploadfileSchool").change(function(){
  readURL(this);

});
});

// Edit school image Preview

document.getElementById('uploadfileeditSchool').onchange = function (e) {

    var loadingImage = loadImage(
        e.target.files[0],
        function (img) {
            document.getElementById("top-inner-img-edit-sc").src = img.toDataURL();
        },
        {
            orientation: true
        }
    );
};

$("#btnfileeditSchool").click(function () {
  // $("#uploadfileeditSchool").click();
function readURL(input) {

  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      $('#top-inner-img-edit-sc').attr('src', e.target.result);
    }

    reader.readAsDataURL(input.files[0]);
  }
}

$("#uploadfileeditSchool").change(function(){
  readURL(this);

});
});

// Edit teacher image Preview

document.getElementById('uploadfileeditteacher').onchange = function (e) {

    var loadingImage = loadImage(
        e.target.files[0],
        function (img) {
            document.getElementById("top-inner-img1").src = img.toDataURL();
        },
        {
            orientation: true
        }
    );
};

$("#btnfileeditteacher").click(function () {
  // $("#uploadfileeditSchool").click();
function readURL(input) {

  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      $('#top-inner-img1').attr('src', e.target.result);
    }

    reader.readAsDataURL(input.files[0]);
  }
}

$("#uploadfileeditteacher").change(function(){
  readURL(this);

});
});



$('#OpenImgUpload').click(function(){ $('#imgupload').trigger('click'); });



$("#btnfileeditteacher").click(function () {
  $("#uploadfileeditteacher").click();
});

$("#btnfileSchool").click(function () {
  $("#uploadfileSchool").click();
});

$("#btnfileeditSchool").click(function () {
  $("#uploadfileeditSchool").click();
});

// Profile image load script

$("input[type='image']").click(function() {
  $("input[id='my_file']").click();
});

// document.getElementById('uploadfile').onchange = function (e) {

//     var loadingImage = loadImage(
//         e.target.files[0],
//         function (img) {
//             document.getElementById("top-inner-img").src = img.toDataURL();
//         },
//         {
//             orientation: true
//         }
//     );
// };
function readURL(input) {

  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function(e) {
      $('.profile-icon').attr('src', e.target.result);
    }

    reader.readAsDataURL(input.files[0]);
  }
}

$("#my_file").change(function() {
  readURL(this);
});


// $('#cities').on('change', function () {
//             var city = $("#cities option:selected").text();
//             $('#city').val(city);
//             $(this).closest('div').removeClass('has-error');
//             $(this).closest('div').find('label').remove();
//         });


$(document).on('click', '.load', ()=>{
  document.getElementsByClassName('loader')[0].style.display = "none";
})

function openCity(evt, cityName,title, prev = null) {

  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(cityName).style.display = "block";
  window.scrollTo(0,0);
  if(cityName == "Search-result"){
    $('#pills-tab a:first').tab('show')
  }
  if(cityName == "Top-teachers"){
    $('#pills-tab-top a:first').tab('show')
  }
  if(cityName == "About-pages"){
    $('#pills-about-tab-detail a:first').tab('show')
  }
  if(cityName == "Teacher-detail"){
    $('#pills-tab-detail a:first').tab('show')
  }
  if(cityName == "Search"){
    $('.states_popup li').removeClass("color-change");
    $('#Search input').val('');
  }

  if(cityName == "Add-teacher"){
    $('.gradelevel_popup li').removeClass("color-change");
    $('.schools_popup li').removeClass("color-change");
    $('#Add-teacher input').val('');
  }

  if(cityName == "Edit-teacher"){
    // $('.gradelevel_popup li').removeClass("color-change");
    $('.schools_popup li').removeClass("color-change");
    $('#Add-teacher input').val('');
  }


  if(cityName == "add-School"){
    $('.states_popup li').removeClass("color-change");
    $('.schools_popup li').removeClass("color-change");
    $('#Add-teacher input').val('');
  }

  if(cityName == "Edit-School"){
    // $('.states_popup li').removeClass("color-change");
    $('.schools_popup li').removeClass("color-change");
    $('#Add-teacher input').val('');
  }

  if(cityName == "Profile"){
    $('.states_popup li').removeClass("color-change");
  }


  $("#the_title").text(title);
  evt.currentTarget.className += " active";

  if (title == 'School Detail' || title ==  'Teacher Detail') {

    $('.detailed-brand').show();
    $('.detailed_toggle').hide();
  }
  else{
    $('.detailed-brand').hide();
    $('.detailed_toggle').show();
  }

  if (prev == 'gotosearch' ) {

    localStorage.setItem('backstate', 'Search-result');
  } else {
    localStorage.setItem('backstate', 'Top-teachers');
  }
}

$('#backButton').on('click', function() {
  if ($("#Teacher-detail").css('display') == 'block') {
    if (localStorage.getItem('backstate') == "Search-result") {
      openCity(event, 'Search-result', 'Search Results')
    } else if (localStorage.getItem('backstate') == "Top-teachers") {
      openCity(event, 'Top-teachers', 'Top-teachers')
    }
  }else if($("#School-detail").css('display') == 'block'){
    openCity(event, 'Search-result', 'Search Results')
  }
});

$('#registerModal').on('hidden.bs.modal', function () {
  $('.states_popup li').removeClass("color-change");
  $('.schools_popup li').removeClass("color-change");
  $('.gradelevel_popup li').removeClass("color-change");
  $('#register_Navs a:first').tab('show');
  $('#registerModal input').val('');
    // do something…
  });

// Dropdown fields 

// States POPUP Field
$(document).on('click', '.states_popup li', (e)=>{

    // $('.states_popup li').removeClass("color-change"); //Remove any "active" class
    
    // $(e.target).addClass("color-change"); //Add "active" class to selected tab
    var states=localStorage.getItem("states_input");
    $('#'+states).val($(this).find('p').text());
    // $('#stateModal').modal('hide');
  })
// $(".states_popup li").on('click',function(e) {
//     $('.states_popup li').removeClass("color-change"); //Remove any "active" class

//     $(this).addClass("color-change"); //Add "active" class to selected tab
//     var states=localStorage.getItem("states_input");
//    $('#'+states).val($(this).find('p').text());
//     $('#stateModal').modal('hide');
// });

$("#search_states").on('click',function() {
  localStorage.setItem("states_input", $(this).find('input').attr('id'));
  $('#stateModal').modal('show');
});

$("#search_states_school").on('click',function() {
  localStorage.setItem("states_input", $(this).find('input').attr('id'));
  $('#stateModal').modal('show');
});

$("#search_states_school_1").on('click',function() {
  localStorage.setItem("states_input", $(this).find('input').attr('id'));
  $('#stateModal').modal('show');
});

$("#search_states_teacher").on('click',function() {
  localStorage.setItem("states_input", $(this).find('input').attr('id'));
  $('#stateModal').modal('show');
});

$("#search_states_register").on('click',function() {
  localStorage.setItem("states_input", $(this).find('input').attr('id'));
  $('#stateModal').modal('show');
});


$("#search_states_parent_register").on('click',function() {
  localStorage.setItem("states_input", $(this).find('input').attr('id'));
  $('#stateModal').modal('show');
});




// School POPUP Fields

$(".schools_popup li").on('click',function() {  
    $('.schools_popup li').removeClass("color-change"); //Remove any "active" class  
    $(this).addClass("color-change"); //Add "active" class to selected tab  
    var states=localStorage.getItem("school_input");
    $('#'+states).val($(this).find('p').text());
    $('#schoolModal').modal('hide');
  });





$("#teacher_schools").on('click',function() {  
  localStorage.setItem("school_input", $(this).find('input').attr('id'));
  $('#schoolModal').modal('show');
});

$("#edit_teacher_schools").on('click',function() {  
  localStorage.setItem("school_input", $(this).find('input').attr('id'));
  $('#schoolModal').modal('show');
});

$("#school_schools").on('click',function() {  
  localStorage.setItem("school_input", $(this).find('input').attr('id'));
  $('#schoolModal').modal('show');
});

$("#profile_schools").on('click',function() {  
  localStorage.setItem("school_input", $(this).find('input').attr('id'));
  $('#schoolModal').modal('show');
});

$("#register_schools").on('click',function() {  
  localStorage.setItem("school_input", $(this).find('input').attr('id'));
  $('#schoolModal').modal('show');
});

// Grade Level POPUP Fields

let flag = false;
$(document).on('click', '.g_flag', ()=>{
  flag = true;
})



let arr = [];

$(".gradelevel_popup li").on('click',function(e) {  
  
  var states=localStorage.getItem("tgrade_input");
  if(flag == true){
    console.log("array",arr)
    if (arr.includes($(this).find('p').text())) {
      let index = arr.indexOf($(this).find('p').text());
      arr.splice(index, 1);
      $(this).removeClass("color-change");
      eventstring = arr.toString().replace(/"/g, "");
      
    console.log(eventstring, "eventstring");
    $('#'+states).val(eventstring);
    }
    else{
      $(this).addClass("color-change");
      arr.push($(this).find('p').text())
      
      eventstring = arr.toString().replace(/"/g, "");
      
    console.log(eventstring, "eventstring");
      $('#'+states).val(eventstring);
    }
    // $(this).addClass("color-change");
    // arr.push($(this).find('p').text())
    // eventstring = arr.toString().replace(/"/g, "");
    // console.log("eventstring", eventstring)
    // $('#'+states).val(eventstring);
  }
  else{
    $('.gradelevel_popup li').removeClass("color-change");
     $(this).addClass("color-change");

    $('#'+states).val($(this).find('p').text());
    let d =document.getElementById(states)
    d.id = `${$(this).find('p').text().replace(/ /g,"_")}`;

  }

$('#gradelevelModal').modal('hide');
});






$(".edit_teacher_grade").on('click', (e)=>{
  console.log("ok", $(e.target).text())
})









   // var theval=$('#'+states).val();
   // theval +="," + $(this).find('p').text();

   // $('#'+states).val(theval);




   $("#teacher_gradelevel").on('click',function() {  
    localStorage.setItem("tgrade_input", $(this).find('input').attr('id'));
    $('#gradelevelModal').modal('show');
  });
   $("#edit_teacher_gradelevel").on('click',function() {  
    localStorage.setItem("tgrade_input", $(this).find('input').attr('id'));
    $('#gradelevelModal').modal('show');
  });
   $("#profile_gradelevel").on('click',function() {  
    localStorage.setItem("tgrade_input", $(this).find('input').attr('id'));
    $('#gradelevelModal').modal('show');
  });
   $("#register_gradelevel_select").on('click',function() {  
    var abc= $(this).find('input').attr('id').toString();

    localStorage.setItem("tgrade_input", abc.replace(/ /g,"_"));
    $('#gradelevelModal').modal('show');
  });

// Teacher subject field

// $(".teachingsubject_popup li").on('click',function() {  
//     $('.teachingsubject_popup li').removeClass("color-change"); //Remove any "active" class  
//     $(this).addClass("color-change"); //Add "active" class to selected tab  
//     var states=localStorage.getItem("states_input");
//    $('#'+states).val($(this).find('p').text());
//    $('#gradeModal').modal('hide');
// });
// $("#teacher_teachingsubject").on('click',function() {  
//   localStorage.setItem("states_input", $(this).find('input').attr('id'));
//  $('#gradeModal').modal('show');
// });


$(document).ready(function() {
  $('#search-result-btn').click(function() {
    $('#search-result').toggle("slide");
  });
});




   // $(document).ready(function(){
   //        $("#search-result-btn").click(function(){
   //          $("#search").hide();
   //          $("#search-result").show();
   //        });
   //       });





   $('#backButton').on('click', function() {
    if ($("#Teacher-detail").css('display') == 'block') {
      if (localStorage.getItem('backstate') == "Search-result") {
        openCity(event, 'Search-result', 'Search Results')
      } else if (localStorage.getItem('backstate') == "Top-teachers") {
        openCity(event, 'Top-teachers', 'Top-teachers')
      }
    }else if($("#School-detail").css('display') == 'block'){
      openCity(event, 'Search-result', 'Search Results')
    }
  });

$('.donate_Bbtn').on('click', function() {
    $(this).toggleClass('clicked');
});