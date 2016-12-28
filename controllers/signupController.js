(function(signupController) {
signupController.init = function (app) {

        app.get('/signup',function(req,res){
            res.render('signup.html');
        });

    };
})(module.exports);