## CORS (Cross-origin resource sharing)
整个CORS通信过程，都是浏览器自动完成，不需要用户参与。对于开发者来说，CORS通信与同源的AJAX通信没有差别，代码完全一样。浏览器一旦发现AJAX请求跨源，就会自动添加一些附加的头信息，有时还会多出一次附加的请求，但用户不会有感觉。

因此，实现CORS通信的关键是服务器。只要服务器实现了CORS接口，就可以跨源通信。

### 1. 简单请求
同时满足条件(1),(2)
1. 请求方法限于
    * GET
    * POST
    * HEAD
2. HTTP的头信息不超出如下字段
    * Accept
    * Accept-Language
    * Content-Language
    * Last-Event-ID
    * Content-Type (只限于如下三种)
        * application/x-www-form-urlencoded
        * multipart/form-data
        * text-plain

#### 1.1 简单请求基本流程
浏览器在请求头增加一个```Origin```字段。用来说明本次请求来自哪个源。服务器根据这个值决定是否同意这次请求。

* Request
```
GET /cors HTTP/1.1
Origin: http://api.bob.com
Host: api.alice.com
Accept-Language: en-US
Connection: keep-alive
User-Agent: Mozilla/5.
```
</br >

* Response(```Origin```在许可范围的，会多处几个头信息)
```
Access-Control-Allow-Origin: http://api.bob.com
Access-Control-Allow-Credentials: true
Access-Control-Expose-Headers: FooBar
Content-Type: text/html; charset=utf-8
```
##### Access-Control-Allow-Origin
该字段是必须的。它的值要么是请求时Origin字段的值，要么是一个*，表示接受任意域名的请求。

##### Access-Control-Allow-Credentials
该字段可选。它的值是一个布尔值，表示是否允许发送Cookie。默认情况下，Cookie不包括在CORS请求之中。设为true，即表示服务器明确许可，Cookie可以包含在请求中，一起发给服务器。这个值也只能设为true，如果服务器不要浏览器发送Cookie，删除该字段即可。

#### Access-Control-Expose-Headers
该字段可选。CORS请求时，```XMLHttpRequest```对象的```getResponseHeader()```方法只能拿到6个基本字段：```Cache-Control```、```Content-Language```、```Content-Type```、```Expires```、```Last-Modified```、```Pragma```。如果想拿到其他字段，就必须在```Access-Control-Expose-Headers里面指定```。上面的例子指定，```getResponseHeader('FooBar')```可以返回FooBar字段的值。

#### 1.2 withCredentials属性
配合```response```使用```Access-Control-Allow-Credentials```,AJAX在请求中需要配置```withCredentials```属性
```javascript
var xhr = new XMLHttpRequest();
xhr.withCredentials = true;
```

### 2.非简单请求
#### 2.1 预备请求
```
OPTIONS /cors HTTP/1.1
Origin: http://api.bob.com
Access-Control-Request-Method: PUT
Access-Control-Request-Headers: X-Custom-Header
Host: api.alice.com
Accept-Language: en-US
Connection: keep-alive
User-Agent: Mozilla/5.0...
```
* ```OPTIONS```表示预备请求的方法
* ```Origin```表示来自哪个源
* ```Access-Control-Request-Method```字段是必须的，用来列出浏览器的CORS请求会用到哪些HTTP方法
* ```Access-Control-Request-Headers```该字段是一个逗号分隔的字符串，指定浏览器CORS请求会额外发送的头信息字段

#### 2.2 预备响应
当预备请求检测通过，会返回如下预备响应，表示服务器允许的```Access-Control-Allow-Origin```(必须字段) 、```Access-Control-Allow-Methods```(必须字段)、```Access-Control-Allow-Headers```、```Access-Control-Allow-Headers```
```
HTTP/1.1 200 OK
Date: Mon, 01 Dec 2008 01:15:39 GMT
Server: Apache/2.0.61 (Unix)
Access-Control-Allow-Origin: http://api.bob.com
Access-Control-Allow-Methods: GET, POST, PUT
Access-Control-Allow-Headers: X-Custom-Header
Content-Type: text/html; charset=utf-8
Content-Encoding: gzip
Content-Length: 0
Keep-Alive: timeout=2, max=100
Connection: Keep-Alive
Content-Type: text/plain
```
其他预备响应头```Access-Control-Allow-Credentials```、```Access-Control-Max-Age```

不允许的情况的预备响应
```
XMLHttpRequest cannot load http://api.alice.com.
Origin http://api.bob.com is not allowed by Access-Control-Allow-Origin.
```

#### 2.3 正式请求
一旦服务器通过了"预检"请求，以后每次浏览器正常的CORS请求，就都跟简单请求一样，会有一个Origin头信息字段。服务器的回应，也都会有一个```Access-Control-Allow-Origin```头信息字段。


参考 https://www.ruanyifeng.com/blog/2016/04/cors.html

