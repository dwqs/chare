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

Example:

```
$ chare init vue-webpack my-project
```

The above command pulls the template from [waka-templates/vue-webpack](https://github.com/waka-templates/vue-webpack), prompts for some information, and generates the project at `./my-project/`


### Command

* `chare` or `chare -h` --- find help info for chare.
* `chare list` --- list all available official templates from [waka-templates](https://github.com/waka-templates).
* `chare init template-name your-project-name` --- init your project with specified template.
* `chare token -u your-github-user-name -p your-personal-token` --- set auth token to get a higher rate limit of api requests. Check out the [documentation](https://developer.github.com/v3/#rate-limiting) for more details.

>Note: Check out the [documentation](https://developer.github.com/v3/auth/#basic-authentication) for more details about Basic Authentication.

## Templates
Waka provides some simple official template, if it can't meet your needs, you also can specified template from others' repo or use your local template.

### Official Templates
All official project templates are repos in the [waka-templates organization](https://github.com/waka-templates). When a new template is added to the organization, you will be able to run `chare init <template-name> <project-name>` to use that template. You can also run `chare list` to see all available official templates.

Additional, you also can check [template simple](https://github.com/chare-templates/template-simple) to write owner customized template.

### Templates from github
It's unlikely to make everyone happy with the official templates. You can simply fork an official template and then use it via `chare-cli` with:

```
chare init username/repo my-project
```

Where `username/repo` is the GitHub repo shorthand for your fork.

### Local Templates

Instead of a GitHub repo, you can also use a template on your local file system:

```
chare init ~/fs/path/to-custom-template my-project
```

There is a [guide]((https://github.com/waka-templates/template-simple)) for to writing owner customized template.

## Note

In [template simple](https://github.com/waka-templates/template-simple), we said that the template has its directory structure like it **must** have a template directory that holds the template files.

But the template you used doesn't meet the rules, chare will use the root directory of repo or local template.

Example:

```
chare init repo/test test
```

If template directory(which path is like `test/template`) doesn't exist in the root directory of `test`, chare will use `test` as the template to init your project.


## Thanks
To [metalsmith scaffolder](https://github.com/metalsmith/metalsmith/blob/master/examples/project-scaffolder) for the head start.
