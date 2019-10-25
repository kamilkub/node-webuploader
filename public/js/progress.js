document.querySelector("input[type=submit]").addEventListener('click', function() {

    // FORMDATA CONTAINING ALL OF THE FILES FOR UPLOAD
     var formData = new FormData();
   
     var file = document.getElementsByName("files")[0].files;
  
     for(var i = 0; i < file.length;i++){
      formData.append('files', file[i]);
     }
  

    // AJAX OBJECT
    var xhr = new XMLHttpRequest();
  
  // URL FOR REQUEST
    xhr.open('POST', '/uploadForm', true);
  
  
  // INSTRUCTIONS ON PROGRESS 
  xhr.upload.onprogress = function(e) {
    if (e.lengthComputable) {
      var percentage = (e.loaded / e.total) * 100;
  
      document.querySelector(".progress").style.width = percentage +"%";
      document.querySelector(".progress").textContent = Math.round(percentage) +"%";
      console.log(percentage + "%");
    }
  };
  
 // ON ERROR
  xhr.onerror = function(e) {
    console.log('Error');
    console.log(e);
  };

// ON FINISHED 
  xhr.onload = function() {
    console.log(this.statusText + " File uploaded");
  };
  

// DATA SEND VIA AJAX
  xhr.send(formData);
  
  });