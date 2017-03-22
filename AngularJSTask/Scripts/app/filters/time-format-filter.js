angular.module('app')
    .filter('timeFormat', function ($filter) {
        return function (input) {
            if (input == null) { return ""; }
            //console.log(input);
            var date = new Date(input);
            var minutes = date.getMinutes()
                + 60 * date.getHours()
                + 1440 * date.getDay();

            var _date = {};
            if (minutes < 1440) { //понятно, что при достаточно большом значении "продолжительности" будет баг подсчета (отобразится правильное количество часов и дней, но не отобразятся месяцы), но курс длинною в месяцы не оговорен в задании
                _date = $filter('date')(date, 'HH час. mm мин.');
            } else {
                _date = $filter('date')(date, 'dd дней HH час. mm мин.');
            }
            return _date;

        };
    });