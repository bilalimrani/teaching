


$(document).ready(()=>{
	let edit_commenthtml = document.getElementsByClassName('editComment')[0];
	let value;
	let id;
	let comment_val = ``;
	$(document).on(`click`, `.btn_editComment`, (e)=>{

		id = e.target.value;
		
		let comment_val = document.getElementById(`comment_val${id}`).textContent;
		console.log("comment_val", comment_val);
		let editComment_html = ``;
		editComment_html = `
		
		<div class="modal fade" id="myModal${id}" role="dialog">
		    <div class="modal-dialog">
		    
		      <!-- Modal content-->
		      <div class="modal-content">
		        <div class="modal-header">
		          <button type="button" class="close" data-dismiss="modal">&times;</button>
		          <h4 class="modal-title">Edit Comment</h4>
		        </div>
		        <form name="edit_comment" id="edit_comment${id}">
		        	<div class="modal-body">
			          <textarea class="form-control text_area" name="textarea" id=comment_${id}>${comment_val}</textarea>
			        </div>
		        </form>
		        <div class="modal-footer">
		        	<button type="submit" class="btn btn-default editComment_btn" >Edit</button>
		          	<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
		        </div>
		      </div>
		      
		    </div>
		  </div>
		`
		edit_commenthtml.innerHTML = editComment_html;
		$(`#myModal${id}`).modal('show');
	});
	$(document).on(`click`, `.editComment_btn`, (e)=>{
		
		let edit_val = $(`#comment_${id}`).val();

		if(edit_val){
			document.getElementsByClassName('loader')[0].style.display = "block"
			$.post(`${localStorage.getItem("base_url")}/updatecomment`, {api_token : localStorage.getItem("api_token"), comment_id : id, comment : edit_val}, (res)=>{
				document.getElementsByClassName('loader')[0].style.display = "none";
				console.log("id",res)
				$(`#myModal${res.response.id}`).modal('toggle');
				if(res.responseCode == 200){
					document.getElementById(`comment_val${id}`).innerHTML = res.response.comment;
					toastr.success("Edit successfully")
				}
				else{
					toastr.error("Error")
				}
			});
		}
		else{
			toastr.warning("Please Provide Feedback");
			document.getElementsByClassName('loader')[0].style.display = "none";
		}
		
		// console.log(`test doc`, document.getElementById(`#comment_${id}`).textContent);
	});
	// $(document).delegate('.edit_comment', 'click', (e)=>{
	// 	id = e.target.value;
	// 	let comment_val = document.getElementById(`comment_val${id}`).textContent;
		
	// 	let editComment_html = `
		
	// 	<div class="modal fade" id="editComment_modal" role="dialog">
	// 	    <div class="modal-dialog">
		    
	// 	      <!-- Modal content-->
	// 	      <div class="modal-content">
	// 	        <div class="modal-header">
	// 	          <button type="button" class="close" data-dismiss="modal">&times;</button>
	// 	          <h4 class="modal-title">Edit Comment</h4>
	// 	        </div>
	// 	        <form name="edit_comment" id="edit_comment${id}">
	// 	        	<div class="modal-body">
	// 		          <textarea class="form-control text_area" name="textarea" id=comment_${id}>${comment_val}</textarea>
	// 		        </div>
	// 	        </form>
	// 	        <div class="modal-footer">
	// 	        	<button type="submit" class="btn btn-default editComment_btn" >Edit</button>
	// 	          	<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
	// 	        </div>
	// 	      </div>
		      
	// 	    </div>
	// 	  </div>
	// 	`
	// 	edit_commenthtml.innerHTML = editComment_html;


	// });


	// $(document).on('change', '.text_area', ()=>{
	// 	console.log("ok",$(".modal").find('.text_area').val())
	// })
	// $(document).delegate('.editComment_btn', 'click', ()=>{
	// 	let value = "";
	// 	value = this.has(`#comment_${id}`).val();

	// 	// document.getElementsByClassName('text_area').text = value;
	// 	console.log("comment_", id);
	// 	console.log("valb", $(`#comment_${id}`).val());
	// 	console.log("valb", $(`#comment_${id}`).text());
	// 	$(`#comment_${id}`).val(value);
	// 	console.log("vala", $(`#comment_${id}`).text());
	// 	console.log("click2", value);
	// })
})