'use strict'
define(function(require, exports, module){
  // 获取当前模块的绝对路径
  console.dir(module.uri);
  // 当前模块的依赖
  console.dir(module.dependencies);
});