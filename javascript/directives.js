
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

wp.directive("visualizer", ["$document", function($document) {
    return {
        restrict : "E",
        templateUrl : "template/visualizer.html",
        link : function(scope, element, attr) {

            var canvas = element.find("canvas")[0];
            var panel = element.find("div")[0];

            var context = canvas.getContext("2d");
            var line = context.createLinearGradient(0, 0 ,0, canvas.height);
            line.addColorStop(0, "red");
            //line.addColorStop(0.5, "yellow");
            line.addColorStop(1, "#00b3ee");
            context.fillStyle = line;
            console.log("canvas height : " + canvas.height);

            var width = canvas.width;
            var height = canvas.height;
            console.log("width : " + width + " , height : " + height);

            function draw() {
                context.clearRect(0, 0 , width, height);
                var arr = scope.getBufferArray();
                var w = width / 128;
                for (var i = 0; i < 128; i++) {
                    var h = arr[i] / 256 * height;
                    context.fillRect(w * i, height - h, w * 0.8, h);
                }
            }

            function request() {
                draw();
                //console.log("request");
                requestAnimationFrame(request);
            }
            requestAnimationFrame(request);
        }
    };
}]);
