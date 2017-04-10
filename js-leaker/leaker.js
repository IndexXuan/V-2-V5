/**
 *  leaker.js
 *  ------------------------------------------------
 *  Author : IndexXuan(https://github.com/IndexXuan)
 *  Date   : Thu 07 Apr 2016 11:43:55 AM CST
 */

var Leaker = function() {};
Leaker.prototype = {
    init: function() {
        this._interval = null;
        this.start();
    },

    start: function() {
        var self = this;
        this._interval = setInterval(function() {
            self.onInterval();
        }, 100);
    },

    destroy: function() {
        if (this._interval !== null) {
            clearInterval(this._interval);
        }
    },

    onInterval: function() {
        console.log("Interval");
    }
};
