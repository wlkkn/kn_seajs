seajs.config({
  // 别名配置object
  // 当模块标识很长时，可以使用alias来简化，简化后直接var $ = require('jquery')即可
  alias: {
    'jquery': 'jquery/1.10.1/jquery',
    'seajs-debug': 'seajs/2.2.0/sea-debug'
  },
  // 路径设置object
  // 当目录比较深，或者需要跨目录调用模块时，使用paths来简化
  paths: {
    'under': 'http://underscorejs.org'
  },
  // 变量object
  // 有时模块路径需要在运行时才能确定，如var lang = require('./i18n/{locale}.js')
  vars: {
    'locale': 'zh-cn'
  },
  // 映射设置array
  // 用于对模块路径进行修改，用于路径转换，在线调试等，下面将在线路径影射到了本地
  map: [
    ['http://example.com/js/app/', 'http://localhost/js/app/']
  ],
  // 预加载项array
  // 可以再普通模块加载前，提前加载并初始化好指定模块，下面在老浏览器中，提前加载好ES5和json模块。preload的配置需要等待use时才加载
  preload: [
    Function.prototype.bind ? '' : 'es5-safe',
    this.JSON ? '' : 'json'
  ],
  // 调试模式boolean
  // 为true时，加载器不会删除动态插入的script标签
  debug: true,
  // 基础路径string
  // 一般不配置，将seajs放到合适的路径会更简单一些
  base: './src/',
  // 文件编码string
  // 获取模块时，<script>或者<link>标签的charset属性。默认是utf8
  charset: 'utf8'
});
seajs.use('./src/main',function(main){
  main.doSomeing();
// 或者直接seajs.use('./src/main');
/*
如果如果某些操作要确保在 DOM ready 后执行，需要使用 jquery 等类库来保证，比如
seajs.use(['jquery', './main'], function($, main) {
  $(document).ready(function() {
    main.init();
  });
});
*/
});
/*
1、多次配置和自动合并，即合并不存在的项，对存在的进行覆盖
2、也可以在模块中配置
*/