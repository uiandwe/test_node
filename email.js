//
// smtp server 선언
//
var email   = require("emailjs");
var server  = email.server.connect({
   user:    "uiandwe@gmail.com", 
   password:"224?google.com", 
   host:    "smtp.gmail.com",
   tls:     true
   
});

//
// HTML 내용과 파일첨부를 할 수 있다.
//
var message = {
   text:    "i hope this works", 
   from:    "uiandwe@gmail.com", 
   to:      "uiandwe@gmail.com",
   cc:      "uiandwe@gmail.com",
   subject: "testing emailjs",
   attachment: 
   [
      {data:"<html>i <i>hope</i> this works!</html>", alternative:true}
      /*,
      {path:"path/to/file.zip", type:"application/zip", name:"renamed.zip"}
      */
   ]
};

// send the message and get a callback with an error or details of the message that was sent
server.send(message, function(err, message) { console.log(err || message); });