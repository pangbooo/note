# Http缓存
1. [缓存种类](https://github.com/pangbooo/note/blob/master/Brower/Performance/Http%E7%BC%93%E5%AD%98.md#1-%E7%BC%93%E5%AD%98%E7%A7%8D%E7%B1%BB)
    * [1.1(私有)浏览器缓存](https://github.com/pangbooo/note/blob/master/Brower/Performance/Http%E7%BC%93%E5%AD%98.md#12-%E5%85%B1%E4%BA%AB%E4%BB%A3%E7%90%86%E7%BC%93%E5%AD%98)
    * [1.2 (共享)代理缓存](https://github.com/pangbooo/note/blob/master/Brower/Performance/Http%E7%BC%93%E5%AD%98.md#12-%E5%85%B1%E4%BA%AB%E4%BB%A3%E7%90%86%E7%BC%93%E5%AD%98)
2. [缓存控制](https://github.com/pangbooo/note/blob/master/Brower/Performance/Http%E7%BC%93%E5%AD%98.md#2-%E7%BC%93%E5%AD%98%E6%8E%A7%E5%88%B6)
    * [2.1 Cache-Control](https://github.com/pangbooo/note/blob/master/Brower/Performance/Http%E7%BC%93%E5%AD%98.md#21-cache-control)
    * [2.2 Pragma 头](https://github.com/pangbooo/note/blob/master/Brower/Performance/Http%E7%BC%93%E5%AD%98.md#22-pragma-%E5%A4%B4)
3. [新鲜度](https://github.com/pangbooo/note/blob/master/Brower/Performance/Http%E7%BC%93%E5%AD%98.md#3-%E6%96%B0%E9%B2%9C%E5%BA%A6)
    * [3.1 缓存驱逐](https://github.com/pangbooo/note/blob/master/Brower/Performance/Http%E7%BC%93%E5%AD%98.md#31-%E7%BC%93%E5%AD%98%E9%A9%B1%E9%80%90)
    * [3.2 改进资源](https://github.com/pangbooo/note/blob/master/Brower/Performance/Http%E7%BC%93%E5%AD%98.md#32-%E6%94%B9%E8%BF%9B%E8%B5%84%E6%BA%90)
4. [缓存验证](https://github.com/pangbooo/note/blob/master/Brower/Performance/Http%E7%BC%93%E5%AD%98.md#4-%E7%BC%93%E5%AD%98%E9%AA%8C%E8%AF%81)
    * [4.1 缓存验证时机](https://github.com/pangbooo/note/blob/master/Brower/Performance/Http%E7%BC%93%E5%AD%98.md#41-%E7%BC%93%E5%AD%98%E9%AA%8C%E8%AF%81%E6%97%B6%E6%9C%BA)
    * [4.2 强验证](https://github.com/pangbooo/note/blob/master/Brower/Performance/Http%E7%BC%93%E5%AD%98.md#42-%E5%BC%BA%E9%AA%8C%E8%AF%81)
    * [4.3 弱验证](https://github.com/pangbooo/note/blob/master/Brower/Performance/Http%E7%BC%93%E5%AD%98.md#43-%E5%BC%B1%E9%AA%8C%E8%AF%81)

> 通过复用以前获取的资源，可以显著提高网站和应用程序的性能。Web 缓存减少了等待时间和网络流量，因此减少了显示资源表示形式所需的时间。通过使用 HTTP缓存，变得更加响应性。

## 1. 缓存种类
### 1.1 (私有)浏览器缓存
私有缓存只能用于单独用户。你可能已经见过浏览器设置中的“缓存”选项。浏览器缓存拥有用户通过 HTTP 下载的所有文档。这些缓存为浏览过的文档提供向后/向前导航，保存网页，查看源码等功能，可以避免再次向服务器发起多余的请求。它同样可以提供缓存内容的离线浏览。
### 1.2 (共享)代理缓存
共享缓存可以被多个用户使用。例如，ISP 或你所在的公司可能会架设一个 web 代理来作为本地网络基础的一部分提供给用户。这样热门的资源就会被重复使用，减少网络拥堵与延迟。

## 2. 缓存控制
### 2.1 Cache-Control
__HTTP/1.1__ 定义的 Cache-Control 头用来区分对缓存机制的支持情况， 请求头和响应头都支持这个属性。通过它提供的不同的值来定义缓存策略。

* no-store
> 不缓存。
缓存中不得存储任何关于客户端请求和服务端响应的内容。每次由客户端发起的请求都会下载完整的响应内容。

* no-cache
> 缓存但重新验证。
每次有请求发出时，缓存会将此请求发到服务器（译者注：该请求应该会带有与本地缓存相关的验证字段），服务器端会验证请求中所描述的缓存是否过期，若未过期（注：实际就是返回304），则缓存才使用本地缓存副本。


* public/private(默认值)  
* max-age
> 表示资源能够被缓存（保持新鲜）的最大时间
* must-revalidate
> 当使用了 "must-revalidate" 指令，那就意味着缓存在考虑使用一个陈旧的资源时，必须先验证它的状态，已过期的缓存将不被使用。详情看下文关于缓存校验的内容。
```
Cache-Control: no-store; 
Cache-Control: no-cache; 
Cache-Control: private;  //private" 则表示该响应是专用于某单个用户的，中间人不能缓存此响应，该响应只能应用于浏览器私有缓存中。
Cache-Control: public; //"public" 指令表示该响应可以被任何中间人（译者注：比如中间代理、CDN等）缓存。
Cache-Control: max-age=31536000; 
Cache-Control: must-revalidate
```

### 2.2 Pragma 头
Pragma 是 __HTTP/1.0__ 标准中定义的一个header属性，__请求__ 中包含Pragma的效果跟在头信息中定义Cache-Control: no-cache相同，但是HTTP的响应头没有明确定义这个属性，所以它不能拿来完全替代HTTP/1.1中定义的Cache-control头。 __通常定义Pragma以向后兼容基于HTTP/1.0的客户端。__
```
Pragma: no-cache;
```

## 3. 新鲜度
### 3.1 缓存驱逐
驱逐算法用于将陈旧的资源（缓存副本）替换为新鲜的。

* 流程
1. 第一次发送请求
    1. server 返回：</br>
    Cache-Control: max-age=31536000; </br>
    或 Expires: Wed, 21 Oct 2015 07:28:00 GMT </br>
    或 Last-Modified: day-name, day month year hour: minute: second GMT </br>
> Cache-Control: max-age -> Expires -> Last-Modified 优先级从高到低。

1. 第二次发送请求
    1. cache 检查max-age是否过期
    2. 结果: </br>
       没过期 -> 使用缓存资源(__强缓存__) 返回200状态码</br> 
       已过期 -> （__协商缓存__）
        1. 判断 __ETag__
            1) 存在ETag</br> 
            cache 添加一个 __If-None-Match__ 请求头，发送请求server
            2) 不存在ETag</br> 
            请求中带上 __If-Modified-Since__  来验证缓存，发送请求server
        2. 结果: </br>
            没过期304 (Not Modified)（该响应不会有带有实体信息）</br>
            过期返回200 新的资源
       

### 3.2 改进资源
不频繁更新的文件会使用特定的命名方式：在URL后面（通常是文件名后面）会加上版本号。

## 4. 缓存验证
### 4.1 缓存验证时机
1. 浏览器刷新
2. ```Cache-control: must-revalidate```<br/>
当缓存的文档过期后，需要进行缓存验证或者重新获取资源。只有在服务器返回 __强校验器或者弱校验器__ 时才会进行验证。

### 4.2 强验证
* 响应头 __ETag__
* 第一次请求res（响应头） -> ETag </br>
  之后的请求req（请求头） -> If-None-Match
```
ETag: "33a64df551425fcc55e4d42a148795d9f25f89d4" //强验证
ETag: W/"0815" //弱验证
```

### 4.3 弱验证
> 弱验证是因为它只能精确到一秒 。

* 响应头 __Last-Modified__
* 第一次请求res（响应头） -> Last-Modified </br>
  之后的请求req（请求头） -> If-Modified-Since

## 流程图
![流程图](https://github.com/pangbooo/note/blob/master/imgs/HttpCache.png)

## 其他
https://github.com/yiliang114/Blog/issues/6



