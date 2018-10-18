var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
// var session = require("express-session");
var path = require("path");
var http = require("http");

var channel = require("./routers/channel");
var content = require("./routers/content");
var visual = require("./routers/visual");
var login = require("./routers/login");
var upload = require("./routers/upload");
var internationImg = require("./routers/internation-img");

var isReadableCgi=require('./modules/cgi-type')

var config=require('./config')

var mongodb = require("./mongoose");

var status=require('./modules/status')

var app = express();
var server = http.createServer(app); //use app application to create server
server.listen(config.port, config.ip, function(err) {
	if (err) {
		console.log("server listening error");
		return;
	}
	console.log(`server is listenning on ${config.ip}:${config.port}`);
});

mongodb.connectToMongoDB();

//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    // res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","POST,GET");
    res.header("X-Powered-By",' 3.2.1')
    // res.header('Content-Encoding','gzip')   如何开启gzip
    res.header('Access-Control-Allow-Credentials',true)
    next();
})

//app.set("views",__dirname+"/views");
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "ejs");
// app.engine("ejs", require("ejs-mate"));
// app.locals._layoutFile = "layout.ejs"; //所有的views界面下的ejs都使用这个布局文件

app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());
app.use(cookieParser());

// app.use(session({
// 	secret: "miaomiao",
// 	resave: false,
// 	saveUninitialized: false,
// 	cookie: {
// 		httpOnly: true
// 	}
// }));

app.use(express.static(path.join(__dirname, "public")));

app.use(function(req,res,next){
	console.log("COOKIES-----QUERY---BODY",req.cookies,req.query,req.body)
	// req.body=JSON.parse(req.body.data)
	// console.log("222222222",req.body)

	next()
	// try{
	// 	req.body=JSON.parse(req.body.data)
	// }catch(err){
	// 	console.log("ERR",err)
	// }finally{
	// 	next()
	// }
	
})

app.use("/", login);

app.use(function(req,res,next){
	var {vuid}=req.cookies
	if(vuid || isReadableCgi(req.url)){
		next()
	}else{
		res.json(status.ERROR_NOT_LOGIN)
	}
})


app.use("/cgi", channel);
app.use("/cgi", content);
app.use("/cgi", visual);
app.use("/cgi", upload);
app.use("/cgi", internationImg);