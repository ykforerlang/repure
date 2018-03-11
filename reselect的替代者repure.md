# reselect的替代者repure
-----
在[为什么我们需要reselect](https://segmentfault.com/a/1190000011936772?_ea=3364040) 我们阐述了 reselect的必要性。 
简单回顾一下：
```javascript
class UnusedComp extends Component {
    render() {
        const { a, b, c, fab, hbc, gac, uabc } = this.props
        return (
            <div>
                <h6>{a}</h6>
                <h6>{b}</h6>
                <h6>{c}</h6>
                <h6>{fab}</h6>
                <h6>{hbc}</h6>
                <h6>{gac}</h6>
                <h6>{uabc}</h6>
            </div>
        )
    }
}
```
其中fab = f(a, b), hbc = h(b, c), gac = g(a, c), uabc = u(a, b, c)。 对于这样的组件，我们只需要存储状态a， b， c， 对于fab， hbc， gac， uabc这种可以完全通过现有 状态推导出来的，称为‘衍生属性’。 我们应该只存最小集合的状态，这样方便我们更新状态， 保证数据层正确性等 很多好处。
也正如[为什么我们需要reselect](https://segmentfault.com/a/1190000011936772?_ea=3364040)指出， 这样容易带来没有意义的函数执行（具体看原文）。 解决方法如下： 
```javascript
//
//

import { createSelector } from 'reselect'
import { f, h, g, u } from './xx'

fSelector = createSelector(
    a => state.a,
    b => state.b,
    (a, b) => f(a, b)
)
hSelector = createSelector(
    b => state.b,
    c => state.c,
    (b, c) => h(b, c)
)
gSelector =  createSelector(
    a => state.a,
    c => state.c,
    (a, c) => g(a, c)
)
uSelector = createSelector(
    a => state.a,
    b => state.b,
    c => state.c,
    (a, b, c) => u(a, b, c)
)

...
function mapStateToProps(state) {
    const { a, b, c } = state
    return {
        a,
        b,
        c,
        fab: fSelector(state),
        hbc: hSelector(state),
        gac: gSelector(state),
        uabc: uSelector(state)
    }
}
```

### 简单点。。。
用过mobx的，不会忘记@compute的简洁， 那么redux生态下有替代reselct的简洁的方案吗？ 
`衍生`属性是可以通过基本属性推导出来的， 并且相同的基本属性一定推导出相同的值。 
如fab = f(a, b)。 只要a，b相同，那么fab一定相同。 基于这一点，我们可以有：
```javascript
function x(func) {
    let oldargs = []
    let oldresult = null
    
    return function(...args) {
        if(equal(oldargs, args)) { // equal?
            return oldresult
        }
        oldargs = args
        oldresult = func(...args)
        return oldresult
    }
}

/// now we use
function f(a, b) {
    ...
}
export const xf = x(f)
```
函数x赋予了 衍生函数 记忆的功能，就像reselect一样， 书写起来却方便了很多。 
得益于redux在`equal(oldargs, args)`的时候， 我们可以直接使用 === 来比较参数 

### repure
可以说函数x 就是简版的[repure](https://github.com/ykforerlang/repure)。 
#### API
repure 提供3个方法 repureCreator(cacheSize, equalityCheck)， repure， repureOneCacheCreator(equalityCheck)

###### repureCreator(cacheSize, equalityCheck)
函数repureCreator 返回一个repure， 可以缓存cacheSize个结果。 在判断入参是否相同的时候使用 equalityCheck。 
默认的 equalityCheck 是：
```javascript
function defaultEqualityCheck(a, b) {
    return a === b
}
```
另外提供一个 shallowEqual: `import { shallowEqual } from 'repure'`


###### repure
大部分情况下，你应该使用这个方法。 这个和你使用[reselct](https://github.com/reactjs/reselect.git)的createSelector的效果是一样的， 使用`===` 比较相等， cacheSize是1。
repure接受一个**pure function**， 返回这个方法的 缓存版本

#####  repureOneCacheCreator(equalityCheck)
repureCreator 在cacheSize=1 时的优化版本

另外提供一个 batchRepure(obj, repure) 方法。 可以批量repure。 

### end
repure重写开头的例子
```javascript
import repure, { batchRepure } from 'repure'
import * as allfunc from './xx'

const { f, h, g, u } = batchRepure(allfunc,  repure)
...
function mapStateToProps(state) {
    const { a, b, c } = state
    return {
        a,
        b,
        c,
        fab: f(a, b),
        hbc: h(b, c),
        gac: g(a, c),
        uabc: u(a, b, c)
    }
}
```













