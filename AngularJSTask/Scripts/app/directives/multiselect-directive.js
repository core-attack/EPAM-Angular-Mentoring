angular.module('app')
    .directive('multiselect', function () {
        return {
            compile: function compile(temaplateElement, templateAttrs) {
                return {
                    pre: function (scope, element, attrs) {
                        console.log("pre");
                    },
                    post: function (scope, element, attrs) {
                        console.log("post");
                        //навешивание обработчиков событий, DOM трансформации
                    }
                }
            },
            link: function (scope, element, attrs) {
                console.log("link");
            },
            priority: 0,
            terminal: true,//если true, то приоритет на котором объявлена эта директива будет последним приоритетом исполнения. Т.е. будут выполнены только директивы приоритетом выше и с таким же. С таким же приоритетом будут выполнены все директивы, т.к. в рамках одного приоритета порядок исполнения директив не определен
            templateUrl: '/Views/Partials/Multiselect/multiselect-contol.html',
            replace: false,
            transclude: false,
            restrict: 'E',//В общем случае варианты применения кодируются как 'EACM'. Можно создать директиву, которая может использоваться как элемент 'E', атрибут 'A', класс 'C', комментарий 'M'
            scope: true,//scope будет наследоваться. Поля, заданные в родительском scope будут отображаться и в scope директивы, но при этом все изменения будут локальны
            controller: function ($scope, $element, $attrs, $transclude) {
                var $from = $("#multiselect"),
                    $to = $("#multiselect_to");

                $(document).on("click", "#multiselect_rightAll", function () {
                    $to.append($to.find("option").add($from.find("option")));
                    $from.empty();
                });

                $(document).on("click", "#multiselect_rightSelected", function() {
                    $to.append($from.find("option:selected"));
                });

                $(document).on("click", "#multiselect_leftSelected", function() {
                    $from.append($to.find("option:selected"));
                });

                $(document).on("click", "#multiselect_leftAll", function() {
                    $from.append($to.find("option").add($from.find("option")));
                    $to.empty();
                });

            }
        }
    });