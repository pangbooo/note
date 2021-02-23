## 浅克隆
```javascript
function shallowClone(obj){
    let result = {};
    for(let i in obj){
        result[i] = obj[i]
    }

    return result;
}

```

## 深克隆
```javascript
function deepClone(obj){
    if( typeof obj === 'object'){
        var result = obj.constructor === Array ? [] : {};
        for(let i in obj){
            result[i] = typeof obj[i] === 'object' ? deepClone(obj[i]) : obj[i]
        }
    }else{
        var result = obj;
    }

    return result;
}
```