const counter = require('./counter');
const counter2 = require('./counter');
const counter3 = require('./counter');

console.log('counter', counter.count);
counter.increment();
console.log('counter2', counter.count);

/* 
CommonJS
1.  同步阻塞性地加载模块：在执行代码过程中遇到 require(X) 时会停下来等待，直到新的模块加载完成之后再继续执行接下去的代码。
2.  cache： 在读取模块的时候会优先判断是否已在缓存中，如果在，直接返回 module.exports；如果不在，则会进入模块查找的流程，找到模块之后再写入 （多次require， 只会执行一次）
*/ 