#webAuto-自动化构建

webAuto采用grunt对web前端进行自动化构建，并采用内置Sever服务器，实时刷新。

### 功能简介

```
1.简单易用
2.内置服务器
3.页面实时刷新
4.css,js打包并压缩
5.自动合并图标文件
```

### 目录结构

```
our-webauto
|-- README.md
|-- package.json
|-- Gruntfile.js
|-- build       # 构建目录
   |-- css        # 打包生产后的css文件
   |-- js         # 打包生成后的js文件
   |-- images     # 图标文件合成后的PNG图片
|-- src         # 开发文件
   |-- css         # 存放css文件
   |-- images      # 存放图片文件
       |-- sprite     # 原始图标文件
   |-- page        # 存放页面文件
   |-- js          # 存放脚本文件

```

### 使用说明

全局安装
```
npm install -g grunt-cli
```

克隆到本地
```
git clone https://github.com/gzgqq/our-webauto
```
重命名后进入目录安装依赖：

```
cd <webname>

npm install

注：如果下载速度太慢，可是使用淘宝npm镜像 cnpm install
```

接下来，执行 `grunt`：

```
grunt serve
```