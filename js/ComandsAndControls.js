(function (document, window, undefined) {
    window.SIA_COMMANDS = {
        FORWARD: 'FORWARD',
        BACK: 'BACK',
        LEFT: 'LEFT',
        RIGHT: 'RIGHT',
        DOWN: 'DOWN',
        UP: 'UP',
        ARMREST: 'ARMREST',
        CUSHION: 'CUSHION',
        SUSPENSION: 'SUSPENSION',
        SAFETY_BELT: 'BELT',
        BENCH_SEAT: 'BENCH',
        BACK_REST: 'REST'
    };
    var recognitionApi;

    function startVoiceRecognition(interval) {
        var recognition = new webkitSpeechRecognition();
        recognition.lang = 'en-US';
        recognition.maxAlternatives = 5;
        recognition.continuous = true;
        recognition.interimResults = true;

        recognition.onstart = function() {

        };
        recognition.onresult = function(event) {
            var interim_transcript = '', final_transcript = '';

            for (var i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    final_transcript += event.results[i][0].transcript;
                } else {
                    interim_transcript += event.results[i][0].transcript;
                }
            }
            console.log('RECOGNIZED:' + final_transcript + ' ' + interim_transcript);
            Object.keys(window.SIA_COMMANDS).forEach(function (command) {
                if (interim_transcript.toUpperCase().indexOf(command) >=0
                    || final_transcript.toUpperCase().indexOf(command) >=0) {
                    console.log('COMMAND:' + command);
                    window.dispatchEvent(new CustomEvent(command));
                }
            });

        };
        recognition.onnomatch = function(event) {
        };
        recognition.onspeechend = function(event) {
        };
        recognition.onsoundend = function(event) {
        };
        recognition.onaudioend = function(event) {
        };
        recognition.onerror = function(event) {
            if (interval) {
                clearInterval(interval);
            }
            initializeVoiceRecognition();
        };
        recognition.onend = function() {
        };
        recognition.start();
        return recognition;
    }

    function initializeVoiceRecognition() {
        recognitionApi = startVoiceRecognition();
        var interval = setInterval(function () {
            recognitionApi.abort();
            recognitionApi = startVoiceRecognition(interval);
        }, 2000);
    }

    function startDeviceMotion() {
        window.addEventListener('devicemotion', function(event) {
            console.log(event.acceleration);
            console.log(event.rotationRate);
        });
    }

    document.addEventListener("DOMContentLoaded", function(event) {
        initializeVoiceRecognition();
        startDeviceMotion();
    });
})(document, window);
