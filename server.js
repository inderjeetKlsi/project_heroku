var express		=	require('express');
var session		=	require('express-session');
var http 		= 	require("http");
var pg 			= 	require('pg');
var bodyParser 	= 	require('body-parser');
var cors 		= 	require('cors');
var config 		= 	require("./config");
var app			=	express();
var server 		= 	require("http").Server(app);
var __SESSION_KEY__ = 'selfEdu@2017';


// Please Clear Following lines of codes
app.use(cors({origin: 'https://intense-bayou-87341.herokuapp.com'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));

app.set('views', __dirname + '/views');

app.engine('html', require('ejs').renderFile);
// app.use(session({secret: __SESSION_KEY__,saveUninitialized: true,resave: true}));
var pool = new pg.Pool(config.conn);


pg.defaults.ssl = false;

pg.connect(process.env.DATABASE_URL, function(err, client) {
  if (err) throw err;
  console.log('Connected to postgres! Getting schemas...');

});

var user_session;
var data = "";
var htmldata = "";
var Result=[];
var customerDetailAry=[];

var port_number = server.listen(process.env.PORT || 3000);
app.listen(port_number,function(){
	console.log("App Started on PORT",port_number);
});


app.get('/',function(req,res){
	res.render('user_main.html');
});

app.get('/forgotPassword',function(req,res){
	res.render('forgot_password.html');
});

app.get('/login',function(req,res){
	res.render('login.html');
});

app.get('/signup',function(req,res){
	res.render('signup.html');
});


app.post('/signup',function (req, res) {
	var szEmail = req.body.szEmail;
	var szPassword = req.body.szPassword;

	var columns = '"szEmail","szPassword"';
	var selectColumn = '"szEmail"';
	if(szEmail != ''){

		var existingEmail = [];
		var responseAry = [];
		var Result = [];
			pool.connect(function(err, client, done) {
			if(err) {
				return console.error('error fetching client from pool', err);
			}

			// var query = client.query("SELECT count(id) as emailExists FROM users.tbl_user where "+selectColumn+"='"+szEmail+"'");
			// // console.log(query);
			// query.on('row', (row) => {
			// 	var emailExists = JSON.stringify(emailExists);
			// 		Result.push(row);
			// 	});
			// 	console.log(Result);
			// 	console.log(existingEmail);

				// if(existingEmail == true){
				// 	responseAry[0] = "ERROR";
				// 	responseAry[1] = 'This email address is already registered.';
				// }
				// else{
					var inserQuery = "INSERT INTO users.tbl_user("+columns+") values('"
							+ szEmail + "','" 
							+ szPassword +
							"')";
						client.query(inserQuery);
						responseAry[0] = "SUCCESS";
				// }
				res.send(responseAry);
			});
		}
     	
});

app.get('/profile',function(req,res){
	res.render('profile.html');
	res.end();
});