angular
    .module('app')
    .controller('LoginController', function ($scope, $http, $location, AuthService) {
    $scope.auth = { message: 'Вы не авторизованы' };
    $scope.user = { login: 'anton', password: 'ololo' }

    $("#errorMessage").hide();

    $scope.submit = function () {
        AuthService.login($scope.user);
    };

    $scope.showLoginErrorMessage = function () {
        return !$scope.loginForm.login.$valid;
    };

    $scope.showPasswordErrorMessage = function() {
        return !$scope.loginForm.password.$valid;
    };

    $scope.isLoginLinkVisible = function() {
        return AuthService.isAuthorized();
    };
});

