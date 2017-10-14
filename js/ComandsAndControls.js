(function (document, window, undefined) {
    window.SIA_COMMANDS = {
        FORWARD: 'FORWARD',
        BACK: 'BACK',
        LEFT: 'LEFT',
        RIGHT: 'RIGHT',
        DOWN: 'DOWN',
        UP: 'UP',
        RESET: 'RESET',
        ARMREST: 'ARMREST',
        CUSHION: 'CUSHION',
        SUSPENSION: 'SUSPENSION',
        SAFETY_BELT: 'BELT',
        BENCH_SEAT: 'BENCH',
        BACK_REST: 'REST',
        NOT_RECOGNIZED: 'NOT_RECOGNIZED'
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
    }

    function startDeviceMotion() {
        var x, y, z;
        var deviceOrientation;
        var DEVICE_ORIENTATION = {
            FLAT: 'FLAT',
            VERTICAL: 'VERTICAL',
            SIDE: 'SIDE'
        };
        var motionInProgress = false;
        window.addEventListener("deviceorientation", function (event) {
            deviceOrientation = DEVICE_ORIENTATION.FLAT;
            var threshold = 30;
            var alpha = Math.abs(event.alpha);
            var gamma = Math.abs(event.gamma);
            var beta = Math.abs(event.beta);
            if (alpha < threshold && beta < threshold && gamma < threshold) {
                return;
            }
            if (beta > gamma) {
                if (beta > alpha) {
                    deviceOrientation = DEVICE_ORIENTATION.VERTICAL;
                } else {
                    deviceOrientation = DEVICE_ORIENTATION.FLAT;
                }
            } else if (gamma > alpha) {
                deviceOrientation = DEVICE_ORIENTATION.SIDE;
            } else {
                deviceOrientation = DEVICE_ORIENTATION.FLAT;
            }
        }, true);

        window.addEventListener('devicemotion', function(event) {
            if (motionInProgress) {
                return;
            }
            var threshold = 2;
            var acceleration = event.acceleration;
            var command = SIA_COMMANDS.NOT_RECOGNIZED;
            var x, y, z, ax, ay, az;
            x = acceleration.x;
            y = acceleration.y;
            z = acceleration.z;
            ax = Math.abs(x);
            ay = Math.abs(y);
            az = Math.abs(z);
            if (ax < threshold && ay < threshold && az < threshold) {
                // console.log('NOT RECOGNIZED MOTION:', ax, ay, az);
                return;
            }
            switch (deviceOrientation) {
                case DEVICE_ORIENTATION.FLAT:
                    if (az === Math.max(ax, ay, az)) {
                        if (z > 0) {
                            command = SIA_COMMANDS.UP;
                        } else {
                            command = SIA_COMMANDS.DOWN;
                        }
                    } else if (ax === Math.max(ax, ay, az)) {
                        if (x > 0) {
                            command = SIA_COMMANDS.RIGHT;
                        } else {
                            command = SIA_COMMANDS.LEFT;
                        }
                    } else {
                        if (y > 0) {
                            command = SIA_COMMANDS.FORWARD;
                        } else {
                            command = SIA_COMMANDS.BACK;
                        }
                    }
                    break;
                case DEVICE_ORIENTATION.VERTICAL:
                    if (ay === Math.max(ax, ay, az)) {
                        if (y > 0) {
                            command = SIA_COMMANDS.UP;
                        } else {
                            command = SIA_COMMANDS.DOWN;
                        }
                    } else if (ax === Math.max(ax, ay, az)) {
                        if (x > 0) {
                            command = SIA_COMMANDS.RIGHT;
                        } else {
                            command = SIA_COMMANDS.LEFT;
                        }
                    } else {
                        if (z > 0) {
                            command = SIA_COMMANDS.FORWARD;
                        } else {
                            command = SIA_COMMANDS.BACK;
                        }
                    }
                    break;
            }
            if (command !== SIA_COMMANDS.NOT_RECOGNIZED) {
                motionInProgress = true;
                setTimeout(function () {
                    motionInProgress = false;
                }, 1000);
            }
            console.log('RECOGNIZED MOTION:', x, y, z, ' ORIENTATION:', deviceOrientation,
                ' COMMAND: ',command);
            window.dispatchEvent(new CustomEvent(command));
        });
    }

    document.addEventListener("DOMContentLoaded", function(event) {
        initializeVoiceRecognition();
        startDeviceMotion();
    });
})(document, window);
