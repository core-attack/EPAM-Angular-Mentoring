/*
Эмуляция бэк-энда
*/
app.run(function ($httpBackend) {

    var users = [{ name: 'anton', password: 'ololo' }, { name: 'user', password: 'qwerty' }];
    var lastId = 105;
    var authors = [
        { id: 10232, name: 'Иванов' },
        { id: 10233, name: 'Петров' },
        { id: 10234, name: 'Сидоров' },
        { id: 10235, name: 'Абрамов' },
        { id: 10236, name: 'Сергеев' },
        { id: 10237, name: 'Николаев' }];
    var courses = [
        {
            id: 101,
            name: 'Курс №1',
            description: 'Description for course 1. In the next sections we will explore the API for when and expect. The parameters that we can pass are the same for both, and as we discussed in the last example the key difference between the two methods is how the configurations are matched when we call flush. Therefore we will use when in the following code examples, but it would be the same for expect.',
            date: new Date(2016, 02, 11),
            duration: new Date(0, 0, 0, 3, 23, 0),//"1899-12-30T20:23:00.000Z"
            authors: [authors[0], authors[2]]
        },
        {
            id: 102,
            name: 'Курс №2',
            description: 'Description for course 2. In the next sections we will explore the API for when and expect. The parameters that we can pass are the same for both, and as we discussed in the last example the key difference between the two methods is how the configurations are matched when we call flush. Therefore we will use when in the following code examples, but it would be the same for expect.',
            date: new Date(2016, 01, 18),
            duration: new Date(0, 0, 0, 1, 00, 0),
            authors: [authors[1]]
        },
        {
            id: 103,
            name: 'Курс №3',
            description: 'Description for course 3. In the next sections we will explore the API for when and expect. The parameters that we can pass are the same for both, and as we discussed in the last example the key difference between the two methods is how the configurations are matched when we call flush. Therefore we will use when in the following code examples, but it would be the same for expect.',
            date: new Date(2016, 01, 02),
            duration: new Date(0, 0, 0, 2, 8, 0),
            authors: [authors[3], authors[6]]
        },
        {
            id: 104,
            name: 'Курс №4',
            description: 'Description for course 4. In the next sections we will explore the API for when and expect. The parameters that we can pass are the same for both, and as we discussed in the last example the key difference between the two methods is how the configurations are matched when we call flush. Therefore we will use when in the following code examples, but it would be the same for expect.',
            date: new Date(2016, 01, 23),
            duration: new Date(0, 0, 0, 1, 57, 0),
            authors: [authors[5]]
        },
        {
            id: 105,
            name: 'Курс №5',
            description: 'Description for course 5. In the next sections we will explore the API for when and expect. The parameters that we can pass are the same for both, and as we discussed in the last example the key difference between the two methods is how the configurations are matched when we call flush. Therefore we will use when in the following code examples, but it would be the same for expect.',
            date: new Date(2016, 01, 10),
            duration: new Date(0, 0, 0, 5, 54, 0),
            authors: [authors[2], authors[3]]
        }
    ];

    var getId = function (url) {
        var regexp = new RegExp('\\/courses\\/([0-9]+)');
        return parseInt(url.match(regexp)[1]);
    }

    var getCourse = function (id) {
        $.each(courses, function (i, val) {
            if (val.id === id) {
                return val;
            }
        });
    }

    var getCourseIndex = function (id) {
        var index = -1;
        $.each(courses, function (i, val) {
            if (val.id === id) {
                index = i;
            }
        });
        return index;
    }

    // pass through template requests
    //ngMockE2E introduces $httpBackend so yes, all HTTP requests are mocked. To allow your templates to be loaded, add this to your module
    //http://stackoverflow.com/questions/30906846/ngmocke2e-is-causing-every-request-mock-the-moment-added-to-dependency
    $httpBackend.whenGET(/\.html$/).passThrough();
    //$httpBackend.whenGET(/\/courses.*$/).passThrough();
    //$httpBackend.whenGET(/\/get_courses.*$/).passThrough();

    $httpBackend.whenGET(/\/login.*/).respond(function (method, url, data) {
        var params = url.split('?')[1].split('&');
        var login = "";
        var password = "";
        var exist = false;
        if (params.length > 1) {
            $.each(params, function (i, value) {
                if (value.indexOf('login') != -1) {
                    login = value.split('=')[1];
                }
                else if (value.indexOf('password') != -1) {
                    password = value.split('=')[1];
                }
            });

            $.each(users, function (i, user) {
                if (user.name === login && user.password === password) {
                    exist = true;
                }
            });
        }
        if (exist) {
            return [200, { login: login }, {}];
        } else {
            return [404, {}, {}];
        }
    });
    $httpBackend.whenGET('/courses/').respond(courses);
    $httpBackend.whenGET('/authors').respond(authors);
    $httpBackend.whenGET(/\/courses\/([0-9]+)/).respond(function (method, url, data) {
        var id = getId(url);
        var result = {};
        $.each(courses, function (i, val) {
            if (val.id === id) {
                result = val;
            }
        });
        return [200, result, {}];
    });
    $httpBackend.whenPOST(/\/courses\//).respond(function (method, url, data) {
        var obj = angular.fromJson(data);
        obj.id = ++lastId;
        courses.push(obj);
        return [200, {}, {}];
    });
    $httpBackend.when('PUT', '/courses/').respond(function (method, url, data) {
        var obj = angular.fromJson(data);
        var courseIndex = getCourseIndex(obj.id);
        courses[courseIndex] = obj;
        return [200, {}, {}];
    });
    $httpBackend.when('DELETE', /\/courses\/([0-9]+)/).respond(function (method, url, data) {
        var id = getId(url);
        var courseIndex = getCourseIndex(id);
        courses.splice(courseIndex, 1);
        return [200, {}, {}];
    });

});