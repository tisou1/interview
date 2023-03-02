import call from './call'


export default function apply(context = window, fn,  args) {
    return call(context, fn, ...args)
}


Function.prototype.myApply = function(context =window, args) {
    return this.myCall(context, ...args)
}