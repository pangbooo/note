# Hook的实现与使用

## 1.useState
> 返回一个状态以及可以修改这个状态的setter。
* 返回的setter可以修改组建的状态，并且引起组件re-render
* 和普通的hooks不一样，这个歌hook可以多次调用，且产生不同的效果，且hook随着Fiber Node 一起生灭。

### useState初始化 必须放在第一层，不可放在逻辑判断内部。
> 储存的memoizedState 被设计成一个链表（Hook对象）

### useState 如何更新数据

## 2.useEffect（callback，deps）
* 默认不传递第二个参数的情况下，在每次组件渲染之后执行
* 与useState传入的是具体state不同，useEffect传入的是一个callback函数，与useState最大的不同是执行时机，useEffect callback是在 __组件被渲染为真实DOM后__ 执行（所以可以用于DOM操作）
* useEffect调用也会在当前Fiber节点的Hooks链追加一个hook并返回，它的memoizedState存放一个effect对象，effect对象最终会被挂载到Fiber节点的updateQueue队列（当Fiber节点都渲染到页面上后，就会开始执行Fiber节点中的updateQueue中所保存的函数）
* deps做 __浅比较__（所以对象、函数无意义）
* deps数组项必须是 __mutable__
* 推荐将deps调用的函数，定义在useEffect内部，这样就可以发现deps的参数。

#### 浅比较
> === 变量做浅比较。
1. 对象，数组比较变量的引用地址是否是同一个。
2. 基础数据类型比较对象的值是否相等

#### React immutable
props和state是immutable。（对象的浅比较，比较的是引用地址是否发生变化。）所以porps，state不会发现变化 （个人理解）

#### mutable
* __Mutable__ 是一种可以改变的变量。在JavaScript 中，只有对象和数组是可变的，而不是原始值。
* 你可以让一个变量名指向一个新值，但之前的值仍然保存在内存中。因此需要进行垃圾回收。

```javascript
var immutableString = "Hello";
immutableString = immutableString + 'World';
```
1. 检索“immutableString”的现有值
2. “World”附加到“immutableString”的现有值
3. 然后将结果值分配给新的内存块
4. “immutableString”对象现在指向新创建的内存空间
5. 以前创建的内存空间现在可用于垃圾收集。

## 3. 清除effect
为了防止内存泄漏，清除函数会在组件卸载浅执行。另外，如果组件多次渲染（普遍如此），那么在执行下一个effect之前，上一个effect就已经被清除。





