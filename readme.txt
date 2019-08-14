vue/cli3目录结构：
1.src:源码目录
	|components:vue公共组件
	|router:vue的路由管理
	|App.vue:页面入口文件
	|main.js程序入口文件，加载各种公共组件
2.public:存放静态文件[图片、json数据]
    |favicon.ico:图标文件
	|index.html:入口页面
3.vue.config.js:可选的配置文件，包含大部分vue的配置
4..babelrc:ES6语法编译配置
5..editorconfig:定义代码格式
6..gitignore:git上传需要忽略的文件格式
7..postcsssrc:postcss配置文件
8.README.md:项目说明
9.package.json:项目基本信息及依赖包信息


express搭建服务端
1.全局安装express-generator
npm install express --save -g
npm install express-generator --save -g 


配置错误：
1.eslint检测报错error Expected linebreaks to be 'LF' but found 'CRLF' linebreak-style
在.eslintrc文件 rules 里面 配置 "linebreak-style": [0 ,"error", "windows"], //允许windows开发环境

2.Unary operator '++' used


其他错误：
<el-input type="password" placeholder="请输入密码" v-model="user.password" />
v-model不能简写:model不然不能输入v-model通常用于input的双向数据绑定 <input v-model="parentMsg">，也可以实现子组件到父组件数据的双向数据绑定：
:model是v-bind:model的缩写,<child :model="msg"></child>这种只是将父组件的数据传递到了子组件，并没有实现子组件和父组件数据的双向绑定。当然引用类型除外，子组件改变引用类型的数据的话，父组件也会改变的。

