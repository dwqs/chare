#### [中文README](https://github.com/dwqs/chare/blob/master/README_zh.md)

## chare
A simple CLI scaffolding for front-end projects.

### Installation
Prerequisites: [Node.js](https://nodejs.org/en/) (>=6.x) and [Git](https://git-scm.com/).

```
$ npm install chare -g
```

### Usage
```
$ chare init <template-name> <project-name>
```

You can also relate a remote repo: 

```
chare init <template-name> <project-name> -o remote-repo-url
```

Example:

```
$ chare init dwqs/vue-startup my-project

$ chare init waka-templates/vue-webpack2 my-project
```

Relate a remote repo:

```
$ chare init vuejs-templates/webpack-simple my-project -o git@github.com:xxx/xxx.git
```

The above command pulls the template from [vuejs-templates/webpack-simple](https://github.com/vuejs-templates/webpack-simple), prompts for some information, and generates the project at `./my-project/`.


### Command

* `chare` or `chare -h` --- find help info for chare.
* `chare init template-name your-project-name [-o remote-origin]` --- init your project with specified template.
* `chare token -u your-github-user-name -p your-personal-token` --- set auth token to get a higher rate limit of api requests. Check out the [documentation](https://developer.github.com/v3/#rate-limiting) for more details.

>Note: Check out the [documentation](https://developer.github.com/v3/auth/#basic-authentication) for more details about Basic Authentication.

### Templates from github
It's unlikely to make everyone happy with the official templates. You can simply fork an official template and then use it via `chare-cli` with:

```
chare init username/repo my-project
```

Where `username/repo` is the GitHub repo shorthand for your fork. But the repo need to meet some conditions. See this: [template-simple](https://github.com/dwqs/template-simple/blob/master/README_en.md)

### Local Templates

Instead of a GitHub repo, you can also use a template on your local file system:

```
chare init ~/fs/path/to-custom-template my-project
```

There is a [guide](https://github.com/dwqs/template-simple/blob/master/README_en.md) for to writing owner customized template.

## Thanks
To [metalsmith scaffolder](https://github.com/metalsmith/metalsmith/blob/master/examples/project-scaffolder) && [vue-cli](https://github.com/vuejs/vue-cli) for the head start.
