(function (document, window, undefined) {


    function showPopupModal(type) {
        var left = document.getElementById('left');
        var right = document.getElementById('right');
        var left1 = document.getElementById('left1');
        var right1 = document.getElementById('right1');
        left1.innerHTML = type;
        right1.innerHTML = type;
        
        left.style.display = 'block';
        right.style.display = 'block';
        setTimeout(function(){
            left.style.display = 'none';
            right.style.display = 'none';
        }, 5000);
    }

    document.addEventListener("DOMContentLoaded", function(event) {
        window.addEventListener(SIA_COMMANDS.ARMREST, function(event) { showPopupModal(SIA_COMMANDS.ARMREST); });
        window.addEventListener(SIA_COMMANDS.CUSHION, function(event) { showPopupModal(SIA_COMMANDS.CUSHION); });
        window.addEventListener(SIA_COMMANDS.SUSPENSION, function(event) { showPopupModal(SIA_COMMANDS.SUSPENSION); });
        window.addEventListener(SIA_COMMANDS.SAFETY_BELT, function(event) { showPopupModal(SIA_COMMANDS.SAFETY_BELT); });
        window.addEventListener(SIA_COMMANDS.BENCH_SEAT, function(event) { showPopupModal(SIA_COMMANDS.BENCH_SEAT); });
        window.addEventListener(SIA_COMMANDS.BACK_REST, function(event) { showPopupModal(SIA_COMMANDS.BACK_REST); });
    });

})(document, window);