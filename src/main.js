'use strict'
/*
 * define:全局函数，用来定义模块
 * @param {[string]} id   [模块标识，可省略]
 * @param {[array]}  deps [模块依赖，可省略]
 * @param {[function]} factory [模块的构造方法]
*/
/*
  * require:接受模块标识为唯一参数，用来获取其他模块提供的接口
  * @param {[string]} id [模块标识，一般为js文件名]
*/
// 省略后的id和deps可通过构建工具自动生成
define(function(require, exports, module){
  var obj = require('./define-obj');
  var str = require('./define-string');
  var requireResolve = require('./require-resolve');
  var moduleEg = require('./module-eg');
  var $ = require('jquery');
  var sea = require('seajs-debug');
  console.dir(str);
  // define.cmd 一个空对象，用来判断当前页面是否有CMD模块加载器
  if(typeof define === 'function' && define.cmd){
    console.dir('seajs exist');
  }
  exports.doSomeing = function(){
    console.dir('main已经加载');
  }
});
/*
require方法的注意事项：
1、define构造方法的第一个参数必须为require,不可改名，如define(function(req){})是错的
2、不可重命名require或者为require重定义
3、require的参数必须是字符串直接量，如require(myMoudle),require("my"+"moudle"),require("MY-MODULE".toLowerCase())都是错的
4、有时希望动态依赖模块
if(){
  require('a');
}else{
  require('b');
}
此时加载器会把这两个模块文件都下载下来，此时推荐使用require.async来进行条件加载
*/