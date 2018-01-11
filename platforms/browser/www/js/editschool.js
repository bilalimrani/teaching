$(document).ready(()=>{
	
let s_id;
$(document).on(`click`, `.btn_edit_school`, (e)=>{
	
    document.getElementsByClassName('loader')[0].style.display = "block";
	s_id = e.target.dataset.id;
	console.log(s_id);
	if(localStorage.getItem('api_token') || !localStorage.getItem('api_token') == null)
	{
		document.getElementsByClassName('loader')[0].style.display = "none";
		openCity(event, 'Edit-School','Edit School');
		$.ajax({
			url : `${localStorage.getItem("base_url")}/school/${s_id}`,
			method : "GET",
			success : showschool
		});

	}else{
        $(".signoutClass").empty();
        $(".loginClass").show();
        toastr.info('Please Login to Edit School');

	}
	document.getElementsByClassName('loader')[0].style.display = "none";
});

function showschool(res) {
	console.log(res);
	if (res.response.addedby == localStorage.getItem('user_id')) 
	{
		$('.edit_school_name').val(res.response.name);
		$('.edit_school_number').val(res.response.number);
		$('.edit_school_url').val(res.response.url);
		$('.edit_school_about').val(res.response.about);
		$('.edit_school_city').val(res.response.city);
		$('.edit_school_state').val(res.response.state);
		$('.edit_school_zip').val(res.response.zip);
		$('.edit_school_address').val(res.response.address);
		$('.edit_school_pic').attr('src', `${res.response.logo ? res.response.school_img_url+'/'+res.response.logo : ""}`);
		// $('.edit_school_pic').attr('src', `${res.response.school_img_url}/${res.response.logo}`);

		// var zip=$('.edit_teacher_zip');
		// var taddress=$('.edit_teacher_address');
		// var state=$('.edit_teacher_state');
		// var city=$('.edit_teacher_city');
		// var zip=$('.edit_teacher_zip');
	}else{
		toastr.warning('You Are Not Authorized For This Action');
	}

}

	// $('.edit_school_name').focusout(function (argument) {
	// 	if(!validateWords($(this).val())){

	// 		if ($(this).val() =="") {
	// 			toastr.warning('Please Provide School Name');
	// 		}else{
	// 			toastr.warning('Please Provide valid School Name');
	// 		}
	// 	}	
	// });

	// $('.edit_school_url').focusout(function (argument) {
	// 	if(!(validateUrl($(this).val()) || $(this).val()=="")){
	// 		toastr.warning('Please Provide valid URL');
	// 	}	
	// });

	// $('.edit_school_city').focusout(function (argument) {
	// 	if($(this).val()==""){
	// 		toastr.warning('Please Provide City');
	// 	}	
	// });

	// $('.edit_school_address').focusout(function (argument) {
	// 	if($(this).val() ==""){
	// 		if ($(this).val() =="") {
	// 			toastr.warning('Please Provide School Address');
	// 		}else{
	// 			toastr.warning('Please Provide valid School Address');
	// 		}
	// 	}	
	// });

	// $('.edit_school_zip').focusout(function (argument) {
	// 	if(!(validateNumber($(this).val()) || $(this).val()=="")){
	// 		toastr.warning('Please Provide Valid Zip');
		
	// 	}	
	// });

	$('.edit_school_number').focusout(function (argument) {
		if(!(validatePhNumber($(this).val()) || $(this).val()=="")){

			toastr.warning('Please Provide Valid Phone Number');
		
		}	
	});

$(document).on(`click`, `#updateschool_btn`, (e)=>{

    
	var sname=$('.edit_school_name');
	var saddress=$('.edit_school_address');
	var sabout=$('.edit_school_about');
	var state=$('.edit_school_state');
	var city=$('.edit_school_city');
	var zip=$('.edit_school_zip');
	var number=$('.edit_school_number');
	var url=$('.edit_school_url');
	var image = $('.edit_school_logo')[0].files[0];
	var state = $('.edit_school_state');

    var reg_url = /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/igm; 

	if (image && !ValidateFileType(image)) {
		toastr.warning('Please Enter Valid Image (jpg, jpeg, png)');		
	}else
	if(image && image.size > 2097152){
		toastr.warning("File size maximum 2MB")
	}
	else if(!validateWords(sname.val())){
		
		if (sname.val() =="") {
			toastr.warning('Please Provide School Name');
		}else if(sname.val().length < 2){
			toastr.warning('Please Provide Minimum 2 Character School Name');
		}else if(sname.val().length > 50){
			toastr.warning('Please Provide Maximum 50 Character School Name');
		}else{

			toastr.warning('Please Provide Valid School Name');
		}
	}
	else if (number.val() != "" && number.val().length != 14) {
		toastr.warning('Please Provide Valid Phone Number');
	}
	else if (!reg_url.test(url.val()) && url.val() != "") {
		toastr.warning('Please Enter Valid Website URL');
	}
	else if(!validateName(city.val())){
		
		if (city.val() =="") {
			toastr.warning('Please Provide City');
		}else if (city.val().length < 2) {
			toastr.warning('Please Provide Minimum 2 Character City');
		}else if (city.val().length > 25) {
			toastr.warning('Please Provide Maximum 25 Character City');
		}else{
			toastr.warning('Please Provide Valid City');
		}
	}
	else if(!state.val()){
		toastr.warning('Please Provide State');
	}
	else if(zip.val() != "" && !validateNumber(zip.val())){

		toastr.warning('Please Provide Valid Zip');
	}
	else if (zip.val().length > 12) {
		toastr.warning('Please Provide Maximum 12 Number Zip');
	}
	// else if(zip.val().length > 12){
	// 	toastr.warning('Please Provide Maximum 12 Characters');
	// }

	

	else if(!saddress.val()){

		toastr.warning('Please Provide School Address');
	}
	else if(saddress.val().length > 50){

		toastr.warning('Please Provide Maximum 50 Characters School Address');
	}
	else
	{
        $('.edit_school_name').val($('.edit_school_name').val().trim());
        

		var form1 = new FormData($('#editteacherform')[0]);

		form1.append('name', sname.val());
		form1.append('number', number.val());
		form1.append('url', url.val());
		form1.append('address', saddress.val());
		form1.append('city', city.val());
		form1.append('state', state.val());
		form1.append('zip', zip.val());
		form1.append('logo', image);
		form1.append('about', sabout.val());
		form1.append('school_id', s_id);
		form1.append('api_token', localStorage.getItem("api_token"))
		
		let data = { api_token: localStorage.getItem("api_token"), image : image, name:sname.val(), number:number.val(), url:url.val(), address:saddress.val(), city:city.val(), state:state.val(), zip:zip.val(), logo:image, about:sabout.val() };
		document.getElementsByClassName('loader')[0].style.display = "block";
		$.ajax({
			url: `${localStorage.getItem("base_url")}/schoolUpdate`,
			type: 'POST',
			cache: false,
			processData: false,
			contentType: false,

			data: form1,
			success: function(res) {
				document.getElementsByClassName('loader')[0].style.display = "none";
				console.log("res",res);
				if(res.responseCode == 200){
					toastr.success('School Updated Successfully');
					openCity(event, 'Search','TeachingSBS');
					$( '#edit_schoolform' ).each(function(){

					    this.reset();
					});
				}
				else if(res.responseCode == 203){
	                $.each(res.message, function(index, value){
						toastr.error(`${index}`, `${value}`);
						console.log('test');
	                });
				}
				else if(res.responseCode == 204){
					toastr.warning('Invalid Token');
				}
			}	
		});

	}
});


$(document).ready(function () {
    $('.edit_school_number').mask('(000) 000-0000');
})
// function  editschoolform(snameO,saddressO,saboutO,stateO,cityO,zipO,imageO,numberO,urlO) {
// 	var sname=snameO.val();
// 	var saddress=saddressO.val();
// 	var sabout=saboutO.val();
// 	var state=stateO.val();
// 	var city=cityO.val();
// 	var zip=zipO.val();
// 	var number=numberO.val();
// 	var url=urlO.val();
// 	var image=imageO;

// 	var isname;
// 	var isaddress;
// 	var issabout;
// 	var isstate;
// 	var iscity;
// 	var iszip;
// 	var isimage;
// 	var isnumberr;
// 	var isurl;




// 	if(validateWords(sname)){
// 		isname=true;
// 		if(validateUrl(url) || url==""){
// 			isurl=true;
// 			if(saddress !=""){
// 				isaddress=true;
// 				if(state !=""){
// 					isstate=true;
// 					if(city !=""){
// 						iscity=true;
// 						if(validateNumber(zip) || zip==""){
// 							iszip=true;
// 							if(validatePhNumber(number) || number==""){
// 								isnumberr=true;
// 								if(image.size <= 2097152){
// 									isimage=true;
									
// 								}else{
// 									isimage=false;
// 									toastr.warning('Image size should be less than 2MB');	
// 								}
// 							}else{

// 								isnumberr=false;
// 								toastr.warning('Please Provide valid School Number');
// 							}
// 						}else{
// 							iszip=false;
// 							toastr.warning('Please Provide valid Zip');
// 						}
// 					}else{
// 						iscity=false;
// 						toastr.warning('Please Provide City');
// 					}
// 				}else{
// 					isfname=false;
// 					toastr.warning('Please Select A State');
// 				}
// 			}else{
// 				isaddress=false;
// 				if (saddress =="") {
// 					toastr.warning('Please Provide School Address');
// 				}else{
// 					toastr.warning('Please Provide valid School Address');
// 				}
// 			}
// 		}else{
// 			isurl=false;
// 			toastr.warning('Please Provide URL');
// 		}
// 	}else{
// 		if (sname =="") {
// 			toastr.warning('Please Provide School Name');
// 		}else{
// 			toastr.warning('Please Provide Valid Name');
// 		}
// 	}

// 	if (isname==true && isaddress== true  && isstate== true && iscity== true && (isurl== true || url=="") && (isnumberr == true && isnumberr != "") && (isimage== true || image=="") ) {
// 		return true;
// 	}else{
		
// 		return false;
// 	}
// }

})