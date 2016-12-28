var express		=	require('express');
var session		=	require('express-session');
var bodyParser  = 	require('body-parser');
var http 		= 	require("http");
var pg 			= 	require('pg');
var bodyParser 	= 	require('body-parser');
var cors 		= 	require('cors');
var config 		= 	require("./config");
var app			=	express();


// Please Clear Following lines of codes
app.use(cors({origin: 'http://localhost'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.use(session({secret: 'adakjfhksjfhkjsk',saveUninitialized: true,resave: true}));
var pool = new pg.Pool(config.conn);
console.log('pg configured... ');
// Clear Above Lines

var sess;
var data = "";
var htmldata = "";
var Result=[];
var customerDetailAry=[];

pool.connect(function(err, client, done) {
    console.log('connecting to db'+ client);
   
  if(err) {
    return console.error('error fetching client from pool', err);
  }
  var query = client.query("SELECT * FROM customer.tbl_customer");
  query.on('row', (row) => {
      Result.push(row);
    });
});

pool.on('error', function (err, client) {
 
  console.error('idle client error', err.message, err.stack)
})


app.listen(3000,function(){
	console.log("App Started on PORT 3000");
});

app.get('/',function(req,res){
	sess = req.session;
	if(sess.email)
	{
		res.redirect('/home');
	}
	else{
	res.render('login.html');
	}
});

app.post('/login',function(req,res){
	sess=req.session;	
	sess.email=req.body.email;
	sess.pwd = req.body.pass;
	res.end('done');
	
});
app.get('/login',function(req,res){
	res.render('login.html');
	res.end();
	
});

app.get('/home',function(req,res){
	sess=req.session;
	if(sess.email)	
	{
		res.render('home.html');
	}
	else
	{
		res.redirect('/');
	}

});
app.get('/dashboard',function(req,res){
	sess=req.session;
	if(sess.email)	
		res.render('home.html');
	else
		res.redirect('/');
});
app.get('/addCustomer',function(req,res){
	sess=req.session;
	if(sess.email){	
		console.log(sess);
		
		if(sess.idCustomer>0){
			pool.connect(function(err, client, done) {
				console.log('connecting to db'+ client);
			
			if(err) {
				return console.error('error fetching client from pool', err);
			}
			var query = client.query("SELECT * FROM customer.tbl_customer where id="+ sess.idCustomer );
			query.on('row', (row) => {
				customerDetailAry.push(row);
				});
			});
		}

		res.render('addCustomer.html');
	}
	else
		res.redirect('/');
		
});
app.get('/customerList',function(req,res){
	sess=req.session;
	if(sess.email)	
		res.render('customerList.html');
	else
		res.redirect('/');
		
});

app.get("/customerListing", function (req, res) {
     res.header('Content-Type', 'text/json');
     var data = JSON.stringify(Result)
     res.send(data);
});

app.get('/logout',function(req,res){
	
	req.session.destroy(function(err){
		if(err){
			console.log(err);
		}
		else
		{
			console.log('destroyed');
			res.render('login.html');
		}
	});

});


app.post("/addCustomerDetails", function (req, res) {
    console.log("Add Customer ");
    console.log(req.body.szEmail);
    console.log(req.body.szFirstName);
    console.log(req.body.szLastName);
	console.log(req.body.szGender);
    console.log(req.body.szCountry);
	console.log(req.body.szDescription);
	
	var szFirstName = req.body.szFirstName;
	var szLastName = req.body.szLastName;
	var szCountry = req.body.szCountry;
	var szDescription = req.body.szDescription;
	var szGender = req.body.szGender;
	var szEmail = req.body.szEmail;
   var columns = '"szFirstName","szLastName","szCountry","szDescription","szGender","szEmail"';
    pool.connect(function(err, client, done) {
    var inserQuery = "INSERT INTO customer.tbl_customer("+columns+") values('"
					+ szFirstName + "','" 
					+ szLastName + "','" 
					+ szCountry + "','" 
					+ szDescription + "','" 
					+ szGender + "','" 
					+ szEmail +
					"')";
    client.query(inserQuery);
	console.log(inserQuery);

     Result = [];
     var query = client.query("SELECT * FROM customer.tbl_customer");
     query.on('row', (row) => {
       Result.push(row);
     });
    });  
     res.send('Inserted');
});

app.post("/editCustomer", function (req, res) {
	console.log("Customer id : - ",req.body.idCustomer);
	var idCustomer = req.body.idCustomer;
	sess = req.session;
	if(idCustomer>0){
		sess.idCustomer=idCustomer;
		res.end('SUCCESS');
	}
	else{
		res.end('Error : Invalid Customer Id.');
	}
});
