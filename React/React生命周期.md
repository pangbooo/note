# React生命周期
1. [生命周期的升级与变化](https://github.com/pangbooo/note/blob/master/React/React%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F.md#%E5%8D%87%E7%BA%A7%E4%B8%8E%E5%8F%98%E5%8C%96)
2. [挂载和卸载](https://github.com/pangbooo/note/blob/master/React/React%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F.md#%E6%8C%82%E8%BD%BD)
3. [更新](https://github.com/pangbooo/note/blob/master/React/React%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F.md#%E6%9B%B4%E6%96%B0)
4. [错误处理](https://github.com/pangbooo/note/blob/master/React/React%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F.md#错误处理)
5. [整体流程](https://github.com/pangbooo/note/blob/master/React/React%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F.md#%E6%95%B4%E7%90%86%E6%B5%81%E7%A8%8B163%E4%B9%8B%E5%90%8E)
6. [生命周期详细](https://github.com/pangbooo/note/blob/master/React/React%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F.md#%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E8%AF%A6%E7%BB%86)

### 升级与变化
#### 新增生命周期
* static getDerivedStateFromProps()<br/>
  每次render()之前执行
* getSnapshotBeforeUpdate()<br/>
  每次componentDidUpdate()之前执行

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
* __static getDerivedStateFromProps(props,state)__
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
#### 16.3之后
* __static getDerivedStateFromProps()__
* __shouleComponentUpdate()__
* render()
* __getSnapshotBeforeUpdate()__
* componentDidUpdate()

#### 16.3之前
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

### 错误处理
* static getDerivedStateFromError()
* componentDidCatch()

### 整理流程（16.3之后）
![常用生命周期](https://github.com/pangbooo/note/blob/master/imgs/react-lifecycle-1.PNG)
![不常用生命周期](https://github.com/pangbooo/note/blob/master/imgs/react-lifecycle-2.PNG)


### 生命周期详细
* #### shouldComponentUpdate(nextProps, nextState)
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
> 它应返回一个对象来更新 state，如果返回 null 则不更新任何内容。
getDerivedStateFromProps 的存在只有一个目的：让组件在 props 变化时更新 state。</br>
一个常见误解是，getDerivedStateFormProps和ComponentWillReceiveProps 只有在接受新props才更新，
而__事实是__，只要父级组件更新，那么就会触发这个生命周期。


* 派生模式（Derived State）
* 反面模式（anti-pattern）
1. 直接复制props到state
```javascript
class EmailInput extends Component {
  state = { email: this.props.email };

  render() {
    return <input onChange={this.handleChange} value={this.state.email} />;
  }

  handleChange = event => {
    this.setState({ email: event.target.value });
  };

  componentWillReceiveProps(nextProps) {
    // 这会覆盖所有组件内的 state 更新！
    // 不要这样做。
    this.setState({ email: nextProps.email });
  }
}
```
每次父组件更新，都会触发state更新，导致输入input的value丢失。
尽管我们去比较nextProps.email !== this.state.email , 都不会避免这个问题。

2. 在 props 变化后修改 state
```javascript
class EmailInput extends Component {
  state = {
    email: this.props.email
  };

  componentWillReceiveProps(nextProps) {
    // 只要 props.email 改变，就改变 state
    if (nextProps.email !== this.props.email) {
      this.setState({
        email: nextProps.email
      });
    }
  }
  
  // ...
}
```

* 建议的模式
1. 完全可控组件
```javascript
function EmailInput(props) {
  return <input onChange={props.onChange} value={props.email} />;
}
```

2. 有key的非可控组件
> 另外一个选择是让组件自己存储临时的 email state。在这种情况下，组件仍然可以从 prop 接收“初始值”，但是更改之后的值就和 prop 没关系了
```javascript
class EmailInput extends Component {
  state = { email: this.props.defaultEmail };

  handleChange = event => {
    this.setState({ email: event.target.value });
  };

  render() {
    return <input onChange={this.handleChange} value={this.state.email} />;
  }
}
```
```javascript
<EmailInput
  defaultEmail={this.props.user.email}
  key={this.props.user.id}
/>
```
__当 key 变化时， React 会创建一个新的而不是更新一个既有的组件。__ </br>
每次 ID 更改，都会重新创建 EmailInput ，并将其状态重置为最新的 defaultEmail 值。

3. 其他
##### 选项一：用 prop 的 ID 重置非受控组件
```javascript
class EmailInput extends Component {
  state = {
    email: this.props.defaultEmail,
    prevPropsUserID: this.props.userID
  }

  static getDerivedStateFromProps (props, state){
    if(props.userID !== state.prevPropsUserID) {
      return {
        email: props.defaultEmail,
        prevPropsUserID: props.userID
      }
    }

    return null;
  }

}
```

##### 选项二：使用实例方法重置非受控组件
> 父组件使用ref调用 resetEmailForNewUser，重置
```javascript
class EmailInput extends Component {
  state = {
    email: this.props.defaultEmail
  };

  resetEmailForNewUser(newEmail) {
    this.setState({ email: newEmail });
  }

  // ...
}
```
refs 在某些情况下很有用，比如这个。但通常我们建议谨慎使用。即使是做一个演示，这个命令式的方法也是非理想的，因为这会导致两次而不是一次渲染。
* #### getSnapshotBeforeUpdate()



