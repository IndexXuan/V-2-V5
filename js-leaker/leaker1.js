/**
 *  Leaker
 *  ------------------------------------------------
 *  Author : IndexXuan(https://github.com/IndexXuan)
 *  Date   : Thu 07 Apr 2016 02:16:44 PM CST
 */

var Leaker = function() {};

Leaker.prototype = {
    init: function(name, parent, registry) {
        this._name = name;
        this._parent = parent;
        this._registry = registry;
        this._child = null;
        this.createChildren();
        this.registerCallback();
    },

    createChildren: function() {
        if (this._parent !== null) {
            // only create a child if this is the root
            return;
        }
        this._child = new Leaker();
        this._child.init("leaker 2", this, this._registry);
    },

    registerCallback: function() {
        this._registry.add(this);
    },

    destroy: function() {
        this_registry.remove(this);
    }
};


