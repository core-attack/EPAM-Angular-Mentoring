angular.module('app')
    .directive('timeMinutes', function ($filter) {
        return function(scope, element, attrs) {
                scope.$watch('course.durationMinutes', function(duration) {
                    console.log(scope.course.duration);
                    console.log(scope.course);

                    var hours = duration - duration % 60;
                    var days = hours - hours % 24;
                    var mins = duration - (hours * 60 + days * 1440);
                    var date = new Date(0, 0, days, hours, mins, 0);
                    scope.course.duration = date;
                    $(element).next().text($filter('timeFormat')(date));

                });
            }
    });