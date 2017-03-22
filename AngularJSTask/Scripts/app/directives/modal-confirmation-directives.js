var ModalConfirmation = angular.module('modalConfirmation', []);
ModalConfirmation.factory('ModalConfirmationAPI', function () {
    return {
        status: null,
        message: null,
        success: function (msg) {
            this.status = 'success';
            this.message = msg;
        },
        error: function (msg) {
            this.status = 'error';
            this.message = msg;
        },
        clear: function () {
            this.status = null;
            this.message = null;
        }
    }
});
//ModalConfirmation.directive('modal_confirmation', function () {
//    return {
//        restrict: 'E',
//        scope: {},
//        replace: true,
//        controller: function ($scope, ModalConfirmationAPI) {
//            $scope.show = false;
//            $scope.api = ModalConfirmationAPI;

//            $scope.$watch('api.status', toggledisplay)
//            $scope.$watch('api.message', toggledisplay)

//            $scope.hide = function () {
//                $scope.show = false;
//                $scope.api.clear();
//            };

//            function toggledisplay() {
//                $scope.show = !!($scope.api.status && $scope.api.message);
//            }
//        },
//        template: '<div class="alert alert-{{api.status}}" ng-show="show">' +
//                  '  <button type="button" class="close" ng-click="hide()">&times;</button>' +
//                  '  {{api.message}}' +
//                  '</div>'
//    }
//});


