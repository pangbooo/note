# Http缓存
通过复用以前获取的资源，可以显著提高网站和应用程序的性能。Web 缓存减少了等待时间和网络流量，因此减少了显示资源表示形式所需的时间。通过使用 HTTP缓存，变得更加响应性。

* (私有)浏览器缓存
* (共享)代理缓存

## Cache-Control
HTTP/1.1定义的 Cache-Control 头用来区分对缓存机制的支持情况， 请求头和响应头都支持这个属性。通过它提供的不同的值来定义缓存策略。
```
Cache-Control: no-store; //没有缓存
Cache-Control: no-cache; //缓存但重新验证
Cache-Control: private;  //private" 则表示该响应是专用于某单个用户的，中间人不能缓存此响应，该响应只能应用于浏览器私有缓存中。
Cache-Control: public; //"public" 指令表示该响应可以被任何中间人（译者注：比如中间代理、CDN等）缓存。
Cache-Control: max-age=31536000; //表示资源能够被缓存（保持新鲜）的最大时间
Cache-Control: must-revalidate
```

## Pragma 头
Pragma 是 __HTTP/1.0__ 标准中定义的一个header属性，__请求__ 中包含Pragma的效果跟在头信息中定义Cache-Control: no-cache相同，但是HTTP的响应头没有明确定义这个属性，所以它不能拿来完全替代HTTP/1.1中定义的Cache-control头。 __通常定义Pragma以向后兼容基于HTTP/1.0的客户端。__
```
Pragma: no-cache;
```

## 新鲜度
### 缓存驱逐
驱逐算法用于将陈旧的资源（缓存副本）替换为新鲜的。

* 流程
1. 第一次发送请求
    1. server 返回：</br>
    Cache-Control: max-age=31536000; </br>
    或 Expires: Wed, 21 Oct 2015 07:28:00 GMT </br>
    或 Last-Modified: day-name, day month year hour: minute: second GMT

1. 第二次发送请求
    1. cache 检查max-age是否过期
    2. 结果: </br>
       没过期 -> 使用缓存资源(__强缓存__) </br> 
       已过期 -> （__协商缓存__）
        1. cache 添加一个If-None-Match 请求头，发送请求server
        2. 结果: </br>
            没过期304 (Not Modified)（该响应不会有带有实体信息）</br>
            过期返回200 新的资源

### 改进资源
不频繁更新的文件会使用特定的命名方式：在URL后面（通常是文件名后面）会加上版本号。

## 缓存验证
### 弱验证
说它弱是因为它只能精确到一秒
* res（响应头） -> Last-Modified </br>
  req（请求头） -> If-Modified-Since

### 强验证
* res（响应头） -> ETag </br>
  req（请求头） -> If-None-Match
```
ETag: "33a64df551425fcc55e4d42a148795d9f25f89d4"
ETag: W/"0815"
```




