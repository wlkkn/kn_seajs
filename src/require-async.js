'use strict'
define(function(require, exports, module){
  // 异步加载模块
  require.async('a', function(a){
    a.doSomething();
  });
  require.async(['b','c'], function(b, c){
    b.doSomething();
    c.doSomething();
  });
});