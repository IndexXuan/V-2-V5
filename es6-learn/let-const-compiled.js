"use strict";

function f() {
    {
        var x = undefined;
        {
            // okay, block scoped name
            var _x = "sneaky";
            // error, const
            // x = "foo";
        }
        // error, already declared in block
        // let x = "inner";
    }
}
