/**
 *  TODO: file intro...
 *  ---------------------------------------------
 *  Author : IndexXuan(https://github.com/IndexXuan)
 *  Mail   : pengrui@iwaimai.baidu.com
 *  Date   : Tue 06 Dec 2016 04:26:54 PM CST
 */

var StateMachine = require('./node_modules/javascript-state-machine/state-machine.min.js')

var fsm = StateMachine.create({

    initial: 'green',

    error: function (eventName, from, to, args, errorCode, errorMessage, originalException) {
        return 'event ' + eventName + ' was naughty :- ' + errorMessage;
    },
    　　
　　events: [
　　　　{ name: 'warn',  from: 'green',  to: 'yellow' },
    　　{ name: 'stop',  from: 'yellow', to: 'red' },
    　　{ name: 'ready', from: 'red',    to: 'yellow' },
    　　{ name: 'go',    from: 'yellow', to: 'green' }
　　],

    callbacks: {
        onbeforewarn: function () {
            log('before warn: ')
        },

        onleavegreen: function () {
            setTimeout(function () {
                fsm.transition()
                log('leave green, to -> ')
            }, 2000)

            return StateMachine.ASYNC
        }
    }

})

function log (msg) {
    msg = msg || ''
    console.log(msg + fsm.current)
}

// drive
fsm.warn()

// console.log(fsm.current, fsm.is('green'), fsm.can('stop'), fsm.cannot('stop'))
