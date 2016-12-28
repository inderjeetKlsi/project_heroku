(function(loginController) {
loginController.init = function (app) {
    
    app.get('/login',function(req,res){
        res.render('login.html');
    });

};
})(module.exports);