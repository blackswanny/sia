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
        SAFETY_BELT: 'SAFETY_BELT',
        BENCH_SEAT: 'BENCH_SEAT',
        BACK_REST: 'BACK_REST'
    };
    document.addEventListener("DOMContentLoaded", function(event) {
        var recognition = new webkitSpeechRecognition();
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
            Object.keys(window.SIA_COMMANDS).forEach(function (command) {
                if (final_transcript.toUpperCase().indexOf(command) >=0) {
                    window.dispatchEvent(new CustomEvent(command));
                }
            });

        };
        recognition.onerror = function(event) {

        };
        recognition.onend = function() {

        };
        recognition.start();

    });
})(document, window);
