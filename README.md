## tip：设置域名映射
为了获取跨域 Cookie JWT,需要设置域名映射  
修改本地hosts文件（位于C:\Windows\System32\drivers\etc中）

```code
127.0.0.1	 mall.card.nmgjoin.com
```

## 运行项目

```bash

# 安装依赖
npm install

# 建议不要用 cnpm 安装 会有各种诡异的bug 可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev
```

## 后台请求接口设置
修改文件 vue.config.js  
devServer.proxy.target 属性到你的本地服务器 或者外网服务器


## api 方法命名规范

方法名称 | http method | 含义 
--- |---|---|
Get     |   get     |   获取单个对象
Delete  |   delete  |   删除单个和多个对象
Update  |   put     |   更新对象
Create  |   post    |   创建对象
Query   |   post    |   获取集合对
getTree |   post    |   获取树型结构