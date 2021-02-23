# 1.浏览器同源政策及其规避方法
1. [概念](https://github.com/pangbooo/note/blob/master/Brower/CrossOrigin.md#1-%E6%A6%82%E5%BF%B5)
2. [Cookie](https://github.com/pangbooo/note/blob/master/Brower/CrossOrigin.md#2-cookie)
3. [iframe](https://github.com/pangbooo/note/blob/master/Brower/CrossOrigin.md#3-iframe)
4. [AJAX](https://github.com/pangbooo/note/blob/master/Brower/CrossOrigin.md#4-ajax)

## 1. 概念
1）同源：协议, 域名, 端口 相同
http://www.example.com/dir/page.html

- 协议： http
- 域名： www.example.com
- 端口： 默认80

2）限制范围
- Cookie, LocalStorage, IndexDB 无法读取
- DOM 无法获取
- AJAX 请求不能发送

## 2. Cookie
Cookie 默认只有同源的网页才可以共享。
```javascript
HTTP/1.0 200 OK
Content-type: text/html
Set-Cookie: id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT;Domain=example.com; path=/blog Secure; HttpOnly
```
* __一级域名__ 服务端设置Domain=example.com，则子域名（w1.exapmle.com）都可以访问cookie
* __子域名__（w1.exapmle.com、w2.exapmle.com）同时设置相同的Domain=example.com,两个网页就可以共享Cookie。

## 3. iframe
* 如果两个窗口一级域名相同，只是二级域名不同，那么设置上一节介绍的document.domain属性，就可以规避同源政策，拿到DOM。
* 对于完全不同源的网站，目前有三种方法，可以解决跨域窗口的通信问题。

#### 片段识别符
> 片段标识符（fragment identifier）指的是，URL的#号后面的部分，比如http://example.com/x.html#fragment的#fragment。如果只是改变片段标识符，页面不会重新刷新。 

#### window.name
#### 跨文档通信API(Cross-document messagin) 

## 4. AJAX
同源政策规定，AJAX请求只能发给同源的网址，否则就报错。
除了架设服务器代理（浏览器请求同源服务器，再由后者请求外部服务），有三种方法规避这个限制。

- JSONP 
- WebSocket
- __CORS__

### 4.1 JSONP
> 原理： 网页通过添加一个```<script>```元素，向服务器请求JSON数据，这种做法不受同源政策限制。服务器收到请求后，将数据放在一个指定名字的回调函数里传回来。

```javascript
function addScriptTag(src){
  var script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  script.src = src;
  document.body.appendChild(script);
}
windown.onload = function(){
  addScriptTag('http://example.com/ip?callback=foo')
}
function foo(data){
  console.log('Your public IP address is: ' + data.ip)
}
```
__注意，该请求的查询字符串有一个callback参数，用来指定回调函数的名字，这对于JSONP是必需的。服务器收到这个请求以后，会将数据放在回调函数的参数位置返回。__

```javascript
foo({
  "ip": "8.8.8.8"
});
```
优点：简单适用，老式浏览器全部支持
缺点： 1.只能法GET请求。 2.后台需要配合修改 （服务端必须要调整以返回callback(...)）

### 4.2 WebSocket
> WebSocket是一种通信协议，使用ws://（非加密）和wss://（加密）作为协议前缀。该协议不实行同源政策，只要服务器支持，就可以通过它进行跨源通信。
```
GET /chat HTTP/1.1
Host: server.example.com
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: x3JJHMbDL1EzLkh9GBhXDw==
Sec-WebSocket-Protocol: chat, superchat
Sec-WebSocket-Version: 13
Origin: http://example.com (*)
```

### 4.3 CORS
> CORS是一个W3C标准，全称是"跨域资源共享"（Cross-origin resource sharing）。它允许浏览器向跨源服务器，发出XMLHttpRequest请求，从而克服了AJAX只能同源使用的限制。

* CORS需要浏览器和服务器同时支持。目前，所有浏览器都支持该功能，IE浏览器不能低于IE10。
* 整个CORS通信过程，都是浏览器自动完成，不需要用户参与。对于开发者来说，CORS通信与同源的AJAX通信没有差别，代码完全一样。浏览器一旦发现AJAX请求跨源，就会自动添加一些附加的头信息，有时还会多出一次附加的请求，但用户不会有感觉。
因此，实现CORS通信的关键是服务器。只要服务器实现了CORS接口，就可以跨源通信。

参考<br/>
* https://www.ruanyifeng.com/blog/2016/04/same-origin-policy.html



