// ==UserScript==
// @name         F××× Xbox
// @namespace    https://github.com/mougua/
// @version      0.1
// @description  自动化xbox游戏的购买
// @author       mougua
// @match        https://www.microsoft.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    function repeatJob(jobFunc, intervalGenerator) {
        var lastTime = 0;
        var interval = 0;
        var seed = 0;

        function loop() {
            var now = new Date();
            if(now - lastTime > interval) {
                lastTime = now;

                interval = intervalGenerator()
                jobFunc();
            }
            seed = requestAnimationFrame(loop)
        }

        return {
            start: function() {
                seed = requestAnimationFrame(loop)
            },
            stop: function() {
                cancelAnimationFrame(seed);
            }
        }
    }

    function intervalGenerator() {
        return Math.round(Math.random()*1000+1000);
    }

    function job() {
        var b1 = document.getElementById('buttonPanel_AppIdentityBuyButton');
        var frm = document.getElementById('wb_auto_blend_container');
        if (frm !== null) {
            var b2 = frm.contentWindow.document.getElementById('confirmButton');
            var b3 = frm.contentWindow.document.getElementById('cancelButton');
            if (b2 !== null) {
                b2.click();
            } else if (b3 !== null) {
                b3.click();
            }
        } else if (b1 !== null) {
            b1.click();
        }
    }

    document.onkeydown = function(e) {
        var keyCode = e.keyCode || e.which || e.charCode;
        var ctrlKey = e.ctrlKey || e.metaKey;
        if(ctrlKey && keyCode == 13) {
            var r = repeatJob(job, intervalGenerator);
            r.start();
        }
        e.preventDefault();
        return false;
    }
})();
