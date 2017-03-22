angular.module('app')
    .directive('fillBreadcrumbs', function() {
        return function(scope, element, attrs) {
            scope.$watch('course.name', function(name) {
                if (name) {
                    var $bcrumbs = $('#breadcrumbs');
                    if ($bcrumbs.find("li").length == 1) {
                        var $li = $bcrumbs.find("li").first().clone();
                        $li.find("a").removeAttr("href").text(name);
                        $li.appendTo($bcrumbs);
                    } else {
                        $bcrumbs.find("li:last").find("a").text(name);
                    }
                }
            });
        }
    });