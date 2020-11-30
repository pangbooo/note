#Manifest
* 业务代码
* 你的源码会依赖的任何第三方的 library 或 "vendor" 代码。
* webpack 的 runtime 和 manifest，管理所有模块的交互。

## runtime
runtime，以及伴随的 manifest 数据，主要是指：在浏览器运行过程中，webpack 用来连接模块化应用程序所需的所有代码。</br>
它包含：在模块交互时，连接模块所需的加载和解析逻辑。包括：已经加载到浏览器中的连接模块逻辑，以及尚未加载模块的延迟加载逻辑。

## manifest
manifest 数据用来管理所有所需模块之间的交互。</br>
manifest数据 -> runtime -> 模块标识符(module identifier) -> 模块