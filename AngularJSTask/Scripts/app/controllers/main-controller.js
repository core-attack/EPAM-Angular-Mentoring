angular.module('app')
    .controller('MainController', function ($scope, $location, AuthService) {

        $scope.setLogin = function() {
            $scope.login = AuthService.getLogin();
            return true;
        }

        $scope.isCoursePage = function() {
            return !!/\/courses\/([0-9]+)/.exec($location.$$path);
        }

        $scope.isLoginPage = function () {
            return !!/\/login/.exec($location.$$path);
        }

        $scope.isLoginLinkVisible = function () {
            return !$scope.isLoginPage();
        }

        $scope.showBreadcrumbs = function () {
            return $scope.isCoursePage();
        }

        $scope.logOut = function () {
            AuthService.logOut();
        }
    });