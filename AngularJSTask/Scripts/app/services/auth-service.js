angular.module('app').factory('AuthService', function ($http, $window, $location) {
    var authService = {};
    var key = "user";
 
    authService.login = function (credentials) {
        return $http.get('/#/login', {
            params: { login: credentials.login, password: credentials.password }
        })
        .success(function (data) {
            $("#errorMessage").hide();
            $window.localStorage[key] = data.login;
            $location.path('/courses');
        })
        .error(function () {
            $("#errorMessage").show();
            console.log("login error");
        });

        //Session.create(data.login); // не это, потому что всякий раз добавляется вот такая фигня: http://localhost:63547/?login=user&password=password#/login
    };
 
    authService.isAuthenticated = function () {
        return !!$window.localStorage[key];
    };
 
    authService.isAuthorized = function () {
        return authService.isAuthenticated();
    };

    authService.getLogin = function () {
        if (!authService.isAuthenticated())
        {
            $location.path('/login');
        }
        return $window.localStorage[key];
    };
 
    authService.logOut = function() {
        localStorage.removeItem(key);
        $location.path('/login');
    }

    return authService;
})