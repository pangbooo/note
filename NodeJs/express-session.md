# NodeJS Session Example Using Express Session

这个教程帮助我们去理解如何在NodeJs程序中管理Session。</br>
我们将创建一个express应用程序，同时使用 __express-session__ 的npm包。__express-session__ 是一个nodeJs包，用来在NodeJs中管理session。</br>
目前我使用express 4。之前的Express 3已弃用了许多依赖项，例如“ bodyParser”，“ logger”等。

# 目录
* 1.[Express3 和 Express4的不同点](https://github.com/pangbooo/note/blob/master/NodeJs/express-session.md#1express3-和-express4的不同点)
* 2.[在web应用中使用session的原因](https://github.com/pangbooo/note/blob/master/NodeJs/express-session.md#2在web应用中使用session的原因)
    * 2.1 [在NodeJs中储存session的方式](https://github.com/pangbooo/note/blob/master/NodeJs/express-session.md#在NodeJs中储存session的方式)
    * 2.2 [NodeJs session 连接 MySQL](https://github.com/pangbooo/note/blob/master/NodeJs/express-session.md#nodejs-session-%E8%BF%9E%E6%8E%A5-mysql)
    * 2.3 [NodeJs session 连接Memcached](https://github.com/pangbooo/note/blob/master/NodeJs/express-session.md#nodejs-session-%E8%BF%9E%E6%8E%A5memcached)
    * 2.4 [NodeJs session 储存在cookie中](https://github.com/pangbooo/note/blob/master/NodeJs/express-session.md#nodejs-session-%E5%82%A8%E5%AD%98%E5%9C%A8cookie%E4%B8%AD)
* 3.Express Session 的例子
* 4.在express-session中如何设置和获取session数据
* 5.在express-session中如何删除session数据

## 1.Express3 和 Express4的不同点
* 1) Express核心和中间件的变化。删除了对Connect和内置中间件的依赖，因此您必须自己添加中间件。
* 2) 路由的变化

Express 3 | Express 4
------------ | -------------
express.bodyParser | body-parser and multer
express.compress | compression
express.cookieSession | cookie-session
express.cookieParser | cookie-parser
express.logger | morgan
express.session | express-session
express.favicon | serve-favicon
express.responseTime | response-time
express.errorHandler | errorhandler
express.methodOverride | method-override
express.timeout | connect-timeout
express.vhost | vhost
express.csrf | csurf
express.directory | serve-index
express.static | serve-static

## 2.在web应用中使用session的原因
Session用来在应用程序的服务端储存数据。Web应用程序基于HTTP协议运行。Http是无状态的，所以应用程序不知道之前的Requset或者活动。session可以帮助解决这个问题。

### 在NodeJs中储存session的方式
*  __Cookie__
可以在cookie中储存session， 但是是储存在客户端
*  __Memoey Cache__
可以在缓存中储存session。众所周知，缓存存储在内存中。您可以使用Redis和Memcached等任何缓存模块。
*  __Database__
数据库也是存储会话数据服务器端的选项。

### NodeJs session 连接 MySQL
Node.js具有mysql模块，用于将Node.js应用程序与mysql连接。我们将安装“ mysql”软件包，并将以下代码添加到server.js文件中以创建数据库连接。
```javascript
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'dummy_db'
});

connection.connect(function(err) {
  if (err) throw err
  console.log('You are now connected...')
})
```

### NodeJs session 连接Memcached
nodejs具有connect-memcached模块，用于将Memcached与nodejs应用程序连接。我们可以使用connect-memcached将会话存储到内存中。
```javascript
var MemcachedStore = require('connect-memcached')(session);
 
app.use(cookieParser());
app.use(session({
      secret  : 'some-private-key',
      key     : 'test',
      proxy   : 'true',
      store   : new MemcachedStore({
        hosts: ['127.0.0.1:11211'], //Memcached server host url
        secret: '123, ABC' // Optionally use transparent encryption for memcache session data 
    })
}));
```

### NodeJs session 储存在cookie中
__cookie-session__ npm包，是一个基于cookie的简单会话中间件。</br>
用户session可以用cookie的两种主要方式存储：在服务器上或在客户端上。该模块将session数据存储在cookie内的客户端上，而类似express-session的模块仅将sessionID存储在cookie内的客户端上，并将session数据存储在服务器上（通常在数据库中）。
* cookie-session 在服务器不需要任何数据库，但是session数据大小不能超过浏览器的最大cookie大小限制
* cookie-session 可以简化某些负载平衡方案。
* cookie-session 可用于存储“轻量”session,查找数据库支持的辅助存储以减少数据库查找。




































参考链接
https://www.js-tutorials.com/nodejs-tutorial/nodejs-session-example-using-express-session/
https://github.com/expressjs/session/issues/281
http://expressjs.com/zh-cn/guide/behind-proxies.html
https://stackoverflow.com/questions/40381401/when-to-use-saveuninitialized-and-resave-in-express-session




