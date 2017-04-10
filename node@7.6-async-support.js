/**
 *  test node@7.6.0 native async function support
 *  ---------------------------------------------
 *  Author : IndexXuan(https://github.com/IndexXuan)
 *  Mail   : pengrui@iwaimai.baidu.com
 *  Date   : Tue 28 Feb 2017 10:36:52 AM CST
 */

// node >= 7.6.0
async function test () {
    return 'Hello'
}

test().then((data) => {
    console.log(data)
})
