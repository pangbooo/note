# diff算法
> diff算法会帮助我们计算出Virtual Dom这种真正发生变化的部分，并只针对该部分进行真正的Dom操作。

### 1.传统diff算法
> 传统diff算法通过循环递归对节点进行依次比较，效率低下，算法复杂度达到O(n3)。n是树中节点总数。

### 2.详解diff
> React将Virtual Dom树转换成autual Dom树的最少操作过程称为 __调和（reconciliation）__

#### 2.1 diff策略
1. Web UI中DOM节点跨层级的移动操作很少，可以忽略
2. 拥有相同类的两个组件会生成相似的树形结构
3. 同一层级的一组子节点，他们可以通过唯一id进行区分
> React 对tree diff、component diff、element diff 进行算法优化

#####  tree diff
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

##### component diff
* 同一类型组件： 按照tree diff 继续比较Virtual Dom即可
* 非同一类型组件：将组件判断为dirty component，从而替换整个组件下的子节点

##### element diff
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


### 3.React Patch方法
> 将tree diff计算出来的DOM差异队列更新到真实的DOM上，最终让浏览器渲染出更新的数据。
通过浏览器遍历差异队列实现。通过更新类型进行相应的操作，插入、移动、删除节点。
