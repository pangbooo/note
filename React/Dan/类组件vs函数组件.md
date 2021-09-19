## 1.  捕获数据

* 类组件获取当前props的值（ props是immutable；this是mutable）
* 函数组件可以捕获每次渲染的数据 （props是immutable; 函数闭包实现）

```javascript
/**  
	Class Component
**/

class ProfilePage extends React.Component {
  showMessage = (user) => {
    alert('Followed ' + user);
  };

  handleClick = () => {
    const {user} = this.props;
    setTimeout(() => this.showMessage(user), 3000);
  };

  render() {
    return <button onClick={this.handleClick}>Follow</button>;
  }
}

// 改善：
class ProfilePage extends React.Component {
  render() {
    // Capture the props!
    const props = this.props;

    // Note: we are *inside render*.
    // These aren't class methods.
    const showMessage = () => {
      alert('Followed ' + props.user);
    };

    const handleClick = () => {
      setTimeout(showMessage, 3000);
    };

    return <button onClick={handleClick}>Follow</button>;
  }
}

```

```javascript
/**  
	function Component
**/

function ProfilePage(props) {
  const showMessage = () => {
    alert('Followed ' + props.user);
  };

  const handleClick = () => {
    setTimeout(showMessage, 3000);
  };

  return (
    <button onClick={handleClick}>Follow</button>
  );
}
```

当父组件使用不同的props来渲染`ProfilePage`时，React会再次调用`ProfilePage`函数。但是我们点击的事件处理函数，“属于”具有自己的`user`值的上一次渲染，并且`showMessage`回调函数也能读取到这个值。它们都保持完好无损。

## 2. useRef

在函数组件如果想获取最新的值，可以使用useRef()。```useRef().current```是mutable的。

```javascript
function MessageThread() {
  const [message, setMessage] = useState('');

  // 保持追踪最新的值。
  const latestMessage = useRef('');
  useEffect(() => {
    latestMessage.current = message;
  });

  const showMessage = () => {
    alert('You said: ' + latestMessage.current);
};
```

