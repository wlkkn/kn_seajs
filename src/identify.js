'use strict'
/*
1、顶级标识始终相对 base 基础路径解析。（不以.和/开头的）
2、绝对路径和跟路径(以/开头)始终相对当前页面解析。
3、require和require.async中的相对路径相对当前模块路径来解析
4、seajs.use中的相对路径始终相对当前页面来解析
*/
define(function(require, exports, module){
  // 相对标识
  /* 以.开头，只出现在define的factory方法里面，永远相对当前模块的url来解析
  */
  // 在 http://example.com/js/a.js 的 factory 中：
  require.resolve('./b');
  // => http://example.com/js/b.js

  // 在 http://example.com/js/a.js 的 factory 中：
  require.resolve('../c');
  // => http://example.com/c.js


  // 顶级标识
  /* 顶级标识不以.或/开头，相对模块系统的基础路径来解析
  */
  // 假设 base 路径是：http://example.com/assets/

  // 在模块代码里：
  require.resolve('gallery/jquery/1.9.1/jquery');
  // => http://example.com/assets/gallery/jquery/1.9.1/jquery.js

  // 系统的基础路径即base路径，与sea.js的访问路径有关
  /*
  如果 sea.js 的访问路径是：
    http://example.com/assets/sea.js
  则 base 路径为：
    http://example.com/assets/
  */
  // 当sea.js的访问路径中含有版本号时，base不会包含seajs/x.y.z,这样很方便sea.js有多个版本
  /*
  如果 sea.js 的路径是：
  http://example.com/assets/seajs/1.0.0/sea.js
  则 base 路径是：
  http://example.com/assets/
  */

  // 也可以通过seajs.config手工配置base
  seajs.confit({
    base: 'http://code.jquery.com'
  });
  // 在模块里
  require.resolve('jquery');
    // => http://code.jquery.com/jquery.js


  // 普通路径
  // 除了相对和顶级标识之外的标识都是普通路径。普通路径的解析规则，和 HTML 代码中的 <script src="..."></script> 一样，会相对当前页面解析。
  /*
  // 假设当前页面是 http://example.com/path/to/page/index.html
  // 绝对路径是普通路径：
  require.resolve('http://cdn.com/js/a');
  // => http://cdn.com/js/a.js
  // 根路径是普通路径：
  require.resolve('/js/b');
  // => http://example.com/js/b.js
  // use 中的相对路径始终是普通路径：
  seajs.use('./c');
    // => 加载的是 http://example.com/path/to/page/c.js
  seajs.use('../d');
    // => 加载的是 http://example.com/path/to/d.js
  */


  // 文件后缀
  // Sea.js 在解析模块标识时， 除非在路径中有问号（?）或最后一个字符是井号（#），否则都会自动添加 JS 扩展名（.js）。如果不想自动添加扩展名，可以在路径末尾加上井号（#）
  // ".js" 后缀可以省略：
  require.resolve('http://example.com/js/a');
  require.resolve('http://example.com/js/a.js');
    // => http://example.com/js/a.js

  // ".css" 后缀不可省略：
  require.resolve('http://example.com/css/a.css');
    // => http://example.com/css/a.css

  // 当路径中有问号（"?"）时，不会自动添加后缀：
  require.resolve('http://example.com/js/a.json?callback=define');
    // => http://example.com/js/a.json?callback=define

  // 当路径以井号（"#"）结尾时，不会自动添加后缀，且在解析时，会自动去掉井号：
  require.resolve('http://example.com/js/a.json#');
    // => http://example.com/js/a.json
});