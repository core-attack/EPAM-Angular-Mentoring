/*
Сервис для курсов
*/
angular.module('app').service('CourseService', function($resource) {
    return $resource('/courses/:id', 
        {  },
        {
            'get': { method: 'GET' },//'get': { method: 'GET', isArray: true }, ошибка пропадает, но возникает на странице /courses/101
            'save': { method: 'POST' },
            'update': { method: 'PUT' },
            'query': { method: 'GET', isArray: true },
            'remove': { method: 'DELETE' },
            'delete': { method: 'DELETE', params: { id: '@_id' } }
        }
    );
});
