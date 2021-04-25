# 浏览器的工作原理

## 1.浏览器多进程架构
浏览器 -> 多进程（生产厂间） -> 多线程（员工）</br>

### 1.1 工作流程
* 启动应用程序 -> 启动一个进程 -> 分配内存 
* 关闭应用程序 -> 关闭应用程序 -> 释放内存 
* 启动应用程序 -> 启动进程（一） -> 分配内存（一）
             -> 启动进程（二） -> 分配内存（二）
             （进程一、进程二 可以通过IPC （Inter Process Communication）进行通信）

### 1.2 浏览器多进程组成
* Browser Process ：负责包括地址栏，书签栏，前进后退按钮等部分的工作；负责处理浏览器的一些不可见的底层操作，比如网络请求和文件访问；
    * UI thread ： 控制浏览器上的按钮及输入框；
    * storage thread: 控制文件等的访问；
* GPU Process
* network Process: 主要负责页面的网络资源加载，之前是作为一个模块运行在浏览器进程里面的，直至最近才独立出来，成为一个单独的进程。
* Render Process（多个）
    * 负责一个 tab 内关于网页呈现的所有事情
* Plugin Process（多个）
> sandbox(安全沙盒)：Render、Plugin Process 放在安全沙盒里，保护操作系统的恶意操作。
> IPC: 进程之间是通过 IPC 机制进行通信

### 1.3 iframe 的渲染 – Site Isolation
> Site Isolation 机制从 Chrome 67 开始默认启用。这种机制允许在同一个 Tab 下的跨站 iframe 使用单独的进程来渲染，这样会更为安全。

### 1.4 导航过程
UI thread  -> network thread(查询DNS、创建TLS连接) -> 响应返回（读取内容依据Content-Type、MIME Type -> 
Render Process（同时安全检查）

## 2. 渲染进程是如何工作的？
* 主要线程 （Main thread）
* 工作线程  (Worker thread)
* 排版线程  (Compositor thread)
* 光栅线程  (Raster thread)

1. 构建DOM
2. 加载次级资源 （图片、CSS、JS）
3. Js的下载与执行
> 遇到script标签，渲染进程停止解析HTMl，去加载执行JS。原因在于JS代码可能会改变DOM结构。
4. 计算样式
> 根据CSS计算每个元素的最终计算样式。渲染进程主线程计算每一个元素节点的最终样式值
5. 获取布局
> 通过遍历 DOM 及相关元素的计算样式，主线程会构建出包含每个元素的坐标信息及盒子大小的布局树。（display：none的元素不会出现在布局树上）
6. 绘制各个元素
> 主线程依据布局树构建绘制记录,按照顺序绘制
7. 合成帧

* 参考<br/>
https://www.infoq.cn/article/CS9-WZQlNR5h05HHDo1b













