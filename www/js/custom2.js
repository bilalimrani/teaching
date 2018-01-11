

$(document).ready(()=>{
    
/*  This Module wil get states from api and wil populate it on states modal     */
/*  Fetch States and populate on modal  */

    var base_url = localStorage.getItem('base_url');

    function st(){
      
        
        $.ajax({
            url : `${base_url}/fetchstates`,
            method : "get", 

            success : (res)=>{
                
                let states = ``;
                $.each(res.response, function(key, value) 
                {
                    states += `<li id=${value}><p id=${value}>${value}</p><i class="fa f fa-check-circle pull-right" aria-hidden="true"></i></li>`;
                });
                $('.states_popup').html(states);
            },

            error : ()=>{
               toastr.warning("Please check your internet connection and try again.")
            }
        })

    }
    st();
/*  On Selecting State from dropdown of Search Section  */
    $('#states').on('change', function () {
      
        var stateID = $(this).val();

        var state = $("#states option:selected").text();
        $('#state_id').val(state);
        $(this).closest('div').removeClass('has-error');
        $(this).closest('div').find('label').remove();
    });

$(document).on('click', ".states_popup li", function() {

   

    $('.states_popup li').removeClass("color-change"); //Remove any "active" class
    $(this).addClass("color-change"); //Add "active" class to selected tab
    var states = localStorage.getItem("states_input");
    $('#' + states).val($(this).find('p').text());
    $('#stateModal').modal('hide');
});
/*  End Fetch States    */


    $("#state_search").keyup(function(){
        var filter = $(this).val(), count = 0;
        $(".states_popup li").each(function(){
            if ($(this).text().search(new RegExp(filter, "i")) < 0) {
                $(this).hide();
            } else {
                $(this).show();
                count++;
            }
        });
    });


     $(".gradeLevel").keyup(function(){
        var filter = $(this).val(), count = 0;
        $(".gradelevel_popup li").each(function(){
            if ($(this).text().search(new RegExp(filter, "i")) < 0) {
                $(this).hide();
            } else {
                $(this).show();
                count++;
            }
        });
    });

   

    $('#mySelect2').select2({
      selectOnClose: true
    });








})