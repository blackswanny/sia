(function (document, window, undefined) {


    function showPopupModal() {

    }

    document.addEventListener("DOMContentLoaded", function(event) {
        window.addEventListener(SIA_COMMANDS.ARMREST, function(event) {});
        window.addEventListener(SIA_COMMANDS.CUSHION, function(event) {});
        window.addEventListener(SIA_COMMANDS.SUSPENSION, function(event) {});
        window.addEventListener(SIA_COMMANDS.SAFETY_BELT, function(event) {});
        window.addEventListener(SIA_COMMANDS.BENCH_SEAT, function(event) {});
        window.addEventListener(SIA_COMMANDS.BACK_REST, function(event) {});
    });

})(document, window);