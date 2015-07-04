
wp.directive("playlist",function() {
    var playlist = {

    };
    return {
        restrict : "E",
        templateUrl : "template/playlist.html",

        controller : function($scope) {

            this.setSourceList = function(list) {
                console.log("...");
            };
        },

        link : function(scope, element, attr) {
            console.log("playlist link.");
            console.log("attr onplay " + attr.onplay);

            console.log(element.find("tr"));
            element.find("tr").bind("click", function(e) {
                console.log("...select...");
                console.log(e.target.url);
            });


        }
    };
});

wp.directive("control", function() {
    return {

        restrict : "E",
        templateUrl : "template/controlbar.html",
        link : function(scope, element, attr) {
            element.find("")
        }
    };
});