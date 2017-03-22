angular.module('app')
    .directive('init', function() {
        return {
            link: function() {
                $('#multiselect').multiselect();
                $("#inputDate").on("keypress", function(event) {
                    var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;

                    var success = false;
                    var $this = $(this);

                    if (is_chrome || event.which === 8 || event.keyCode === 46 || (event.keyCode >= 37 && event.keyCode <= 40)) {
                        success = true;
                    }

                    if ($this.val().length < 10) {

                        if (event.which >= 48 && event.which <= 57) {
                            success = true;
                            if ($this.val().length === 2 || $this.val().length === 5) {
                                $this.val($this.val() + ".");
                            }
                        }
                    }

                    return success;
                });
            }
        }
    });