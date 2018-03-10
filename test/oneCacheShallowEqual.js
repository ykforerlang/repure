const repureOneCacheCreator = require('../lib/').repureOneCacheCreator
const shallowEqual = require('../lib/').shallowEqual



function f(a, b) {
    console.log('invoke f:')
    return 'f'
}

const rf = repureOneCacheCreator(shallowEqual)(f)

console.log(rf(1, 2))
console.log(rf(1, 2))
console.log(rf(1, 2))
console.log(rf(1, 2))

console.log(rf(2, 3))



console.log('=======')
console.log(rf({}, {}))
console.log(rf({}, {}))
console.log(rf({}, {}))
console.log(rf({}, {}))


console.log('=======')
const o1 = {}
const o2 = {}
console.log(rf(o1, o2))
console.log(rf(o1, o2))
console.log(rf(o1, o2))



console.log('=+++++++++++++')
const o3 = {
    name: '',
    key: '',

}
const o4 = {
    color: '',
    size: ''
}
console.log(rf(o3, o4))
console.log(rf(o3, o4))
console.log(rf(o3, o4))
