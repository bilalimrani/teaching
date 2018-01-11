$(document).ready(()=>{
	// Add School Module
		
		// localStorage.clear();
		// console.log(localStorage.getItem('api_token'));
		// onclick="openCity(event, 'add-School', 'Add School')"

$(document).on(`click`, `#liaddschool`, (e)=>{

	if(localStorage.getItem('api_token') || !localStorage.getItem('api_token') == null)
	{

		openCity(event, 'add-School', 'Add School');
	}else{
        $(".signoutClass").empty();
        $(".loginClass").show();
        toastr.info('Please Login to Add School');
        
	}


});

/*===========================================##################========================================================*/
/*===========================================Addschool form ========================================================*/
/*===========================================##################========================================================*/
$('#addschool_btn').on('click',function (argument) {
   
	
	var sname=$('.add_school_name');
	var saddress=$('.add_school_address');
	var sabout=$('.add_school_about');
	var state=$('.add_school_state');
	var city=$('.add_school_city');
	var zip=$('.add_school_zip');
	var image=$('.add_school_logo')[0].files[0];
	var number=$('.add_school_number');
	var url=$('.add_school_url');
	console.log("length",url.val())

    var reg_url = /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/igm; 

	// if (true) {
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
	// else if(!validateUrl(url.val())){
	// 	toastr.warning('Please Provide Valid URL');
	// }
	else if(!state.val()){
		toastr.warning('Please Provide State');
	}
	else if(zip.val() != "" && !validateNumber(zip.val())){

		toastr.warning('Please Provide Valid Zip');
	}
	else if (zip.val().length > 12) {
		toastr.warning('Please Provide Maximum 12 Number Zip');
	}
	else if(!saddress.val()){

		toastr.warning('Please Provide School Address');
	}
	else if(saddress.val().length > 50){

		toastr.warning('Please Provide Maximum 50 Characters School Address');
	}
	else{
        $('#school_name').val($('#school_name').val().trim());

		var data = new FormData($('#schoolform')[0]);
		data.append('name', sname.val());
		data.append('number', number.val());
		data.append('url', url.val());
		data.append('address', saddress.val());
		data.append('city', city.val());
		data.append('state', state.val());
		data.append('zip', zip.val());
		data.append('about', sabout.val());
		data.append('logo', image);
		data.append('api_token', localStorage.getItem('api_token'));
		 document.getElementsByClassName('loader')[0].style.display = "block";
		$.ajax({
			url: `${base_url}/schools`,
			type: 'POST',
			cache: false,
			processData: false,
			contentType: false,

			data: data,
			success: function(result) {
				document.getElementsByClassName('loader')[0].style.display = "none";
				if(result.responseCode == 200){
					toastr.success('School Added Successfully');
					openCity(event, 'Search','TeachingSBS');
					$( '#schoolform' ).each(function(){

					    this.reset();
					});
				}
				else if(result.responseCode == 206){
	                $.each(result.message, function(index, value){
						toastr.error(`${index}`, `${value}`);
	                });
				}
				else if(result.responseCode == 203){
					toastr.error(`${result.message}`);
				}
				else{
					toastr.error(`${result.message}`);				}
			}	
		});

	} 	
	
});

// $('.add_school_name').focusout(function (argument) {
// 	if(!validateWords($(this).val())){

// 		if ($(this).val() =="") {
// 			toastr.warning('Please Provide School Name');
// 		}else{
// 			toastr.warning('Please Provide valid School Name');
// 		}
// 	}	
// });

// $('.add_school_url').focusout(function (argument) {
// 	if(!(validateUrl($(this).val()) || $(this).val()=="")){
// 		toastr.warning('Please Provide valid URL');
// 	}	
// });

// $('.add_school_city').focusout(function (argument) {
// 	if($(this).val()==""){
// 		toastr.warning('Please Provide City');
// 	}	
// });

// $('.add_school_address').focusout(function (argument) {
// 	if($(this).val() ==""){
// 		if ($(this).val() =="") {
// 			toastr.warning('Please Provide School Address');
// 		}else{
// 			toastr.warning('Please Provide valid School Address');
// 		}
// 	}	
// });

$('.add_school_zip').focusout(function (argument) {
	if(!(validateNumber($(this).val()) || $(this).val()=="")){
		toastr.warning('Please Provide Valid Zip');
	
	}	
});

$('.add_school_number').focusout(function (argument) {
	if(!(validatePhNumber($(this).val()) || $(this).val()=="")){

		toastr.warning('Please Provide Valid Phone Number');
	}	
});
$(document).ready(function () {
    $('.add_school_number').mask('(000) 000-0000');
})

// function  addschoolform(snameO,saddressO,saboutO,stateO,cityO,zipO,imageO,numberO,urlO) {

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
// 								if(image){
// 									if(image.size <= 2097152){
// 										isimage=true;
										
// 									}else{
// 										console.log("image1",image)
// 										isimage=false;
// 										toastr.warning('Image size should be less than 2MB');	
// 									}
// 								}
// 								else{
// 									isimage=true;
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

/*===========================================##################========================================================*/
/*===========================================Addschool form ends========================================================*/
/*===========================================##################========================================================*/

})