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
        MENU: 'MENU',
        NOT_RECOGNIZED: 'NOT_RECOGNIZED'
    };
    var recognitionApi;
    var voiceCommandInProgress = false;

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
                    if (!voiceCommandInProgress) {
                        voiceCommandInProgress = true;
                        setTimeout(function () {
                            voiceCommandInProgress = false;
                        }, 2000);
                        window.dispatchEvent(new CustomEvent(command));
                    }
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
        var prevAlpha = 0;
        var prevBeta = 0;
        var prevGamma = 0;
        window.addEventListener("deviceorientation", function (event) {
            var threshold = 45;
            var close = function (a, b, isGamma) {
                return Math.abs(a - b) < (isGamma ? threshold/4 : threshold);
            };
            var DIRECTIONS = {
                NORTH: 'NORTH',
                SOUTH: 'SOUTH',
                WEST: 'WEST',
                EAST: 'EAST'
            };
            var direction;
            deviceOrientation = DEVICE_ORIENTATION.VERTICAL;
            var alpha = event.alpha;
            var aalpha = Math.abs(alpha);
            var gamma = event.gamma;
            var agamma = Math.abs(gamma);
            var beta = event.beta;
            var abeta = Math.abs(beta);
            if (close(alpha, prevAlpha) && close(beta, prevBeta) && close(gamma, prevGamma, true)) {
                return;
            }
            if (!close(alpha, prevAlpha)) {
                prevAlpha = alpha;
            }
            if (!close(beta, prevBeta)) {
                prevBeta = beta;
            }
            if (!close(gamma, prevGamma)) {
                prevGamma = gamma;
            }
            if (close(beta, 0) && close(gamma, 0, true)) {
                deviceOrientation = DEVICE_ORIENTATION.FLAT;
            }
            console.log('ORIENTATION:', deviceOrientation, ' ', alpha, beta, gamma);
            return;



            // direction = DIRECTIONS.NORTH;
            // if (close(alpha, 0)) {
            //     direction = DIRECTIONS.NORTH;
            //     if (close(beta, 90) || close(beta, -90)) {
            //         deviceOrientation = DEVICE_ORIENTATION.VERTICAL;
            //         return;
            //     } else if (close(beta, 180) || close(beta, -180)) {
            //         deviceOrientation = DEVICE_ORIENTATION.FLAT;
            //         return;
            //     }
            // } else if (close(alpha, 90)) {
            //     direction = DIRECTIONS.WEST;
            // } else if (close(alpha, 180)) {
            //     direction = DIRECTIONS.SOUTH;
            // } else if (close(alpha, 270)) {
            //     direction = DIRECTIONS.EAST;
            // }
            //
            // if (abeta < threshold && agamma < threshold/4) {
            //     deviceOrientation = DEVICE_ORIENTATION.FLAT;
            //     return;
            // } else {
            //
            // }
            //
            //
            //
            // if (aalpha === Math.max(aalpha, abeta, agamma)) {
            //
            // } else if (agamma === Math.max(aalpha, abeta, agamma)) {
            //     deviceOrientation = DEVICE_ORIENTATION.SIDE;
            //     if (aalpha > threshold) {
            //         deviceOrientation = DEVICE_ORIENTATION.VERTICAL;
            //     }
            // } else {
            //     deviceOrientation = DEVICE_ORIENTATION.FLAT;
            //     if (agamma > threshold) {
            //         deviceOrientation = DEVICE_ORIENTATION.VERTICAL;
            //     }
            // }
            console.log('ORIENTATION:', deviceOrientation, ' ', alpha, beta, gamma);
        }, true);

        window.addEventListener('devicemotion', function(event) {
            if (motionInProgress) {
                return;
            }
            var threshold = 2.5;
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
                            command = SIA_COMMANDS.BACK;
                        } else {
                            command = SIA_COMMANDS.FORWARD;
                        }
                    } else {
                        if (y > 0) {
                            command = SIA_COMMANDS.RIGHT;
                        } else {
                            command = SIA_COMMANDS.LEFT;
                        }
                    }
                    break;
                case DEVICE_ORIENTATION.VERTICAL:
                    if (ay === Math.max(ax, ay, az)) {
                        if (y > 0) {
                            command = SIA_COMMANDS.RIGHT;
                        } else {
                            command = SIA_COMMANDS.LEFT;
                        }
                    } else if (ax === Math.max(ax, ay, az)) {
                        if (x > 0) {
                            command = SIA_COMMANDS.DOWN;
                        } else {
                            command = SIA_COMMANDS.UP;
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
        setTimeout(function () {
            recognitionApi.stop();
            setTimeout(function () {
                initializeVoiceRecognition();
            }, 500);
        }, 3000);
        startDeviceMotion();
    });

})(document, window);
