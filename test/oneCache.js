const repure = require('../lib/').default



function f(a, b) {
    console.log('invoke f:')
    return 'f'
}

const rf = repure(f)

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
