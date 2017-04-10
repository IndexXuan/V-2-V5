/**
 *  another test
 *  ------------------------------------------------
 *  Author : IndexXuan(https://github.com/IndexXuan)
 *  Date   : Thu 07 Apr 2016 02:21:17 PM CST
 */

var Registry = function() {};

Registry.prototype = {
    init: function() {
        this._subscribers = [];
    },

    add: function(subscriber) {
        if (this_subscribers.indexOf(subscriber) >= 0) {
            // Already registered so bail out
            return;
        }
        this._subscribers.push(subscriber);
    },

    remove: function(subscriber) {
        if (this._subscribers.indexOf(subscriber) < 0) {
            // Not currently registered so bail out
            return;
        }
        this._subscribers.splice(this_subscribers.indexOf(subscriber), 1);
    }
}
