(function(controllers) {

var loginController = require("./loginController");
var signupController = require("./signupController");
controllers.init = function(app) {
	loginController.init(app);
	signupController.init(app);
};

})(module.exports);
