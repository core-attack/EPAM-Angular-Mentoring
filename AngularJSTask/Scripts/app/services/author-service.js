/*
Сервис для авторов
*/
angular.module('app').service('AuthorService', function ($resource) {
    return $resource('/authors');
});