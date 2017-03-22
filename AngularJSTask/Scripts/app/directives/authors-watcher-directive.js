angular.module('app')
    .directive('authorsWatcher', function () {
        return function (scope, element, attrs) {
            scope.$watch('course.authors', function (authors) {
                angular.forEach(authors, function (val) {
                    $("#multiselect option[value=" + val.id + "]").remove(); // при ошибке валидации иногда почему-то добавляется в multiselect_to дублированная первая запись автора, но хз, плавающий баг какой-то
                });
            });
        };
    });
