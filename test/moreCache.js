const repureCreator = require('../lib/').repureCreator


function f(a, b) {
    console.log('invoke f:')
    return 'f'
}


const rf = repureCreator(4)(f)



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
