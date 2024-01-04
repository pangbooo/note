# Http 缓存

1. [缓存种类](https://github.com/pangbooo/note/blob/master/Brower/Performance/Http%E7%BC%93%E5%AD%98.md#1-%E7%BC%93%E5%AD%98%E7%A7%8D%E7%B1%BB)
   - [1.1(私有)浏览器缓存](https://github.com/pangbooo/note/blob/master/Brower/Performance/Http%E7%BC%93%E5%AD%98.md#12-%E5%85%B1%E4%BA%AB%E4%BB%A3%E7%90%86%E7%BC%93%E5%AD%98)
   - [1.2 (共享)代理缓存](https://github.com/pangbooo/note/blob/master/Brower/Performance/Http%E7%BC%93%E5%AD%98.md#12-%E5%85%B1%E4%BA%AB%E4%BB%A3%E7%90%86%E7%BC%93%E5%AD%98)
2. [缓存控制](https://github.com/pangbooo/note/blob/master/Brower/Performance/Http%E7%BC%93%E5%AD%98.md#2-%E7%BC%93%E5%AD%98%E6%8E%A7%E5%88%B6)
   - [2.1 Cache-Control](https://github.com/pangbooo/note/blob/master/Brower/Performance/Http%E7%BC%93%E5%AD%98.md#21-cache-control)
   - [2.2 Expires](https://github.com/pangbooo/note/blob/master/Brower/Performance/Http%E7%BC%93%E5%AD%98.md#22-expires)
   - [2.3 Pragma 头](https://github.com/pangbooo/note/blob/master/Brower/Performance/Http%E7%BC%93%E5%AD%98.md#22-pragma-%E5%A4%B4)
3. [新鲜度](https://github.com/pangbooo/note/blob/master/Brower/Performance/Http%E7%BC%93%E5%AD%98.md#3-%E6%96%B0%E9%B2%9C%E5%BA%A6)
   - [3.1 缓存驱逐](https://github.com/pangbooo/note/blob/master/Brower/Performance/Http%E7%BC%93%E5%AD%98.md#31-%E7%BC%93%E5%AD%98%E9%A9%B1%E9%80%90)
   - [3.2 改进资源](https://github.com/pangbooo/note/blob/master/Brower/Performance/Http%E7%BC%93%E5%AD%98.md#32-%E6%94%B9%E8%BF%9B%E8%B5%84%E6%BA%90)
4. [缓存验证](https://github.com/pangbooo/note/blob/master/Brower/Performance/Http%E7%BC%93%E5%AD%98.md#4-%E7%BC%93%E5%AD%98%E9%AA%8C%E8%AF%81)
   - [4.1 缓存验证时机](https://github.com/pangbooo/note/blob/master/Brower/Performance/Http%E7%BC%93%E5%AD%98.md#41-%E7%BC%93%E5%AD%98%E9%AA%8C%E8%AF%81%E6%97%B6%E6%9C%BA)
   - [4.2 If-Modified-Since（弱验证）](https://github.com/pangbooo/note/blob/master/Brower/Performance/Http%E7%BC%93%E5%AD%98.md#42-if-modified-since%E5%BC%B1%E9%AA%8C%E8%AF%81)
   - [4.3 ETag（强验证）](https://github.com/pangbooo/note/blob/master/Brower/Performance/Http%E7%BC%93%E5%AD%98.md#43-etag%E5%BC%BA%E9%AA%8C%E8%AF%81)
5. [请求折叠](https://github.com/pangbooo/note/blob/master/Brower/Performance/Http%E7%BC%93%E5%AD%98.md#5-%E8%AF%B7%E6%B1%82%E6%8A%98%E5%8F%A0)
6. [常见的缓存模式](https://github.com/pangbooo/note/blob/master/Brower/Performance/Http%E7%BC%93%E5%AD%98.md#6-%E5%B8%B8%E8%A7%81%E7%9A%84%E7%BC%93%E5%AD%98%E6%A8%A1%E5%BC%8F)

- [6.1 默认设置](https://github.com/pangbooo/note/blob/master/Brower/Performance/Http%E7%BC%93%E5%AD%98.md#61-%E9%BB%98%E8%AE%A4%E8%AE%BE%E7%BD%AE)
- [6.2 缓存破坏](https://github.com/pangbooo/note/blob/master/Brower/Performance/Http%E7%BC%93%E5%AD%98.md#62-%E7%BC%93%E5%AD%98%E7%A0%B4%E5%9D%8F)
- [6.3 验证响应](https://github.com/pangbooo/note/blob/master/Brower/Performance/Http%E7%BC%93%E5%AD%98.md#63-%E9%AA%8C%E8%AF%81%E5%93%8D%E5%BA%94)
- [6.4 主资源](https://github.com/pangbooo/note/blob/master/Brower/Performance/Http%E7%BC%93%E5%AD%98.md#64-%E4%B8%BB%E8%B5%84%E6%BA%90)

> 通过复用以前获取的资源，可以显著提高网站和应用程序的性能。Web 缓存减少了等待时间和网络流量，因此减少了显示资源表示形式所需的时间。通过使用 HTTP 缓存，变得更加响应性。

## 1. 缓存种类

### 1.1 (私有)浏览器缓存

私有缓存是绑定到特定客户端的缓存——通常是浏览器缓存。由于存储的响应不与其他客户端共享，因此私有缓存可以存储该用户的个性化响应。
如果响应包含个性化内容并且你只想将响应存储在私有缓存中，则必须指定 private 指令。

```
Catch-Control: private
```

> 请注意，如果响应具有 Authorization 标头，则不能将其存储在私有缓存

### 1.2 共享缓存

共享缓存位于客户端和服务器之间，可以存储能在用户之间共享的响应。共享缓存可以进一步细分为 **代理缓存** 和 **托管缓存**。

## 2. 缓存控制

### 2.1 Cache-Control

**HTTP/1.1** 定义的 Cache-Control 头用来区分对缓存机制的支持情况， 请求头和响应头都支持这个属性。通过它提供的不同的值来定义缓存策略。

- public/private(默认值)

- no-store

  - 不缓存。
  - 缓存中不得存储任何关于客户端请求和服务端响应的内容。每次由客户端发起的请求都会下载完整的响应内容。
  - 如果已经为特定 URL 存储了旧响应，则返回 no-store 不会阻止旧响应被重用。（no-cache 指令将强制客户端在重用任何存储的响应之前发送验证请求。）

- no-cache

  - 缓存但强制重新验证。
  - 每次有请求发出时，缓存会将此请求发到服务器（译者注：该请求应该会带有与本地缓存相关的验证字段），服务器端会验证请求中所描述的缓存是否过期，若未过期（注：实际就是返回 304），则缓存才使用本地缓存副本。

- max-age

  - 表示资源能够被缓存（保持新鲜）的最大时间

- must-revalidate
  - 当使用了 "must-revalidate" 指令，那就意味着缓存在考虑使用一个陈旧的资源时，必须先验证它的状态，已过期的缓存将不被使用。详情看下文关于缓存校验的内容。

```
Cache-Control: private;

Cache-Control: public;

Cache-Control: no-store;

Cache-Control: no-cache;

Cache-Control: max-age=31536000;

Cache-Control: must-revalidate
```

### 2.2 Expires

在 HTTP/1.0 中，有效期是通过 Expires 标头来指定的。

Expires 标头使用明确的时间而不是通过指定经过的时间来指定缓存的生命周期。

```
Expires: Tue, 28 Feb 2022 22:22:22 GMT
```

### 2.3 Pragma 头

Pragma 是 **HTTP/1.0** 标准中定义的一个 header 属性，请求中包含 Pragma 的效果跟在头信息中定义 Cache-Control: no-cache 相同，但是 HTTP 的响应头没有明确定义这个属性，所以它不能拿来完全替代 **HTTP/1.1** 中定义的 Cache-control 头。 **通常定义 Pragma 以向后兼容基于 HTTP/1.0 的客户端。**

```
Pragma: no-cache;
```

## 3. 新鲜度

### 3.1 缓存驱逐

驱逐算法用于将陈旧的资源（缓存副本）替换为新鲜的。

1. 第一次发送请求

- server response

```
Cache-Control: max-age=31536000;
// 或 Expires: Wed, 21 Oct 2015 07:28:00 GMT
// 或 Last-Modified: day-name, day month year hour: minute: second GMT
```

> Cache-Control: max-age -> Expires -> Last-Modified 优先级从高到低。

2. 第二次发送请求: cache 检查 max-age 是否过期
   - fresh(**强缓存**)： 使用缓存资源返回 200 状态码</br>
   - stale(**协商缓存**)
     - 判断 **ETag**
       1. 存在 ETag: cache 添加一个 **If-None-Match** 请求头，发送请求 server
       2. 不存在 ETag: 请求中带上 **If-Modified-Since** 来验证缓存，发送请求 server
       3. 结果: </br>
          没过期 304 (Not Modified)（该响应不会有带有实体信息）</br>
          过期返回 200 新的资源

### 3.2 改进资源

不频繁更新的文件会使用特定的命名方式：在 URL 后面（通常是文件名后面）会加上版本号。

## 4. 缓存验证

过时的响应不会立即被丢弃。HTTP 有一种机制，可以通过询问源服务器将陈旧的响应转换为新的响应。这称为验证，有时也称为重新验证。<br />

```
// 1. 弱验证
    Response Header: Last-Modified
    Request Header: If-Modified-Since


// 2. 强验证
    Response Header: ETag
    Request Header: If-None-Match

```

### 4.1 缓存验证时机

1. 浏览器刷新
2. `Cache-control: must-revalidate`<br/>
   当缓存的文档过期后，需要进行缓存验证或者重新获取资源。只有在服务器返回 **强校验器或者弱校验器** 时才会进行验证。

### 4.2 If-Modified-Since（弱验证）

弱验证是因为它只能精确到一秒 。

- 响应头 **Last-Modified** <br />
  以下响应在 22:22:22 生成，max-age 为 1 小时，因此你知道它在 23:22:22 之前是有效的。

```
HTTP/1.1 200 OK
Content-Type: text/html
Content-Length: 1024
Date: Tue, 22 Feb 2022 22:22:22 GMT
Last-Modified: Tue, 22 Feb 2022 22:00:00 GMT
Cache-Control: max-age=3600

<!doctype html>
…
```

到 23:22:22 时，响应会过时并且不能重用缓存。因此，下面的请求显示客户端发送带有 `If-Modified-Since` **请求标头**的请求，以询问服务器自指定时间以来是否有任何的改变。

```
GET /index.html HTTP/1.1
Host: example.com
Accept: text/html
If-Modified-Since: Tue, 22 Feb 2022 22:00:00 GMT

```

如果内容自指定时间以来没有更改，服务器将响应 `304 Not Modified`。<br />
由于此响应仅表示“没有变化”，因此没有响应主体——只有一个状态码——因此传输大小非常小。

```
HTTP/1.1 304 Not Modified
Content-Type: text/html
Date: Tue, 22 Feb 2022 23:22:22 GMT
Last-Modified: Tue, 22 Feb 2022 22:00:00 GMT
Cache-Control: max-age=3600
```

收到该响应后，客户端将存储的过期响应恢复为有效的，并可以在剩余的 1 小时内重复使用它。<br />
服务器可以从操作系统的文件系统中获取修改时间，这对于提供静态文件的情况来说是比较容易做到的。但是，也存在一些问题；例如，时间格式复杂且难以解析，分布式服务器难以同步文件更新时间。<br />

为了解决这些问题，ETag 响应标头被标准化作为替代方案。

### 4.3 ETag（强验证）

**ETag 响应标头**的值是服务器生成的任意值。服务器对于生成值没有任何限制，因此服务器可以根据他们选择的任何方式自由设置值——例如主体内容的哈希或版本号。<br />

如果 ETag 标头使用了 hash 值，index.html 资源的 hash 值是 deadbeef，响应如下：

```
HTTP/1.1 200 OK
Content-Type: text/html
Content-Length: 1024
Date: Tue, 22 Feb 2022 22:22:22 GMT
ETag: "deadbeef"
Cache-Control: max-age=3600

<!doctype html>
…
```

如果该响应是陈旧的，则客户端获取缓存响应的 ETag 响应标头的值，并将其放入 `If-None-Match` **请求标头中**，以询问服务器资源是否已被修改

```
GET /index.html HTTP/1.1
Host: example.com
Accept: text/html
If-None-Match: "deadbeef"
```

- 如果服务器为请求的资源确定的 ETag 标头的值与请求中的 If-None-Match 值相同，则服务器将返回 304 Not Modified。
- 如果服务器确定请求的资源现在应该具有不同的 ETag 值，则服务器将其改为 200 OK 和资源的最新版本进行响应。

## 5. 请求折叠

共享缓存主要位于源服务器之前，旨在减少到源服务器的流量。
![request-collapse](https://github.com/pangbooo/note/blob/master/imgs/request-collapse.png)

## 6. 常见的缓存模式

### 6.1 默认设置

如上所述，缓存的默认行为（即对于没有 Cache-Control 的响应）不是简单的“不缓存”，而是根据所谓的“启发式缓存”进行隐式缓存。<br />
为了避免这种启发式缓存，最好显式地为所有响应提供一个默认的 Cache-Control 标头。

```
Cache-Control: no-cache, private
```

### 6.2 缓存破坏

最适合缓存的资源是静态不可变文件，其内容永远不会改变。而对于会变化的资源，通常的最佳实践是每次内容变化时都改变 URL，这样 URL 单元可以被缓存更长的时间。
你可以使用包含基于版本号或哈希值的更改部分的 URL 来提供 JavaScript 和 CSS。一些方法如下所示。

```
# version in filename
bundle.v123.js

# version in query
bundle.js?v=123

# hash in filename
bundle.YsAIAAAA-QG4G6kCMAMBAAAAAAAoK.js

# hash in query
bundle.js?v=YsAIAAAA-QG4G6kCMAMBAAAAAAAoK
```

由于缓存根据它们的 URL 来区分资源，因此如果在更新资源时 URL 发生变化，缓存将不会再次被重用。

```html
<script src="bundle.v123.js"></script>
<link rel="stylesheet" href="build.v123.css" />
<body>
  hello
</body>
```

### 6.3 验证响应

- Response

```
# bundle.v123.js
200 OK HTTP/1.1
Content-Type: application/javascript
Content-Length: 1024
Cache-Control: public, max-age=31536000, immutable
Last-Modified: Tue, 22 Feb 2022 20:20:20 GMT
ETag: YsAIAAAA-QG4G6kCMAMBAAAAAAAoK
```

> 此外，可以添加 immutable 以防止重新加载时验证。

### 6.4 主资源

与子资源不同，主资源不能使用缓存破坏，因为它们的 URL 不能像子资源 URL 一样被修饰。如果存储以下 HTML 本身，即使在服务器端更新内容，也无法显示最新版本。

```html
<script src="bundle.v123.js"></script>
<link rel="stylesheet" href="build.v123.css" />
<body>
  hello
</body>
```

```
200 OK HTTP/1.1
Content-Type: text/html
Content-Length: 1024
Cache-Control: no-cache, private
Last-Modified: Tue, 22 Feb 2022 20:20:20 GMT
ETag: AAPuIbAOdvAGEETbgAAAAAAABAAE
Set-Cookie: __Host-SID=AHNtAyt3fvJrUL5g5tnGwER; Secure; Path=/; HttpOnlys
```

## 参考

https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Caching
https://github.com/peng-yin/note/issues/69
