$(document).ready(()=>{
      $(document).on('click', '#user_edit_img', (e)=>{
            capturePhoto();
      });
      var options = {
            quality: 50,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
            allowEdit: true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 100,
            targetHeight: 100,
            popoverOptions: Camera.PopoverArrowDirection.ARROW_UP,
            saveToPhotoAlbum: false,
            correctOrientation:true
      };

      function capturePhoto(){
            
            navigator.camera.getPicture(onSuccess, onFail, options);
      }





 var imageData1

 function onSuccess(imageData) {
      console.log("imageData",imageData)
      imageData1 = imageData;
}

function onFail(message) {
      alert('Failed because: ' + message);
}
})