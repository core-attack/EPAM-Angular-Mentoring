angular.module('filters', []).filter('courseFilter', ['$filter', function ($filter) {
    return function (courses, searchString) {
        if (!angular.isUndefined(courses) && !angular.isUndefined(searchString)) {
            var tempCourses = [];
            angular.forEach(courses, function (course) {
                var formattedDate = $filter('date')(course.date, 'dd.MM.yyyy');
                if (course.name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1 || formattedDate.indexOf(searchString) !== -1) {
                    tempCourses.push(course);
                }
            });
            return tempCourses;
        } else {
            return courses;
        }
    };
}]);