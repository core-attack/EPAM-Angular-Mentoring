angular.module('app')
    .controller('CoursesController', function ($scope, $uibModal, CourseService, ModalConfirmationAPI) {

    $scope.searchText = "";
    $scope.removedCourse = null;
    $scope.courses = CourseService.query();

    $scope.onDeleteClick = function (course) {
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: '/Views/Partials/Shared/modal-confirmation.html',
            controller: 'ModalInstanceController',
            size: 'sm'
        });
        modalInstance.result.then(function () {
            $scope.removedCourse = course;
            course.$delete({ id: course.id });
            $scope.searchText = "";
        });
    }

    $scope.setFilter = function () {
        $scope.searchText = $("#inputFilter").val(); //$scope.searchInputText; почему то всегда пустая, хотя ng-model="searchInputText" задано на инпуте 
    }
    
});
