# Express中管理Session（express-session） 
这个教程帮助我们去理解如何在NodeJs程序中管理Session。我们将创建一个express应用程序，同时使用 __express-session__ 的npm包。__express-session__ 是一个nodeJs包，用来在NodeJs中管理session。目前我使用express 4。之前的Express 3已弃用了许多依赖项，例如“ bodyParser”，“ logger”等。</br>
</br>
阅读文章之前，最好已经熟知cookie基础知识，可以参考https://wangdoc.com/javascript/bom/cookie.html

# 目录
* 1.[Express3 和 Express4的不同点](https://github.com/pangbooo/note/blob/master/NodeJs/express-session.md#1express3-和-express4的不同点)
* 2.[在web应用中使用session的原因](https://github.com/pangbooo/note/blob/master/NodeJs/express-session.md#2在web应用中使用session的原因)
    * 2.1 [在NodeJs中储存session的方式](https://github.com/pangbooo/note/blob/master/NodeJs/express-session.md#在NodeJs中储存session的方式)
    * 2.2 [NodeJs session 连接 MySQL](https://github.com/pangbooo/note/blob/master/NodeJs/express-session.md#nodejs-session-%E8%BF%9E%E6%8E%A5-mysql)
    * 2.3 [NodeJs session 连接Memcached](https://github.com/pangbooo/note/blob/master/NodeJs/express-session.md#nodejs-session-%E8%BF%9E%E6%8E%A5memcached)
    * 2.4 [NodeJs session 储存在cookie中](https://github.com/pangbooo/note/blob/master/NodeJs/express-session.md#nodejs-session-%E5%82%A8%E5%AD%98%E5%9C%A8cookie%E4%B8%AD)
* 3.Express Session 的例子
* 4.[在express-session中如何设置和获取session数据](https://github.com/pangbooo/note/blob/master/NodeJs/express-session.md#4在express-session中如何设置和获取session数据)
* 5.[在express-session中如何删除session数据](https://github.com/pangbooo/note/blob/master/NodeJs/express-session.md#5在express-session中如何删除session数据)
* 6.[express-session常用参数](https://github.com/pangbooo/note/blob/master/NodeJs/express-session.md#6express-session常用参数)

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
可以在cookie中储存session(sessionId/全部session数据)， 但是是储存在客户端
*  __Memoey Cache__
可以在缓存中储存session。众所周知，缓存存储在内存中。您可以使用Redis和Memcached等任何缓存模块。
*  __Database__
数据库也是存储会话数据服务器端的选项。

### NodeJs session 储存在cookie中
用户session可以用cookie的两种主要方式存储：在服务器上或在客户端上。</br>
__cookie-session__ npm包，是一个基于cookie的简单会话中间件。该模块将session数据存储在cookie内的客户端上。</br>
而类似express-session的模块仅将sessionID存储在cookie内的客户端上，并将session数据存储在服务器上（通常在数据库中）。</br>
</br>
* cookie-session 在服务器不需要任何数据库，但是session数据大小不能超过浏览器的最大cookie大小限制
* cookie-session 可以简化某些负载平衡方案。
* cookie-session 可用于存储“轻量”session,查找数据库支持的辅助存储以减少数据库查找。


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


## 3.Express Session 的例子
## 4.在express-session中如何设置和获取session数据
创建rest 调用来设置session，你可以在之后的调用中使用相同的方法去设置session。
```javascript
var sessionData;
app.get('/set_session', function(req, res){
  sessionData = req.session;
  sessionData.user = {};
  let userName = 'a';
  sessionData.user.username = userName;
  sessionData.user.salary = random.int(55,956);

  res.json(sessionData.user);
})

```

## 5.在express-session中如何删除session数据
我们将使用express session ```destroy（）``` 方法从变量中删除session，即```req.session = undefined; res.sessionID = undefined```。
如果找不到```session```数据：您将获得```err```，否则将发送“成功销毁”消息。</br>
</br>
同时需要设置```res.clearCookie(cookieName, obj)``` 清除浏览器端 cookie。</br>
__注意:__ 第二个参数```obj```，如```{path: '/'，HttpOnly: true}``` 需要与设置时候保持一致(除了 ```expires``` 和 ```maxAge```)，才可以清除成功这个cookie。
</br>

express-session产生的sessionID 会储存在浏览器cookie，默认名 connect.sid 中。

```javascript
app.get('destorysession', function(req,res){
  sessionData = req.session;

  sessionData.destroy(function(err){
    if(err){
      res.json('Error destorying session')
    }else{
      res.json('Session destroy successfully')
    }
  })
});

router.get("/logout", (req, res) => {
    req.session.destroy(function(){ 
        //The name of the session ID cookie to set in the response (and read from in the request).
        //The default value is 'connect.sid'.
        res.clearCookie('connect.sid', {path: '/'})
        res.redirect(');
    });
});

```

## 6.express-session常用参数
* ### store
会话存储实例，默认为新的MemoryStore实例。

* ### saveUninitialized
当客户端发起一个HTTP请求，并且当前的请求没有包含session cookie，这个情况下，```express-session```将会创建一个新的session。当创建一个新的session，会发生如下几件事：</br>
1. 生成一个唯一的的session id
2. 将生成的session id 储存到session cookie中（随后的客户端request，可以根据当前session id确认）
3. 创建一个空的session object（```req.session```）
4. 根据之前所设置的```saveUninitialized```，在请求结束的时候，这个session对象将会储存在session store中（比如数据库，MemoryStore 缓存中）

如果在request的周期里面，session object并没有发生改变，那么在请求结束时,如果```saveUninitialized```设置为 __false__, session object（当前仍然是空的，应为没有修改）将不会保存在session store中。</br>
</br>
这样做的会阻止储存很多空的session object在session store中。由于没有什么可存储的，因此在请求结束时会“忘记”该会话。</br>
</br>
那么在什么时候需要开启这个选项，```saveUninitialized```设置为 __true__ 呢？比如，当你想要确认返回进入的访客的时候。你可以根据他储存的session cookie（包含了一个唯一的id）来认出这个访客。

* ### resave
可能必须为不支持“ touch”命令session store会话存储启用此功能。这样做是告诉session store，特定session仍处于active。开启 __true__选项是必选的，因为某些存储将在一段时间后删除空闲（未使用）的session。</br>
</br>
如果session stroe 驱动没有使用```touch```方法，那么必须开启```resave```,这样当session在请求中没有发生变化，也会在store中更新，使他处于活跃状态不被删除</br>
</br>
因此，是否需要启用此选项完全取决于您使用的session store。

* ### Session.touch()
更新```.maxAge```属性，一般情况下不需要调用，因为sessionmiddleware会帮你做这件事

* ### cookie.secure 
指定Secure Set-Cookie属性的布尔值。如果为 __true__，则设置安全属性，否则不设置。默认情况下，未设置安全属性。</br>
</br>
将其设置为true时请注意，因为如果浏览器没有HTTPS连接，则兼容的客户端将来不会将cookie发送回服务器。</br>
</br>
请注意，安全：true是推荐的选项。但是，它需要一个启用了https的网站，即，HTTPS对于安全cookie是必需的。如果设置了安全性，并且您通过HTTP访问站点，则不会设置cookie。如果您的node.js位于代理之后，并且使用secure：true，则需要在express中设置“ trust proxy”：

```javascript
var session = require('express-session')
var app = express();
var sess = {
  secret: 'keyboard cat',
  cookie: {}
}

if( app.get('env) === 'production' ){
  app.set('trust proxy', 1); 
  sess.cookie.secure = true
}

app.use(session(sess))
```

参考链接</br>
https://www.js-tutorials.com/nodejs-tutorial/nodejs-session-example-using-express-session/
https://github.com/expressjs/session/issues/281
http://expressjs.com/zh-cn/guide/behind-proxies.html
https://stackoverflow.com/questions/40381401/when-to-use-saveuninitialized-and-resave-in-express-session




