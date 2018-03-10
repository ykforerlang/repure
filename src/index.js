import { getArgsIndex, argsEqual, defaultEqualityCheck } from './util'

export shallowEqual from './shallowEqual'

export function repureOneCacheCreator(equalityCheck) {
    return function repure(func) {
        let oldargs = []
        let oldresult = null

        return function (...args) {
            if(argsEqual(oldargs, args, equalityCheck)) {
                return oldresult
            } else {
                oldargs = args
                oldresult = func(...args)
                return oldresult
            }
        }
    }
}

export function repureCreator(cacheSize, equalityCheck) {
    return function repure(func) {
        let oldargsArray = []
        let oldresult = []

        return function (...args) {
            let argsIndex = getArgsIndex(oldargsArray, args, equalityCheck)
            if (argsIndex !== undefined) {
                return oldresult[argsIndex]
            } else {
                const result = func(...args)
                oldargsArray.push(args)
                oldresult.push(result)
                if(oldargsArray.length > cacheSize) {
                    oldargsArray.shift()
                    oldresult.shift()
                }
                return result
            }
        }
    }
}

export default repureOneCacheCreator(defaultEqualityCheck)

export function batchRepure(obj, repure) {
    const r = {}
    const allF = Object.keys(obj)
    allF.forEach(fname => {
        r[fname] = repure(obj[fname])
    })
    return r
}
