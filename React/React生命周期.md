# React生命周期
0. 生命周期的升级与变化
1. 挂载和卸载
2. 更新
3. 整体流程

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
如果在componentWillMount中setState，组件会更新state，__但只渲染一次__。<br/>
如果在componentDidMount中setState，组件会在初始化阶段渲染两次。


### 卸载
* componentWillUnmount
执行一些清理方法，如事件回收、清除定时器。

### 更新
16.3之后
* static getDerivedStateFromProps()
* shouleComponentUpdate()
* render()
* getSnapshotBeforeUpdate()
* componentDidUpdate()

16.3之前
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
![常用生命周期](https://github.com/pangbooo/note/blob/master/React/imgs/react-lifecycle-1.PNG)
![不常用生命周期](https://github.com/pangbooo/note/blob/master/React/imgs/react-lifecycle-2.PNG)
