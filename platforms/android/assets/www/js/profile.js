$(document).ready(()=>{

	if(localStorage.getItem("role") == "parent"){
						
						$(".profile-row-four-hide").hide();
						$(".profile-row-five-hide").hide();
					}
					else{
						$(".profile-row-four-hide").show();
						$(".profile-row-five-hide").show();
					}
	document.getElementsByClassName('pro_N')[0].innerHTML = `${localStorage.getItem("first_name")} ${localStorage.getItem("last_name")}`;
	document.getElementsByClassName('pro_R')[0].innerHTML = localStorage.getItem("role");
	document.getElementsByClassName('f_name')[0].value = localStorage.getItem("first_name");
	document.getElementsByClassName('l_name')[0].value = localStorage.getItem("last_name");
	document.getElementsByClassName('pro_E')[0].value = localStorage.getItem("email");
	document.getElementsByClassName('pro_C')[0].value = localStorage.getItem("city");
	document.getElementsByClassName('pro_S')[0].value = localStorage.getItem("state");
	
	if(localStorage.getItem("image") == "null" || localStorage.getItem("image") == "null"){
		$(".profile-icon").css('background-image', `url("images/top-io.jpg")`)
		
	}
	else{
		$(".profile-icon").css('background-image', `url(${localStorage.getItem("user_img_url")}/${localStorage.getItem("image")})`)
	}
// console.log("sch_name",localStorage.getItem("school_name"))
console.log("sch_name",localStorage.getItem("school"))

$(document).on('click', '#search_state_input_teacher', (e)=>{

	let statelistItems = $(".states_popup li");
	statelistItems.each(function(idx, li) {
	    if (document.getElementsByClassName('pro_S')[0].value == $(this).find('p').text()) 
	    {
			$(this).addClass("color-change");
	    }
	});
});



$(document).on('click', '#profile_input_gradelevel', (e)=>{
	let statelistItems = $(".gradelevel_popup li");
	statelistItems.each(function(idx, li) {
	    if (document.getElementsByClassName('pro_G')[0].value == $(this).find('p').text()) 
	    {
			$(this).addClass("color-change");

	    }
	});
});

if(localStorage.getItem("school_name") == "null"){
	$(".pro_sch").html(`<option>N/A</option>`)
	// document.getElementsByClassName('pro_sch')[0].value = "N/A";
}
else{
	$(".pro_sch").html(`<option value=${localStorage.getItem("school")}>${localStorage.getItem("school_name")}</option>`)

}

if(localStorage.getItem("grade") == "null"){
	document.getElementsByClassName('pro_G')[0].value = "N/A";
}
else{

	let temp = []
	console.log('temp2', temp);
	temp.push(localStorage.getItem("grade"))
	                    for (var i = temp.length - 1; i >= 0; i--) {
	                        temp[i] = " "+temp[i];
	                    }
	console.log('temp3', temp);
	    
		var listItems = $("#gradelevelModal li");
		

			listItems.each(function(idx, li) {

			    if (temp.includes($(li).find('p').text())) 
			    {
					$(li).addClass("color-change");
			    }else{
					$(li).removeClass("color-change");
			    }

			    // and the rest of your code
			});
	temp = [];
	
	document.getElementsByClassName('pro_G')[0].value = localStorage.getItem("grade");



}

$(document).on('click', '.pro_name', (e)=>{
	let temp = []
	console.log('temp2', temp);
	temp.push(localStorage.getItem("grade"))
	                    for (var i = temp.length - 1; i >= 0; i--) {
	                        temp[i] = " "+temp[i];
	                    }
	console.log('temp3', temp);
	    
	var listItems = $("#gradelevelModal li");
	

	listItems.each(function(idx, li) {

	    if (temp.includes($(li).find('p').text())) 
	    {
			$(li).addClass("color-change");
	    }else{
			$(li).removeClass("color-change");
	    }

	    // and the rest of your code
	});
	temp = [];
});

document.getElementById('user_edit_img').onchange = function (e) {

    var loadingImage = loadImage(
        e.target.files[0],
        function (img) {
            document.getElementById("user_profile_img").src = img.toDataURL();
        },
        {
            orientation: true
        }
    );
};

})