var express		=	require('express');
var session		=	require('express-session');
var http 		= 	require("http");
var pg 			= 	require('pg');
var bodyParser 	= 	require('body-parser');
var cors 		= 	require('cors');
var config 		= 	require("./config");
var app			=	express();

var __SESSION_KEY__ = 'selfEdu@2017';


// Please Clear Following lines of codes
app.use(cors({origin: 'http://localhost'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));

app.set('views', __dirname + '/views');

app.engine('html', require('ejs').renderFile);
app.use(session({secret: __SESSION_KEY__,saveUninitialized: true,resave: true}));
var pool = new pg.Pool(config.conn);
console.log('pg configured... ');

var user_session;
var data = "";
var htmldata = "";
var Result=[];
var customerDetailAry=[];

app.listen(3000,function(){
	console.log("App Started on PORT 3000");
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
			
			// console.log(query);
			// query.on('row', (row) => {
			// 	var emailExists = JSON.stringify(emailExists);
			// 		Result.push(row);
			// 	});
			// 	console.log(Result);
				// console.log(existingEmail);

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