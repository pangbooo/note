# React基础知识

## 1. React的特点
1. 专注视图层
2. Virtual DOM
3. 函数式编程

* ### 专注视图层
> React并不是完整的MVC/MVVM框架。他专注于提供清晰简洁的View层解决方案。而又与模板引擎不同， React 不仅专注于解决 View 层的问题，又是一个包括 View 和 Controller 的库。对于复杂的应用，可以根据应用场景自行选择业务层框架，并根据需要搭配 Flux、 Redux、 GraphQL/Relay 来使用

* ### Virtual DOM
> React把真实的DOM树转换成Javascript对象树，也就是Virtual DOM。

__工作流程:__
每次数据更新后，重新计算Virtual DOM，并且和上一次生成的Virutall DOM做对比。
对变化部分做批量更新。

__优点:__
1. Virtual DOM提升了React的性能
2. Virtual DOM的渲染方式好于传统的DOM操作
3. react-native集成于其他平台

* ### 函数式编程
> 函数式编程对应声明式编程
UI 界面上，React 把过去不断重复构建 UI 的过程抽象成了组件。函数式编程才是 React 的精髓。

## 2. JSX
### JSX的由来
> React为了方便View层组件化，继承了构建HTML架构化页面的职责。所以，React和其他Js模板有相同的构建地方。__不同点__是, React是通过创建与更新虚拟元素来管理整个Virtual DOM。

* DOM元素 和 组件元素
```javascript
<button class="btn btn-blue">
    <em>Confirm</em>
</button>
```
* 元素对应的JSON对象
```javascript
{
    type: 'button',
    props: {
        className: 'btn btn-blue',
        children: [{
            type: 'em',
            props: {
                children: 'Confirm'
            }
        }]
    }
}
```         
这样，我们就可以在 JavaScript 中创建 Virtual DOM 元素了

### JSX写法及原理
```javascript
const DeleteAccount = () => (
    <div>
        <p>Are you sure?</p>
        <DangerButton>Confirm</DangerButton>
        <Button color="blue">Cancel</Button>
    </div>
);
```
  JSX 将 HTML 语法直接加入到 JavaScript 代码中，再通过翻译器转换到纯
JavaScript 后由浏览器执行。<br/>
  现在采用Babel的JSX编译器，在打包编译阶段，将JSX编译成纯Javascript。<br/>
__这是一个通过Babel转译成React可以执行的一个DeleteAccount组件元素__
```javascript
var DeleteAccount = function DeleteAccount(){
    return React.createElement(
        'div',
        null,
        React.createElement(
            'p',
            null,
            'Are you sure'
        ),
        React.createElement(
            DangerButton,
            null,
            'Confirm'
        ),
        React.createElement(
            Button,
            {color: 'blue'},
            'Cancel'
        )
    )
}
```





