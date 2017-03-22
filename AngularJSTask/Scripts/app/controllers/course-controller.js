angular.module('app')
    .controller('CourseController', function ($scope, $routeParams, $location, AuthorService, CourseService, $uibModal) {
    $scope.course = CourseService.get({ id: $routeParams.course_id });//хрому не нравится что-то в параметрах
    $scope.authors = AuthorService.query();

    $scope.isSaveClicked = false;

    $scope.dateOptions = {
        dateFormat: 'dd.mm.yy'
    }

    var fillAuthors = function(){
        $scope.course.authors = [];
        $.each($("#multiselect_to option"), function (i, val) {
            $scope.course.authors.push({
                id: $(val).val(),
                name: $(val).text()
            });
        });
    };

    $scope.save = function () {
        $scope.isSaveClicked = true;
        fillAuthors();
        if ($scope.courseForm.$valid && $scope.validateAuthors()) {//хз
            if ($routeParams.course_id !== undefined) {
                $scope.course.$update();
            } else {
                $scope.course.$save();
            }
            $location.path('/courses');
        }
        else {
            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: '/Views/Partials/Shared/modal-error.html',
                controller: 'ModalInstanceController',
                size: 'sm'
            });
            modalInstance.result.then(function () { });
        }
        
    };
    $scope.cancel = function() {
        $location.path('/courses');
    };

    $scope.validateName = function () {
        return $scope.courseForm.name.$valid && $scope.isSaveClicked;
    }

    $scope.validateDescription = function () {
        return $scope.courseForm.description.$valid && $scope.isSaveClicked;
    }

    $scope.validateDate = function () {
        return $scope.courseForm.date.$valid && $scope.isSaveClicked;
    }

    $scope.validateDuration = function () {
        return $scope.courseForm.duration.$valid && $scope.isSaveClicked;
    }

    $scope.validateAuthors = function () {
        return $scope.validateAuthors() && $scope.isSaveClicked;
    }

    $scope.validateAuthors = function () {
        var result = false;
        if ($scope.course.authors) {
            result = $scope.course.authors.length > 0;
        }
        return result;
    }
});