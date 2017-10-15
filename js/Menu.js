(function (document, window, undefined) {
    document.addEventListener("DOMContentLoaded", function(event) {
        document.documentElement.className = "js";

        var menu = document.querySelector( '.menu' ),
            button = document.querySelector('.nav-toggle'),
            supportBlock = document.getElementById('support');
            dropdown = document.querySelector('.dropdown');

        button.onclick = function() {
            classie.toggle( menu, 'menu-active' );
        };

        document.addEventListener('click', function(event) {
            if (event.target !== dropdown && !dropdown.contains(event.target)) {
                classie.removeClass(menu, "menu-active");
            }
        });
        window.addEventListener(SIA_COMMANDS.MENU, function(event) {
            classie.toggle(menu, 'menu-active');
        });
        window.addEventListener(SIA_COMMANDS.CALL, function(event) {
            classie.toggle(supportBlock, 'support-active');
        });


        ( function( window ) {

            'use strict';


            function classReg( className ) {
                return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
            }


            var hasClass, addClass, removeClass;

            if ( 'classList' in document.documentElement ) {
                hasClass = function( elem, c ) {
                    return elem.classList.contains( c );
                };
                addClass = function( elem, c ) {
                    elem.classList.add( c );
                };
                removeClass = function( elem, c ) {
                    elem.classList.remove( c );
                };
            }
            else {
                hasClass = function( elem, c ) {
                    return classReg( c ).test( elem.className );
                };
                addClass = function( elem, c ) {
                    if ( !hasClass( elem, c ) ) {
                        elem.className = elem.className + ' ' + c;
                    }
                };
                removeClass = function( elem, c ) {
                    elem.className = elem.className.replace( classReg( c ), ' ' );
                };
            }

            function toggleClass( elem, c ) {
                var fn = hasClass( elem, c ) ? removeClass : addClass;
                fn( elem, c );
            }

            var classie = {
                // full names
                hasClass: hasClass,
                addClass: addClass,
                removeClass: removeClass,
                toggleClass: toggleClass,
                // short names
                has: hasClass,
                add: addClass,
                remove: removeClass,
                toggle: toggleClass
            };

            if ( typeof define === 'function' && define.amd ) {
                define( classie );
            } else if ( typeof exports === 'object' ) {
                module.exports = classie;
            } else {
                window.classie = classie;
            }

        })( window );

    });

})(document, window);