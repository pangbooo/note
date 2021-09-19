## 1. useEffect
1. 每次渲染都会生成各自的state，function，和useEffect 
2. useEffect会在浏览器渲染当次更新之后执行
3. useRef 是 mutable
```javascript
function Example() {
  const [count, setCount] = useState(0);
  const latestCount = useRef(count);

  useEffect(() => {
    // Set the mutable latest value
    latestCount.current = count;
    setTimeout(() => {
      // Read the mutable latest value
      console.log(`You clicked ${latestCount.current} times`);
    }, 3000);
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

## 2. 清除 useEffect

```javascript  
useEffect(() => {
    ChatAPI.subscribeToFriendStatus(props.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.id, handleStatusChange);
    };
  });

```

React只会在[浏览器绘制](https://medium.com/@dan_abramov/this-benchmark-is-indeed-flawed-c3d6b5b6f97f)后运行effects。这使得你的应用更流畅因为大多数effects并不会阻塞屏幕的更新。Effect的清除同样被延迟了。**上一次的effect会在重新渲染后被清除：**

- **React 渲染`{id: 20}`的UI。**
- 浏览器绘制。我们在屏幕上看到`{id: 20}`的UI。
- **React 清除`{id: 10}`的effect。**
- React 运行`{id: 20}`的effect。

## 3. React会根据我们当前的props和state同步到DOM

## 4. useEffect 依赖策略

1.  添加所有依赖项目

2. 修改effect内部的代码以确保它包含的值只会在需要的时候发生变更
   1. setState( c => c+1 )
   2. useReducer （移除effect的依赖）

## 5. useCallback 函数依赖 

函数每次渲染都会改变 。

```javascript
function SearchResults() {
  const [query, setQuery] = useState('react');

  // ✅ Preserves identity until query changes
  const getFetchUrl = useCallback(() => {
    return 'https://hn.algolia.com/api/v1/search?query=' + query;
  }, [query]);  // ✅ Callback deps are OK

  useEffect(() => {
    const url = getFetchUrl();
    // ... Fetch data and do something ...
  }, [getFetchUrl]); // ✅ Effect deps are OK

  // ...
}
```

对于父子组件同样适用。
```jsx
function Parent() {
  const [query, setQuery] = useState('react');

 // ✅ Preserves identity until query changes  
 //const fetchData = useCallback(() => { 
 // const url = 'https://hn.algolia.com/api/v1/search?query=' + query;  // ... Fetch data and return it ...  }, [query]);  // ✅ Callback deps are OK
  return <Child fetchData={fetchData} />
}

function Child({ fetchData }) {
  let [data, setData] = useState(null);

  useEffect(() => {
    fetchData().then(setData);
  }, [fetchData]); // ✅ Effect deps are OK

  // ...
}
```

对于class组件，```this.props.fetchData``` 永远不会发生变化
```jsx
// Parent Component
class Parent extends Component {
  state = {
    query: 'react'
  };
  fetchData = () => {
    const url = 'https://hn.algolia.com/api/v1/search?query=' + this.state.query;
    // ... Fetch data and do something ...
  };
  render() {
    return <Child fetchData={this.fetchData} />;
  }
}

class Child extends Component {
  state = {
    data: null
  };
  componentDidMount() {
    this.props.fetchData();
  }
  render() {
    // ...
  }
}

// Chind Component
class Child extends Component {
  state = {
    data: null
  };
  componentDidMount() {
    this.props.fetchData();
  }
  componentDidUpdate(prevProps) {
    // 🔴 This condition will never be true
    if (this.props.fetchData !== prevProps.fetchData) {
      this.props.fetchData();
    }
  }
  render() {
    // ...
  }
}
```