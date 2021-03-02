# diff算法
> diff算法会帮助我们计算出Virtual Dom这种真正发生变化的部分，并只针对该部分进行真正的Dom操作。

## 1. 传统diff算法
> 传统diff算法通过循环递归对节点进行依次比较，效率低下，算法复杂度达到O(n3)。n是树中节点总数。

## 2. 详解diff
> React将Virtual Dom树转换成autual Dom树的最少操作过程称为 __调和（reconciliation）__

### 2.1 diff策略
1. Web UI中DOM节点跨层级的移动操作很少，可以忽略
2. 拥有相同类的两个组件会生成相似的树形结构
3. 同一层级的一组子节点，他们可以通过唯一id进行区分
> React 对tree diff、component diff、element diff 进行算法优化

####  tree diff
> 对树进行分层比较，两棵树只会对统一同次的节点进行比较。即同一父节点下的所有子节点。当发现节点不存在了，该节点和其子节点会被完全删除，不会用于进一步的比较。

```javascript
function updateChildren(nextNestedChildrenElements, transaction, context) {
    updateDepth++;
    var errorThrown = true;
    try{
        this._updataChildren(nextNestedChildrenElements, transaction, context);
        errorThrown = false;
    }finally{
        updateDepth--;
        if(!updateDepth){
            if(errorThrown){
                cleanQueue();
            }else{
                processQueue();
            }
        }
    }
}

```
* 当出现节点跨层级移动时，并不会出现移动操作，而是以A节点为根节点的整个树被重新创建，这是一种影响React性能的操作。💻
* 再开发时保持稳定的DOM结构会有性能的提升。例如可以通过css隐藏dom，而不是真正的移除添加DOM节点

#### component diff
* 同一类型组件： 按照tree diff 继续比较Virtual Dom即可
* 非同一类型组件：将组件判断为dirty component，从而替换整个组件下的子节点

#### element diff
> 当节点处于同一层级时，React有三种操作方法：INSERT_MARKUP、MOVE_EXISTING、REMOVE_NODE
* INSERT_MARKUP
新的组件类型不在旧组件里，需要插入新节点。
* MOVE_EXISTING 
    * 旧集合有新组件类型，且element是可更新类型。做移动操作，可以复用以前的DOM节点。
    * 同一层级的同组节点，添加唯一key，性能优化。💻
    * 比较方法：
    1. 通过key判断新旧集合节点是否相同
    2. 节点相同：判断 child._mountIndex（节点在旧集合的index） < lastIndex（lastIndex一只在更新，表示访问过的节点旧集合的最右即最大位置），则需要移动。
* REMOVE_NODE
旧元素不能被复用，或者新组建不存在旧组件某节点，需要删除操作
> 最后都放入差异队列中，等待更新


## 3. React Patch方法
> 将tree diff计算出来的DOM差异队列更新到真实的DOM上，最终让浏览器渲染出更新的数据。
通过浏览器遍历差异队列实现。通过更新类型进行相应的操作，插入、移动、删除节点。

# React Fiber
* Fiber 的中文翻译叫纤程，与进程、线程同为程序执行过程，Fiber 就是比线程还要纤细的一个过程。纤程意在对渲染过程实现进行更加精细的控制。
* 从架构角度来看，Fiber 是对 React 核心算法（即调和过程）的重写。
* 从编码角度来看，Fiber 是 React 内部所定义的一种数据结构，它是 Fiber 树结构的节点单位，也就是 React 16 新架构下的"虚拟 DOM"。(一个 fiber 就是一个 JavaScript 对象)


## Fiber的两个阶段
* render/reconciliation
* commit


### render/reconciliation 协调阶段(可中断/异步)
#### "递阶段"
> 在协调阶段会进行 Diff 计算，会生成一棵 Fiber 树。

1. 首先从rootFiber开始向下深度优先遍历。为遍历到的每个Fiber节点调用```beginWork```方法 (该方法会根据传入的Fiber节点创建子Fiber节点，并将这两个Fiber节点连接起来。)
2. 当遍历到叶子节点（即没有子组件的组件）时就会进入“归”阶段。

#### "归阶段"
> 在“归”阶段会调用completeWork处理Fiber节点。

* 当某个Fiber节点执行完```completeWork```，如果其存在兄弟Fiber节点（即fiber.sibling !== null），会进入其兄弟Fiber的“递”阶段。
* 如果不存在兄弟Fiber，会进入父级Fiber的“归”阶段。
* “递”和“归”阶段会交错执行直到“归”到rootFiber。至此，render阶段的工作就结束了。

## commit 提交阶段(不可中断/同步)
> commit 阶段的主要工作（即 Renderer 的工作流程）分为三部分：

1. before mutation 阶段，这个阶段 DOM 节点还没有被渲染到界面上去，过程中会触发```getSnapshotBeforeUpdate```，也会处理 ```useEffect``` 钩子相关的调度逻辑。
2. mutation 阶段，这个阶段负责 DOM 节点的渲染。在渲染过程中，会遍历 effectList，根据 flags（effectTag）的不同，执行不同的 DOM 操作。
3. layout 阶段，这个阶段处理 DOM 渲染完毕之后的收尾逻辑。比如调用 ```componentDidMount/componentDidUpdate```，调用 ```useLayoutEffect``` 钩子函数的回调等。除了这些之外，它还会把 fiberRoot 的 current 指针指向 workInProgress Fiber 树。
