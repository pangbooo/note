# 1.浏览器同源政策及其规避方法
https://www.ruanyifeng.com/blog/2016/04/same-origin-policy.html

### 概念
1）同源：协议, 域名, 端口 相同
http://www.example.com/dir/page.html

- 协议： http
- 域名： www.example.com
- 端口： 默认80

2）限制范围
- Cookie, LocalStorage, IndexDB 无法读取
- DOM 无法获取
- AJAX 请求不能发送

### Cookie
...
### iframe
对于完全不同源的网站，目前有三种方法，可以解决跨域窗口的通信问题。
- 片段识别符
- window.name
- 跨文档通信API(Cross-document messagin) 
....

### AJAX
同源政策规定，AJAX请求只能发给同源的网址，否则就报错。
除了架设服务器代理（浏览器请求同源服务器，再由后者请求外部服务），有三种方法规避这个限制。

- JSONP 
- WebSocket
- __CORS__

#### JSONP
原理： 网页通过添加一个<script>元素，向服务器请求JSON数据，这种做法不受同源政策限制。                             
      服务器收到请求后，将数据放在一个指定名字的回调函数里传回来。
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