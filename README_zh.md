## chare
A simple CLI scaffolding for front-end projects.

### 安装
chare 依赖 [Node.js](https://nodejs.org/en/) (>=6.x)：

```
$ npm install chare -g
```

### 用法
```
$ chare init <template-name> <project-name>
```

初始化时可以关联一个远程仓库: 

```
chare init <template-name> <project-name> -o remote-repo-url
```

示例:

```
$ chare init dwqs/vue-startup my-project

$ chare init waka-templates/vue-webpack2 my-project
```

关联一个远程仓库:

```
$ chare init vuejs-templates/webpack-simple my-project -o git@github.com:xxx/xxx.git
```

上述命令会从 [vuejs-templates/webpack-simple](https://github.com/vuejs-templates/webpack-simple) 拉取 `webpack` 模板来初始化你的 `./my-project/` 项目.


### 基本命令

* `chare` or `chare -h` --- 查看 chare 的帮助信息
* `chare init template-name your-project-name` --- 用指定的模板初始化你的项目.
* `chare token -u your-github-user-name -p your-personal-token` --- 设置 auth token，用于[Rate Limiting](https://developer.github.com/v3/#rate-limiting).

`chare list` 和 `chare init` 命令都会向 `api.github.com` 发起请求。在没设置 auth token 的情况下，github限制的请求频率是 60次/小时，超过次数之后，github会拒绝请求，返回403。

而设置token后，请求频率是5000次/小时。

相关文档：

* [Rate Limiting](https://developer.github.com/v3/#rate-limiting)
* [Basic Authentication](https://developer.github.com/v3/auth/#basic-authentication)

### 远程仓库
chare 允许使用他人的 github repo 作为项目的模板:

```
chare init username/repo my-project
```

运行上述命令之后，将会使用 `username/repo` 作为模板来初始化你的项目. 但该仓库目录结构需要符合 [template-simple](https://github.com/dwqs/template-simple) 中的说明.

### 本地模板

chare 支持使用本地模板初始化项目:

```
chare init ~/local/template/path my-project
```

>模板书写指南和样本：[template-simple](https://github.com/dwqs/template-simple)

## Note

如果你想为 waka 提供官方模板，请参照这份模板书写指南：[模板书写指南](https://github.com/dwqs/template-simple)。

在指南中，官方模板必须符合两条规则：

* 模板根目录下有 `template` 目录
* 模板根目录下有 `meta.{js,json}` 文件

**当你使用他人的github仓库或者本地模板时，如果github仓库或者本地模板的根目录没有 `template` 目录， chare 将会使用该仓库或者本地模板所在的目录作为渲染模板。**

例如，你的本地模板目录是 `~/my-templates`，如果 `my-templates` 下没有 `template` 目录，chare 则会使用 `my-templates` 作为渲染模板。

## Thanks
To [metalsmith scaffolder](https://github.com/metalsmith/metalsmith/blob/master/examples/project-scaffolder) for the head start.