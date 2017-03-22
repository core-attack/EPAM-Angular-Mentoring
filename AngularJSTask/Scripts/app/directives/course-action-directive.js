angular.module('app')
    .directive('courseAction', function() {
        return function(scope, element, attrs) {
            attrs.$observe('courseAction', function(removedCourse) {
                if (removedCourse) {
                    var removedObj = angular.fromJson(removedCourse);
                    $("#course-" + removedObj.id).slideUp(600);
                    $("#course-" + removedObj.id).remove();
                }
            });
        };
    });