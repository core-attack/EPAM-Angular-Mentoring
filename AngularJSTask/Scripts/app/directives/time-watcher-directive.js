angular.module('app')
    .directive('timeWatcher', function () {
        return function (scope, element, attrs) {
            scope.$watch('course.duration', function (date) {
                scope.course.durationMinutes = date.getMinutes()
                    + 60 * date.getHours()
                    + 1440 * date.getDay();
            });
        };
    });