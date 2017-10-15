(function (document, window, undefined) {
    window.INFOS = {
        ARMREST: 'Information about Armrest is displayed here. It is very interesting!',
        CUSHION: 'Information about Cushion is displayed here. It is very interesting!',
        SUSPENSION: 'Information about Suspension is displayed here. It is very interesting!',
        SAFETY_BELT: 'Information about Belt is displayed here. It is very interesting!',
        BENCH_SEAT: 'Information about Bench is displayed here. It is very interesting!',
        BACK_REST: 'Information about Back Rest is displayed here. It is very interesting!'
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