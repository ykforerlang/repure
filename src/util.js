export function getArgsIndex(oldargsArray, args, equalityCheck) {
    for(let i = 0; i< oldargsArray.length; i++) {
        const oi = oldargsArray[i]
        if (argsEqual(oi, args, equalityCheck)) {
            return i
        }
    }
}

export function argsEqual(arr1, arr2, equalityCheck = defaultEqualityCheck) {
    if (arr1.length !== arr2.length) return false

    for(let i = 0; i < arr1.length; i ++) {
        if (!equalityCheck(arr1[i], arr2[i])) return false
    }

    return true
}

export function defaultEqualityCheck(a, b) {
    return a === b
}