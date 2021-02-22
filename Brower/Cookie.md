# Cookie
1. [概述]()
2. [Cookie 与 HTTP 协议]()

## 1.概述
* 每个 Cookie 都有以下几方面的元数据。
    * Cookie 的名字
    * Cookie 的值（真正的数据写在这里面）
    * 到期时间（超过这个时间会失效）
    * 所属域名（默认为当前域名）
    * 生效的路径（默认为当前网址）
> 浏览器的同源政策规定，两个网址只要域名相同，就可以共享 Cookie（参见《同源政策》一章）。注意，这里不要求协议相同。也就是说，http://example.com设置的 Cookie，可以被https://example.com读取。

## 2.Cookie 与 HTTP 协议
> Cookie 由 HTTP 协议生成，也主要是供 HTTP 协议使用。
### 2.1 HTTP Response：Cookie 的生成
```
HTTP/1.0 200 OK
Content-type: text/html
Set-Cookie: yummy_cookie=choco
Set-Cookie: tasty_cookie=strawberry
Set-Cookie: id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT; Secure; HttpOnly
```
如果服务器想改变一个早先设置的 Cookie，必须同时满足四个条件：Cookie 的key、domain、path和secure都匹配。

### 2.2 HTTP 请求：Cookie 的发送
```
GET /sample_page.html HTTP/1.1
Host: www.example.org
Cookie: yummy_cookie=choco; tasty_cookie=strawberry
```
>

## 3.Cookie 的属性
### 3.1 Expires，Max-Age
```
Set-Cookie: id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT;
```
* 如果同时指定了Expires和Max-Age，那么Max-Age的值将优先生效。
* 如果两个值都没指定，即它只在本次对话存在，一旦用户关闭浏览器，浏览器就不会再保留这个 Cookie。

### 3.2 Domain，path
* __Domain__ 属性指定浏览器发出 HTTP 请求时，哪些域名要附带这个 Cookie；
    * 如果没有指定该属性，浏览器会默认将其设为当前域名，这时子域名将不会附带这个 Cookie。
    * 如果指定了domain属性，那么子域名也会附带这个 Cookie。
* __Path__ 属性指定浏览器发出 HTTP 请求时，哪些路径要附带这个 Cookie。

### 3.3 Secure，HttpOnly
* __Secure__ 属性指定浏览器只有在加密协议 HTTPS 下，才能将这个 Cookie 发送到服务器。
* __HttpOnly__ 属性指定该 Cookie 无法通过 JavaScript 脚本拿到，主要是document.cookie属性、XMLHttpRequest对象和 Request API 都拿不到该属性。


### 3.4 SameSite
Chrome 51 开始，浏览器的 Cookie 新增加了一个SameSite属性，用来防止 CSRF 攻击和用户追踪。
* Strict
* Lax
* None

### 3.5 document.cookie
* 写入<br/>
```
document.cookie = 'test1=hello';
document.cookie = 'test2=world';
```

* 删除一个现存 Cookie 的唯一方法，是设置它的expires属性为一个过去的日期。
```
document.cookie = 'fontSize=;expires=Thu, 01-Jan-1970 00:00:01 GMT';
```

参考<br/>
* Cookie<br/>
https://wangdoc.com/javascript/bom/cookie.html#expires%EF%BC%8Cmax-age
* CSRF<br/>
https://tech.meituan.com/2018/10/11/fe-security-csrf.html