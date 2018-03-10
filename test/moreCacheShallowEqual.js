const repureCreator = require('../lib/').repureCreator
const shallowEqual = require('../lib/').shallowEqual



function f(a, b) {
    console.log('invoke f:')
    return 'f'
}


const rf = repureCreator(4, shallowEqual)(f)



console.log('========')
console.log(rf(1, 1))
console.log(rf(1, 1))
console.log(rf(2, 2))
console.log(rf(3, 3))
console.log(rf(4, 4))
console.log(rf(1, 1))
console.log(rf(2, 2))
console.log(rf(3, 3))
console.log(rf(4, 4))
console.log(rf(1, 1))
console.log(rf(2, 2))
console.log(rf(3, 3))
console.log(rf(4, 4))

console.log('+++++++++++++')
const x1 = {}
const y1 = {}

const x2 = {}
const y2 = {}

const x3 = {}
const y3 = {}

const x4 = {}
const y4 = {}

console.log(rf(x1, y1))
console.log(rf(x2, y2))
console.log(rf(x3, y3))
console.log(rf(x4, y4))
console.log(rf(x1, y1))
console.log(rf(x2, y2))
console.log(rf(x3, y3))
console.log(rf(x4, y4))
console.log(rf(x1, y1))
console.log(rf(x2, y2))
console.log(rf(x3, y3))
console.log(rf(x4, y4))