var app = angular.module('app', ['ngRoute', 'ngResource', 'ngMockE2E', 'ui.bootstrap', 'modalConfirmation', 'filters']);
app.config(function($routeProvider) {
    $routeProvider
        .when('/login', {
            templateUrl: '/Views/Partials/Login/login.html',
            controller: 'LoginController'
        })
        .when('/courses', {
            templateUrl: '/Views/Partials/Course/courses.html',
            controller: 'CoursesController',
            authenticate: true
        })
        .when('/courses/new', {
            templateUrl: '/../Views/Partials/Course/course.html',
            controller: 'CourseController',
             authenticate: true
        })
        .when('/courses/:course_id', {
            templateUrl: '/Views/Partials/Course/course.html',
            controller: 'CourseController',
            authenticate: true
        })
        .otherwise({
            redirectTo: '/login'
        });
});
app.config(['$resourceProvider', function ($resourceProvider) {
    $resourceProvider.defaults.stripTrailingSlashes = false;
}]);
app.config(function($provide) {
    $provide.decorator('$httpBackend', function($delegate) {
        var proxy = function(method, url, data, callback, headers) {
            var interceptor = function() {
                var _this = this,
                    _arguments = arguments;
                setTimeout(function() {
                    callback.apply(_this, _arguments);
                }, method === 'DELETE' ? 601 : 0);
            };
            return $delegate.call(this, method, url, data, interceptor, headers);
        };
        for (var key in $delegate) {
            proxy[key] = $delegate[key];
        }
        return proxy;
    });
});




