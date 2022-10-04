# setState
## 1. class 组件
### 1.1 React.Component
```javascript
class A extends React.Component {
    this.state = {
        a: {
            b: 1
        }
    }    

    componentDidMount() {
        setTimeout(() => {
            this.state.a.b = 1;
            this.setState(this.state);
        }, 2000);
    }
}
```
* 结果： 不重新render
* 原因： 普通的class组件只要是setState就会重新render。

### 1.2 React.PureComponent
```javascript
class A extends React.PureComponent {
    this.state = {
        a: {
            b: 1
        }
    }    

    componentDidMount() {
        setTimeout(() => {
            this.state.a.b = 1;
            this.setState(this.state);
        }, 2000);
    }
}
```
* 结果： 不重新render
* 原因：class组件的PureComponent会先比较对象是否变化， 如果没有变化再比较对象的每个只是否变化。上面例子对象没发生变化，值也没变化。

### 源码
![class1](https://github.com/pangbooo/note/blob/master/imgs/class1.png)
![class2](https://github.com/pangbooo/note/blob/master/imgs/class2.png)

## 2. function 组件
### 2.1 例1
```javascript
function A () {
    const [state, setState] = ({
        a: {
            b: 1
        }
    });

    useEffect(() => {
        setTimeout(() => {
            state.a.b = 2;
            setState(state);
        }, 2000);
    }, [])
}
```
* 结果： 不重新render

### 2.2 例2
```javascript
function A () {
    const [state, setState] = ({
        a: {
            b: 1
        }
    });

    useEffect(() => {
        setTimeout(() => {
            setState({
                a: {
                    b: 1,
                }
            });
        }, 2000);
    }, [])
}
```
* 结果： 重新render
* 原因： function 组件只比较对象是否发生改变。



### 2.3 源码
![function](https://github.com/pangbooo/note/blob/master/imgs/function.png)
## 3. immutable && immer