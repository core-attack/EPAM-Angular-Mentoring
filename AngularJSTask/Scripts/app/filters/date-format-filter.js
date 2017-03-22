angular.module('app')
    .filter('dateFormat', function ($filter) {
        return function (input) {
            if (input == null) { return ""; }

            var _date = $filter('date')(new Date(input), 'dd.MM.yyyy');

            return _date;

        };
    });