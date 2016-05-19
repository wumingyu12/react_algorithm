react 使用
==================
[参考该项目](https://github.com/zhangmengxue/React-Learning)
参考项目 https://github.com/wumingyu12/react_materialUiDemo

网页使用方法
=======================
![](https://raw.githubusercontent.com/wumingyu12/react_algorithm/master/README%E7%94%A8%E5%88%B0%E7%9A%84%E6%88%AA%E5%9B%BE/1.png)
![](https://raw.githubusercontent.com/wumingyu12/react_algorithm/master/README%E7%94%A8%E5%88%B0%E7%9A%84%E6%88%AA%E5%9B%BE/2.png)
![](https://raw.githubusercontent.com/wumingyu12/react_algorithm/master/README%E7%94%A8%E5%88%B0%E7%9A%84%E6%88%AA%E5%9B%BE/3.png)
![](https://raw.githubusercontent.com/wumingyu12/react_algorithm/master/README%E7%94%A8%E5%88%B0%E7%9A%84%E6%88%AA%E5%9B%BE/4.png)
概括
----
1. 使用了material-ui

2.使用https://github.com/tejitak/react-state-animation 做state的动画，支持promise链式调用
```javascript
    //单个动画
   this._animate.linearInOut('x', 2/*end value*/, 1000/*duration(ms)*/)
   //组合动画,同时执行
    this._animate.linearInOut('bucket_one', 2/*end value*/, 1000/*duration(ms)*/)
    this._animate.linearInOut('bucket_two', 2/*end value*/, 1000/*duration(ms)*/)
    this._animate.linearInOut('bucket_three', 2/*end value*/, 1000/*duration(ms)*/)

```
3.三个水桶的倒水问题的算法用了深度优先搜索算法，具体可以看./algorithm/bucket_algorithm.js
  详细的算法说明可以看书本《算法乐趣》

2. 支持es6的webpack.config.js中指明js的代码加载器用babel(注意不要用babel 6,webpack的配置方式是不同的)，package.json里面也有这个babel模块

##### webpack.config.js
```javascript
	module: {
        loaders: [
            { test: /\.js?$/, loaders: ['react-hot', 'babel'], exclude: /node_modules/ },
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
            { test: /\.css$/, loader: "style!css" },
            {test: /\.less/,loader: 'style-loader!css-loader!less-loader'}
        ]
    },
```

运行
-----

1. 运行 npm install 安装依赖包

2. 运行 npm start (用webpack-dev-server)

3. 用浏览器进入 http://localhost:8080/webpack-dev-server/

编译最终结果
-------------
修改webpack.config.js里面的入口

**没修改前**
```javascript
    entry: [
      'webpack/hot/only-dev-server',
      "./js/app.js"
    ],
```

**修改后**
```javascript
    entry: [
      "./js/app.js"
    ],
```

去掉后运行webpack会在当前目录下的build生成一个bundle.js文件就是index.html需要。
