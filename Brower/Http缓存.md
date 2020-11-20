# Http缓存
* (私有)浏览器缓存
* (共享)代理缓存

## Cache-Control
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