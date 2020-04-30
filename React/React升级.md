# React升级
*  16.2 -> 16.3
    * 生命周期
    * Refs & DOM
    * 转发Ref
* 16.3 -> 16.6
    * Code Splitting
    * React.memo

### 生命周期
https://github.com/pangbooo/note/blob/master/React/React生命周期.md

### Refs
> React 16.3以及之后推荐使用React.createRef()；16.3之前推荐使用回调形式的 refs。

* 当 ```ref``` 属性用于 HTML 元素时，构造函数中使用 ```React.createRef()``` 创建的 ```ref``` 接收底层 DOM 元素作为其 ```current``` 属性。
* 当 ```ref``` 属性用于自定义 class 组件时，ref 对象接收组件的挂载实例作为其 ```current``` 属性。
*  __你不能在函数组件上使用 ref 属性__，因为他们没有实例。

### React.mome
> React.memo 为高阶组件。它与 React.PureComponent 非常相似，但只适用于函数组件，而不适用 class 组件。

    