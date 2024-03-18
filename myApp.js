let express = require('express');
let app = express();
require('dotenv').config()


//request to add with a middlewareFunction the css for that specific file
app.use('/public', express.static( __dirname + '/public'));
//11 use body-parser to parse post request
app.use(bodyParser.urlencoded({extended: false}))

//implement a Root-Level Request Logger Middleware
app.use((req,res,next)=>{
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next()
    })

//request get/ there is a path "/ ", and an handler taht in this case is a function 
app.get("/",function(req,res){
    res.send('Hello Express');
});
console.log('Hello World');


//dirname is a Node's globalvariable. It is an environment variable that tells you the absolute path of the directory containing the currently executing file.
//request to get the index.html file 
app.get('/',function(req,res){
   res.sendFile(__dirname + '/views/index.html');
});



//create an API endpoint
app.get("/json",function(req, res){
res.json({"message" : "Hello json"});

})

// use env variable, .env file, .env package
app.get("/json", function(req,res){
    if(process.env["MESSAGE_STYLE"] == "uppercase"){ 
        res.json({"message": "HELLO JSON"});
    }
 else
    { res.json({"message": "Hello json"});  
 
}})
//8 create a time server
app.get("/now", function (req,res,next){
    req.time =new Date().toString();
    next();
},
function (req,res){
    res.json({"time": req.time})
})


//9 Get Route Parameter Input from the Client
app.get("/:word/echo", function (req, res)  {
    const { word } = req.params;
    res.json({
      echo: word
    });
  });
//10//using query param to get input from client
app.get("/name", function(req,res){
    res.json ({name: req.query.first + " " + req.query.last})
    ///name?first=firstname&last=lastname
})
//1 Use body-parser to Parse POST Requests
























 module.exports = app;
