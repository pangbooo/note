# Cookie
1. [概述](https://github.com/pangbooo/note/blob/master/Brower/Cookie.md#1%E6%A6%82%E8%BF%B0)
2. [Cookie 与 HTTP 协议](https://github.com/pangbooo/note/blob/master/Brower/Cookie.md#2cookie-%E4%B8%8E-http-%E5%8D%8F%E8%AE%AE)
3. [Cookie 的属性](https://github.com/pangbooo/note/blob/master/Brower/Cookie.md#3cookie-%E7%9A%84%E5%B1%9E%E6%80%A7)

## 1.概述
HTTP Cookie（也叫 Web Cookie 或浏览器 Cookie）是服务器发送到用户浏览器并保存在本地的一小块数据。浏览器会存储 cookie 并在下次向同一服务器再发起请求时携带并发送到服务器上。


## 2.Cookie 与 HTTP 协议
> Cookie 由 HTTP 协议生成，也主要是供 HTTP 协议使用。
### 2.1 HTTP Response：Cookie 的生成
通过```Set-Cookie```响应头设置Cookie
```
HTTP/1.0 200 OK
Content-type: text/html
Set-Cookie: yummy_cookie=choco
Set-Cookie: tasty_cookie=strawberry
Set-Cookie: id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT; Secure; HttpOnly
```
现在，对该服务器发起的每一次新请求，浏览器都会将之前保存的 Cookie 信息通过 Cookie 请求头部再发送给服务器。

### 2.2 HTTP 请求：Cookie 的发送
浏览器向服务器发送 HTTP 请求时，每个请求都会带上相应的 Cookie。也就是说，把服务器早前保存在浏览器的这段信息，再发回服务器。这时要使用 HTTP 头信息的Cookie字段。
```
GET /sample_page.html HTTP/1.1
Host: www.example.org
Cookie: yummy_cookie=choco; tasty_cookie=strawberry
```
>

## 3.Cookie 的属性
每个 Cookie 都有以下几方面的元数据。
* Cookie 的名字
* Cookie 的值（真正的数据写在这里面）
* 到期时间（超过这个时间会失效）
* 所属域名（默认为当前域名）
* 生效的路径（默认为当前网址）
> 浏览器的同源政策规定，两个网址只要域名相同，就可以共享 Cookie（参见《同源政策》一章）。注意，这里不要求协议相同。也就是说，http://example.com 设置的 Cookie，可以被https://example.com读取。
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
* __Path__ 指定了一个 URL 路径，该 URL 路径必须存在于请求的 URL中，以便发送 Cookie 标头。以字符 %x2F (“/”) 作为路径分隔符，并且子路径也会被匹配。

    * 设置 Path=/docs，则以下地址都会匹配：
        * /docs
        * /docs/
        * /docs/Web/
        * /docs/Web/HTTP

    * 但是这些请求路径不会匹配以下地址：
        * /
        * /docsets
        * /fr/docs



### 3.3 Secure，HttpOnly
* __Secure__ 属性指定浏览器只有在加密协议 HTTPS 下，才能将这个 Cookie 发送到服务器。
* __HttpOnly__ 属性指定该 Cookie 无法通过 JavaScript 脚本拿到，主要是document.cookie属性、XMLHttpRequest对象和 Request API 都拿不到该属性。


### 3.4 SameSite
SameSite 属性允许服务器指定是否/何时通过跨站点请求发送
* Strict (cookie只发送到他的来源站点)
* Lax （SameSite的默认值。和Strick相似，只在用户导航到cookie的源站点是发送cookie）
* None（指定浏览器会在同站请求和跨站请求发送cookie，单必须设置属性```Secure```）

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

## 4. 安全
缓解涉及 Cookie 的攻击的方法：

* 使用 HttpOnly 属性可防止通过 JavaScript 访问 cookie 值。
* 用于敏感信息（例如指示身份验证）的 Cookie 的生存期应较短，并且 SameSite 属性设置为 Strict 或 Lax。（请参见上方的 SameSite 属性。）在支持 SameSite 的浏览器中，这样做的作用是确保不与跨站点请求一起发送身份验证 cookie。因此，这种请求实际上不会向应用服务器进行身份验证。

参考<br/>
* Cookie<br/>
https://wangdoc.com/javascript/bom/cookie.html#expires%EF%BC%8Cmax-age
* CSRF<br/>
https://tech.meituan.com/2018/10/11/fe-security-csrf.html