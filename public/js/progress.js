

document.querySelector("form").addEventListener('submit', function(e) {
   e.preventDefault();
});

document.querySelector("input[type=submit]").addEventListener('click', function () {


  // FORMDATA CONTAINING ALL OF THE FILES FOR UPLOAD
  var formData = new FormData();

  var file = document.querySelector("input[type=file]").files;

 
  if(file.length === 0) {

     alert("You didn't choose a file");

  } else {


    for (var i = 0; i < file.length; i++) {
      formData.append('files', file[i]);
    }


    // AJAX OBJECT
    var xhr = new XMLHttpRequest();

    // URL FOR REQUEST
    xhr.open('POST', '/uploadForm', true);


    // INSTRUCTIONS ON PROGRESS 
    xhr.upload.onprogress = function (e) {
      if (e.lengthComputable) {
        var percentage = (e.loaded / e.total) * 100;

        document.querySelector(".progress-bar").style.width = percentage + "%";
        document.querySelector(".progress-bar").textContent = Math.round(percentage) + "%";
        console.log(percentage + "%");
      }
    };

    // ON ERROR
    xhr.onerror = function (e) {
      console.log('Error');
      console.log(e);
    };

    // ON FINISHED 
    xhr.onload = function () {
      console.log(this.statusText + " File uploaded");

      setTimeout(function () {
        alert("File succesfully uploaded!");
        document.querySelector(".progress-bar").style.width = "0%";
        document.querySelector(".progress-bar").textContent = "";
        document.querySelector("input[type=file]").value = "";
      }, 3000);
    };


    // DATA SEND VIA AJAX
    xhr.send(formData);

  }

});

