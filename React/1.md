## 1.　代码分割、动态路由

## 2.　shouldComponentUpdate & PureComponent & memo & immetable.js
### 2.1 shouldComponentUpdate
> 使用 ```shouldComponentUpdate()```  以让React知道当```state```或```props```的改变是否影响组件的重新```render```，默认返回```ture```，返回```false```时不会重新渲染更新，而且该方法并不会在初始化渲染或当使用 ```forceUpdate()``` 时被调用

### 2.2 PureComponent
> React.PureComponent 与 React.Component 很相似。两者的区别在于 React.Component 并未实现 shouldComponentUpdate()，而 React.PureComponent 中以 __浅层对比__ prop 和 state 的方式来实现了该函数。
* __浅层对比__
```javascript
state = {
    parentMsg:'parent',
    sonMsg:{
      val:'this is val of son'
    }
  }

  //推荐
  this.setState(({sonMsg}) =>{ 
        return {
            sonMsg:{
            ...sonMsg,
            val:'son' + Date.now()
            }
            
        }
    })

  //不推荐
  this.setState(({sonMsg}) =>{ 
        sonMsg.val = 'son' + Date.now();
        return {sonMsg}
  })
  
    //==>
    let obj1 = {val: son}
    obj2 = obj1;
    obj2.val = son + '1234'; // obj1 的val 也同时被修改。因为他们指向同一个地方引用
    obj1 === obj2;// true

```

### 2.3 memo
### 2.4 immetable.js

## 3. useMemo & useCallback
* 返回一个 memoized 值。
* 把“创建”函数和依赖项数组作为参数传入 useMemo，它仅会在某个依赖项改变时才重新计算 memoized 值。这种优化有助于避免在每次渲染时都进行高开销的计算。
```javascript
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

## 4. 状态管理
* 状态管理能够解决的问题主要分为两个方面，一 就是解决跨层级组件通信问题 。二 就是对一些全局公共状态的缓存。
* 不变的数据，多个页面可能需要的数据，放在状态管理中，对于时常变化的数据，我们可以直接请求接口