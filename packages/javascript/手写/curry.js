/**
 * 函数科里化
 */

export default function curry() {

}


const cur = function(fn, ...args) {
    return function(...args2) {
        return fn.apply(this, [...args, ...args2])
    }
}

function add(a, b) {
    return a + b
}

const addCur = cur(add, 1, 2);
addCur() // 3

const addCur2 = cur(add, 1);
addCur2(2) // 3



function sub_cur(fn) {
    let args = [].slice.call(arguments, 1)
    return function () {
        return fn.apply(this, args.concat([].slice.call(arguments)))
    }
}

function curry(fn, length) {
    length = length || fn.length

    let slice = Array.prototype.slice

    return function () {
        if(arguments.length < length) {
            let combined = [fn].concat(slice.call(arguments))
            return curry(sub_cur.apply(this, combined), length - arguments.length)
        } else {
            return fn.apply(this, arguments)
        }
    }
}


let fn = curry(function(a, b, c) {
    return [a, b, c]
})

fn0 = function (a, b, c, d) {return [a, b, c, d]}
fn1 = curry(fn0)
fn1('a', 'b')
// === 
curry(sub_cur(fn0, 'a', 'b'))
//==
curry(function(...) {
    return fn0('a', 'b',...)
})
// 当执行到