(function (document, window, undefined) {
    window.INFOS = {
        [SIA_COMMANDS.ARMREST]: 'This is a nice and beautiful armrest. You should like its comfort!',
        [SIA_COMMANDS.CUSHION]: 'Cushions are here for you relax and sleep',
        [SIA_COMMANDS.SUSPENSION]: 'This suspension holds any activity on a seat',
        [SIA_COMMANDS.SAFETY_BELT]: 'We respect your safety, so safey belts are comfortable',
        [SIA_COMMANDS.BENCH_SEAT]: 'You will definitely like our bench as it is made of soft fabrics',
        [SIA_COMMANDS.BACK_REST]: 'Such back rest seriosly makes your back resting'
    };

    function showPopupModal(type) {
        var left = document.getElementById('left');
        var right = document.getElementById('right');
        var left1 = document.getElementById('left1');
        var right1 = document.getElementById('right1');
        var head = '<h2>'+type+'</h2><p>'+INFOS[type]+'</p>';
        left1.innerHTML = head;
        right1.innerHTML = head;
        
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