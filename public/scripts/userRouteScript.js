
var app = angular.module('userApp',['ngRoute']); // ngRoute define in angular-route.js file

app.config(['$routeProvider', function($routeProvider){

    $routeProvider
            .when('/forgotPassword', {
                templateUrl:'/forgotPassword',
                controller:'forgotController'
            })
            .when('/login', {
                templateUrl:'/login',
                controller:'loginController'
            })
            .when('/signup', {
                templateUrl:'/signup',
                controller:'signupController'
            })
            .otherwise({
				redirectTo: '/',
                controller:'loginController'
			});

}]);

app.controller('loginController',function($scope,$rootScope)
{
    $rootScope.headerTitle = "Login";
    // $rootScope.loginContent = true;
});

app.controller('forgotController',function($scope,$rootScope)
{
    $rootScope.loginContent = true;
    $rootScope.headerTitle = "Forgot Password";
});
app.controller('signupController',function($scope,$rootScope,$http)
{
    $rootScope.loginContent = true;
    $rootScope.headerTitle = "Signup";
    $rootScope.isValidEmail = "[^@]+@[^@]+\.[a-zA-Z]{2,6}";

    $rootScope.signup = function () {
                $http({
                    method: 'POST',
                    url: "https://intense-bayou-87341.herokuapp.com/signup",
                    data: JSON.stringify($scope.user),
                    headers: { 'Content-Type': 'application/JSON' }
                }).
                success(function (responseAry) {
                    if(responseAry[0] == "SUCCESS"){
                        $window.location.href = "#profile";
                    }
                    else{
                        $rootScope.status = responseAry[1];
                    }
                    
                })
                .error(function (error) {
                    //Showing error message
                    $rootScope.status = 'Unable to add new customer: ' + error;
                });
            }
    
});
