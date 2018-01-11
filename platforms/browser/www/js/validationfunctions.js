
/*===========================================##################========================================================*/
/*===================================form validation functions | Khuram ================================================*/
/*===========================================##################========================================================*/
function check_email(email){  
    var reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,7})+$/;
    if(reg.test(email)){
        return true;
    }else{  
        return false;
    }  
} 

function validateName(name){  
	
    /*var reg = /^[a-zA-Z]*$/;*/ /*ONLY characters*/
    /*var reg = /^[a-zA-Z\s]+\,[a-zA-Z\s]+$/;*/ /*ONLY words with single space*/
    // var reg = /^[a-zA-Z]+(?:.)[a-zA-Z](?:[ [a-zA-Z])*$/; /*ONLY words with single space*/
     var reg = /^[a-zA-Z\s\.]+$/; /*ONLY words with single space*/
    var min_max = /^.{2,25}$/;
    if(reg.test(name) && min_max.test(name)){
        return true;
    }else{  
        return false;
    }  
} 

function validateWords(words){  
   // var reg = /^[A-Za-z']+( [A-Za-z']+)*$/;
    var reg = /^[a-zA-Z\s\.]+$/; /*ONLY words with single space*/
    var min_max = /^.{2,50}$/;
    if(reg.test(words) && min_max.test(words)){
        return true;
    }else{  
        return false;
    }  
} 

function validateUrl(words){  
    /*var reg = /^(ftp|http|https):\/\/[^ "]+$/;*/ /*ONLY words with single space*/
    var reg = /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/igm; 
    if(reg.test(words) ){
        return true;
    }else{  
        return false;
    }  
} 

function validatePassword(password){  
    var reg = /^\S*$/;   
    var min_max = /^.{6,15}$/;
    if(reg.test(password) && min_max.test(password)){
        return true;
    }else{  
        return false;
    }  
}

function confirmPassword(val,val2){  
    if(val === val2 && val !=""){
        return true;
    }else{  
        return false;
    }  
}



function validateNumber(number){  
    /*var reg = /^\d+$/;*/
    var reg = /^[0-9]{1,12}$/;
    var min_max = /^.{6,15}$/;
    if(reg.test(number)){
        return true;
    }else{  
        return false;
    }  
} 


function validatePhNumber(number){  
    /*var reg = /^\d+$/;*/
   /* var reg = /^((\+1)|1)? ?\(?(\d{3})\)?[ .-]?(\d{3})[ .-]?(\d{4})( ?(ext\.? ?|x)(\d*))?$/;*/
/*    var reg = /^[2-9]\d{2}-\d{3}-\d{4}$/;*/
   var reg = /(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$/;
/*    var min_max = /^.{6,15}$/;*/
    if(reg.test(number)){
        return true;
    }else{
        return false;
    }  
} 

function validateFiles(value){  
    var reg = /([a-zA-Z0-9\s_\\.\-:])+(.png|.jpg|.jpeg)$/ ;
    var min_max = /^.{6,15}$/;
    if(reg.test(value)){
        return true;
    }else{  
        return false;
    }  
} 

function ValidateFileType(file) 
{
    if (file.type == "image/jpg" || file.type == "image/jpeg" || file.type == "image/png") 
    {
        return true;
    }else{
        return false;
    }
}

function ValidateFileSize(file) 
{
    if (file.size < 2097152) 
    {
        return true;
    }else{
        return false;
    }
}
