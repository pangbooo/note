# React生命周期
0. 生命周期的升级与变化
1. 挂载和卸载
2. 更新
3. 整体流程
4. 生命周期详细

### 升级与变化
__注：以下生命周期在React 16.3后已不推荐使用。__
* componentWillMount
* componetWillReceiveProps
* componentWillUpdate

#### 逐步的迁移路径
* 16.3: 为不安全的生命周期引入别名，UNSAFE_componentWillMount、UNSAFE_componentWillReceiveProps 和 UNSAFE_componentWillUpdate。（旧的生命周期名称和新的别名都可以在此版本中使用。）
* 16.x: 为 componentWillMount、componentWillReceiveProps 和 componentWillUpdate 启用废弃告警。（旧的生命周期名称和新的别名都将在这个版本中工作，但是旧的名称在开发模式下会产生一个警告。）
* 17.0: 删除 componentWillMount、componentWillReceiveProps 和 componentWillUpdate。（在此版本之后，只有新的 “UNSAFE_” 生命周期名称可以使用。）

### 挂载
> 当组件实例被创建并插入 DOM 中时，其生命周期调用顺序如下
* constructor
* static getDerivedStateFromProps(props,state) / ~~UNSFFE_componentWillMount~~ 
* render
* componentDidMount
<br/>
如果在componentWillMount中setState，组件会更新state，__但只渲染一次__。<br/>
如果在componentDidMount中setState，组件会在初始化阶段渲染两次。


### 卸载
* componentWillUnmount
<br/>
执行一些清理方法，如事件回收、清除定时器。

### 更新
16.3之后
* static getDerivedStateFromProps()
* shouleComponentUpdate()
* render()
* getSnapshotBeforeUpdate()
* componentDidUpdate()

16.3之前<br/>
__自身setState或者调用forUpdate()__
* shouleComponentUpdate
* componentWillUpdate
* render
* componentDidUpdate()

__new props__
* componentWillReceiveProps
* shouleComponentUpdate
* componentWillUpdate
* render
* componentDidUpdate()

### 整理流程（16.3之后）
![常用生命周期](https://github.com/pangbooo/note/blob/master/imgs/react-lifecycle-1.PNG)
![不常用生命周期](https://github.com/pangbooo/note/blob/master/imgs/react-lifecycle-2.PNG)


### 生命周期详细
* #### shouldComponentUpdate
```shouldComponentUpdate(nextProps, nextState)```
> 此方法仅作为 __性能优化__ 的方式而存在。不要企图依靠此方法来“阻止”渲染，因为这可能会产生 bug。你应该考虑使用内置的 __PureComponent__ 组件，而不是手动编写。

##### shouldComponentUpdate 的作用
这是一个组件的子树。每个节点中，__SCU__ 代表 shouldComponentUpdate 返回的值，而 __vDOMEq__ 代表返回的 React 元素是否相同。最后，圆圈的颜色代表了该组件是否需要被调停。
![shouldComponentUpdate](https://github.com/pangbooo/note/blob/master/imgs/should-component-update.png)

##### 示例(一)
```javascript
class CounterButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {count: 1};
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.color !== nextProps.color) {
      return true;
    }
    if (this.state.count !== nextState.count) {
      return true;
    }
    return false;
  }

  render() {
    return (
      <button
        color={this.props.color}
        onClick={() => this.setState(state => ({count: state.count + 1}))}>
        Count: {this.state.count}
      </button>
    );
  }
}
```
> 如果```props``` 和 ```state``` 只进行 __浅比较__，则可以使用 __PureComponent__ 进行简化

```javascript
class CounterButton extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {count: 1};
  }

  render() {
    return (
      <button
        color={this.props.color}
        onClick={() => this.setState(state => ({count: state.count + 1}))}>
        Count: {this.state.count}
      </button>
    );
  }
}
```

##### 示例(二)
```javascript
class ListOfWords extends React.PureComponent {
  render() {
    return <div>{this.props.words.join(',')}</div>;
  }
}

class WordAdder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      words: ['marklar']
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    // 这部分代码很糟，而且还有 bug
    //push修改了同一个数组，导致组件ListOfWords中的 nextProps 和 this.props 没有发生变化
    const words = this.state.words;
    words.push('marklar'); 
    this.setState({words: words});

    //TODO
    /**
    this.setState(state => ({
        words: [...this.state.words, 'marklar']
    }))
    **/
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick} />
        <ListOfWords words={this.state.words} />
      </div>
    );
  }
}

```

* #### static getDerivedStateFromProps()
* #### getSnapshotBeforeUpdate()



