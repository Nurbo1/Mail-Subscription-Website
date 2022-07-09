const bodyParser = require('body-parser');
const express = require('express');
const request = require('request');
const https = require('https');
const client = require("@mailchimp/mailchimp_marketing");

client.setConfig({apiKey: "84161db07fe8f48a735c655229d72f35-us18",  server: "us18"});

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/failure", function(req,res){
   res.redirect("/");
});

app.post("/", function(req,res){
  const name = req.body.fname;
  const lname = req.body.lname;
  const email = req.body.email;


  const subscribingUser = {firstName: name, lastName: lname, email: email};


  const run = async () => {
       const response = await client.lists.addListMember("a53908dbd9", {
         email_address: subscribingUser.email,
         status: "subscribed",
         merge_fields: {
             FNAME: subscribingUser.firstName,
             LNAME: subscribingUser.lastName
         }
       });
     };

//       const  options = {
//        method: "POST",
//        auth: "nurbo1:84161db07fe8f48a735c655229d72f35-us18"
//      }
//
//
// const url = "";
// const request  = https.request(url, options, function(response){
//   console.log(response.statusCode);
  if(res.statusCode === 200){
    res.sendFile(__dirname + "/success.html");
  }else{
    res.sendFile(__dirname + "/failure.html");
  }
// });

run();

});



app.listen("3000", function() {
  console.log("Server is running  on port:3000 "  );
});


//Api id:  84161db07fe8f48a735c655229d72f35-us18

//Audience id:   a53908dbd9
