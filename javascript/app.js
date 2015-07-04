var wp = angular.module("webplayer", []);

wp.controller("mainController", ["$scope", "$http", "player", "audioContext", function($scope, $http, player, audioContext){

    $scope.musiclist = null;

    $scope.play = function(url) {
        if(url) {
            $scope.url = url;
        }
        //player.play($scope.url);
        audioContext.load($scope.url);
    };

    $scope.pause = function() {
        //player.pause();
        audioContext.stop();
    };

    $scope.volumeUp = audioContext.volumeUp;
    $scope.volumeDown = audioContext.volumeDown;
    $scope.process = 10;

    $http({method: 'GET', url: 'data/data.json'}).
        success(function(data, status, headers, config) {
            $scope.musiclist = data;
        }).
        error(function(data, status, headers, config) {
            console.log("error...");
        });
}]);
