# React基础知识

## React的特点
1. 专注视图层
2. Virtual DOM
3. 函数式编程

### 专注视图层
> React并不是完整的MVC/MVVM框架。他专注于提供清晰简洁的View层解决方案。而又与模板引擎不同， React 不仅专注于解决 View 层的问题，又是一个包括 View 和 Controller 的库。对于复杂的应用，可以根据应用场景自行选择业务层框架，并根据需要搭配 Flux、 Redux、 GraphQL/Relay 来使用

### Virtual DOM
> React把真实的DOM树转换成Javascript对象树，也就是Virtual DOM。

__工作流程__
每次数据更新后，重新计算Virtual DOM，并且和上一次生成的Virutall DOM做对比。
对变化部分做批量更新。

__优点__
* Virtual DOM提升了React的性能
* Virtual DOM的渲染方式好于传统的DOM操作
* react-native集成于其他平台

### 函数式编程
> 函数式编程对应声明式编程
UI 界面上，React 把过去不断重复构建 UI 的过程抽象成了组件。函数式编程才是 React 的精髓。
