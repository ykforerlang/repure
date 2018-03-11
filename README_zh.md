# repure
替代[reselect](https://github.com/reactjs/reselect.git)， 并且提供更近简单，自然的写法。 
基于传人相同的参数，会返回相同的结果。repure包装过的函数会根据入参来缓存结果， 一旦发现 入参相同，就直接返回缓存的结果


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
repure 提供3个方法 repureCreator(cacheSize, equalityCheck)， repure， repureOneCacheCreator(equalityCheck)

#### repureCreator(cacheSize, equalityCheck)
函数repureCreator 返回一个repure， 可以缓存cacheSize个结果。 在判断入参是否相同的时候使用 equalityCheck。 
默认的 equalityCheck 是：
```javascript
function defaultEqualityCheck(a, b) {
    return a === b
}
```
另外提供一个 shallowEqual: `import { shallowEqual } from 'repure'`


#### repure
大部分情况下，你应该使用这个方法。 这个和你使用[reselct](https://github.com/reactjs/reselect.git)的createSelector的效果是一样的， 使用`===` 比较相等， cacheSize是1。
repure接受一个**pure function**， 返回这个方法的 缓存版本

####  repureOneCacheCreator(equalityCheck)
repureCreator 在cacheSize=1 时的优化版本

另外提供一个 batchRepure(obj, repure) 方法。 用法如下： 
```javascript
import * as fobj from './xx' // file export 衍生函数

const fobj2 = batchRepure(obj, repure)
```

### 组合
```javascript
function f(a, b) {
    ...
}
const rf = repure(f)

function g(a, b, c){
    const r = rf(a, b)
    return r * c
}
const rg = repure(g)

rg(1, 1, 2)
rg(1, 1, 2)
rg(1, 1, 3)
```
 
