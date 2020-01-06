const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const app = express();

// MULTER CONFIGURATION

var uploadStorageSettings = multer.diskStorage({
     destination: (req, file, callBack) => {
       callBack(null, 'uploadFolder')
     },
     filename: (req, file, callBack) => {
       callBack(null, file.originalname);
     }
});

var multerStorage = multer({storage: uploadStorageSettings});


// BASIC CONFIGURATION

app.use(express.static(__dirname+"/public"));

app.use(bodyParser.urlencoded({extended: true}));

app.listen(3000, () => {
    console.log(">> Server running on 3000 <<");
});


// ROUTES GET AND POST

app.get('/', (req, res) => {
   res.sendFile(__dirname+"/views/index.html");
});

app.get('/uploadForm', (req , res) => {
    res.sendFile(__dirname+"/views/error.html");
});


app.post('/uploadForm', multerStorage.array("files", 12), (req, res, next) => {
     
      const uploadedFiles = req.files;

    

      if(!uploadedFiles){
          const error = new Error('No files have been selected!');
          error.httpStatusCode = 400;
          return next(error);
      }
 
    res.send(uploadedFiles);

    

});

