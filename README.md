# repure
[中文文档](./README_zh.md)

A replacement for [reselect](https://github.com/reactjs/reselect.git) and providing a more simple, more natural way of writing.
Same parameters will get same result, so the function which wrapped by `repure`  will cache the result. If the same parameter is transmitted next time, the cached results will be used.

### Get Start
**install** :`npm install repure`

```javascript
import repure from 'repure'

function f(a, b) {
  console.log('invoke f, will takes 5 seconds')
  return a + b
}

const rf = repure(f)

rf(1, 1) // takes 5 seconds
rf(1, 1) // takes 0 seconds
rf(1, 1) // takes 0 seconds
rf(1, 1) // takes 0 seconds
rf(2, 2) // takes 5 seconds

```

### API
repure provide 3 API: repureCreator(cacheSize, equalityCheck)， repure， repureOneCacheCreator(equalityCheck)

#### repureCreator(cacheSize, equalityCheck)
the result of repureCreator is a **repure** and the wrapped functions could cache **cacheSize** results.
we will use **equalityCheck** to compare whether or not the parameters are equal.

Default equalityCheck：
```javascript
function defaultEqualityCheck(a, b) {
    return a === b
}
```

Another common equalityCheck is  shallowEqual: `import { shallowEqual } from 'repure'`


#### repure
In most cases, you should use this method. cacheSize = 1 and equalityCheck is  `===`. the same with `createSelector` provided by [reselct](https://github.com/reactjs/reselect.git)

####  repureOneCacheCreator(equalityCheck)
repureOneCacheCreator is optimized version of repureCreator when cacheSize is 1.



Also provide a method of batch operation： batchRepure(obj, repure)
```javascript
import * as fobj from './xx' // file export func

const fobj2 = batchRepure(obj, repure)
```

 
