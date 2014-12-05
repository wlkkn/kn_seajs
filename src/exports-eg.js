'use strict'
define(function(require, exports, module){
  // 方式一：通过exports对象
  // 向外提供foo属性
  exports.foo = 'bar';
  // 向外提供doSomething方法
  exports.doSomething = function(){};

  // 方式二，通过return
  return {
    foo: 'bar',
    doSomething: function(){}
  };


  // 方式三，module.exports
  module.exports = {
    foo: 'bar',
    doSomething: function(){}
  };
});

// 如果return语句是模块中唯一代码，方式二可简化为
define({
  foo: 'bar',
  doSomething: function(){}
});