/**
 *  main to test
 *  ------------------------------------------------
 *  Author : IndexXuan(https://github.com/IndexXuan)
 *  Date   : Thu 07 Apr 2016 11:46:38 AM CST
 */

$('#start_button').click(function() {
    var leakExists = !(
        window["leak"] === null || window["leak"] === undefined
    );
    if (leakExists) {
        return;
    }
    leak = new Leaker();
    leak.init("leaker 1", null, registry);
});

$('#destroy_button').click(function() {
    leak.destroy();
    leak = null;
});

registry = new Registry();
registry.init();

