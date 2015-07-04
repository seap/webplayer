wp.factory("player", ["$document", "$http", function($document, $http) {

    var audio = $document[0].createElement("audio");

    console.log("create audio");
    return {
      play : function(url) {
          audio.src = url;
          audio.play();
      },
    pause : function() {
        audio.pause();
    }
    };
}]);

wp.factory("audioContext", [function() {

    var xhr = new XMLHttpRequest();

    var ac = new (window.AudioContext || window.webkitAudioContext);
    var bufferSource = null;
    var gainNode = ac.createGain();
    gainNode.connect(ac.destination);


    console.log("ac create : " + ac);
    var count = 0;
    return {
        load : function(url) {
            var now = ++count;
            bufferSource && bufferSource.stop();
            xhr.abort();
            xhr.open("GET", url);
            xhr.responseType = "arraybuffer";
            xhr.onload = function() {
                console.log("onload");
                if (now != count) return;
                ac.decodeAudioData(xhr.response, function(buf){
                    console.log("decode audio.");
                    if (now != count) return;
                    bufferSource = ac.createBufferSource();
                    bufferSource.buffer = buf;
                    bufferSource.connect(gainNode);
                    gainNode.gain.value = 0.4;
                    bufferSource.start(0);
                }, function(err) {
                    console.log(err);
                })
            }
            xhr.send();
        },

        stop : function() {
            bufferSource && bufferSource.stop();
        },

        volumeUp : function () {
            console.log("volumeUp..");
            if (gainNode.gain.value < 1) {
                gainNode.gain.value += 0.1;
            }
        },
        volumeDown : function () {

            if (gainNode.gain.value >= 0) {
                gainNode.gain.value -= 0.1;
            }
            console.log("volumeDown, value : " + gainNode.gain.value);
        }
    };

}]);