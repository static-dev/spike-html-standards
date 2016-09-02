# Spike HTML Standard Plugin Pack

[![npm](http://img.shields.io/npm/v/spike-html-standards.svg?style=flat)](https://badge.fury.io/js/spike-html-standards) [![tests](http://img.shields.io/travis/static-dev/spike-html-standards/master.svg?style=flat)](https://travis-ci.org/static-dev/spike-html-standards) [![dependencies](http://img.shields.io/david/static-dev/spike-html-standards.svg?style=flat)](https://david-dm.org/static-dev/spike-html-standards) [![coverage](http://img.shields.io/coveralls/static-dev/spike-html-standards.svg?style=flat)](https://coveralls.io/github/static-dev/spike-html-standards)

[Spike html standards](https://spike.readme.io/docs/html-standards) plugin pack for reshape

> :warning: **This package is locked and in maintenance mode -- see [reshape/standard](https://github.com/reshape/standard) for future updates!** :warning:

> **Note:** This project is in early development, and versioning is a little different. [Read this](http://markup.im/#q4_cRZ1Q) for more details.

### Installation

`npm install spike-html-standards -S`

> **Note:** This project is compatible with node v6+ only

### Usage

This is nothing more than a light wrapper around a reshape configuration object. Options are filtered into their appropriate plugins internally. All are optional.

```js
const reshape = require('reshape')
const htmlStandards = require('spike-html-standards')

reshape(htmlStandards(/* options */))
  .process(someHtml)
  .then((res) => console.log(res.output()))
```

By default, the html standard plugin pack includes:

- [sugarml](https://github.com/reshape/sugarml), provided as default parser
- [reshape-expressions](https://github.com/reshape/expressions), default settings
- [reshape-layouts](https://github.com/reshape/layouts), default settings
- [reshape-include](https://github.com/reshape/include), default settings
- [reshape-content](https://github.com/reshape/content) with a `md` function that renders markdown using [markdown-it](https://github.com/markdown-it/markdown-it)
- [reshape-retext](https://github.com/reshape/retext) with the [smartypants](https://github.com/wooorm/retext-smartypants) plugin
- [reshape-beautify](https://github.com/reshape/beautify), default settings
- [reshape-minify](https://github.com/reshape/minify), toggled with the `minify` option which is false by default. When enabled, it will disable `beautify`

Based on the way they are ordered there are a couple limitations to keep in mind:

- You cannot use a layout `block/extend` inside of an `include`
- Any expression delimiters rendered from a `content` or `retext` transform will be output as plaintext, not as an expression
- Output from a `content` transform will be processed by `retext` in that order

Any of these plugins can be customized by passing options described below.

### Options

| Name | Description | Default |
| ---- | ----------- | ------- |
| **root** | Root path used to resolve layouts and includes | |
| **filename** | Name of the file being compiled, used for error traces and as the include/layout root if not otherwise provided | |
| **addDependencyTo** | Object with `addDependency` method that will get file paths for tracked deps from includes/layouts | |
| **webpack** | Shortcut for webpack users to set the `root` and `addDependencyTo` options more easily. Pass webpack loader context. | |
| **delimiters** | Delimiters used for html-escaped expressions | `['{{', '}}']` |
| **unescapeDelimiters** | Delimiters used for unescaped expressions | `['{{{', '}}}']` |
| **markdown** | Options passed in to [markdown-it](https://github.com/markdown-it/markdown-it) constructor | `{ typographer: true, linkify: true }` |
| **content** | Options passed to the [reshape-content](https://github.com/reshape/content) plugin | `{ md: renderMarkdown }` |
| **parser** | custom html parser if desired. pass `false` to use the default html parser | `sugarml` |
| **retext** | Plugins to be passed to the [reshape-retext](https://github.com/reshape/retext) plugin | `[smartypants]` ([ref](https://github.com/wooorm/retext-smartypants)) |
| **locals** | Added directly to the output object, used when compiling a reshape template to html | `{}` |
| **alias** | Alias option to be passed to the [include plugin](https://github.com/reshape/include#options) | |
| **minify** | Minifies the html output by removing excess spaces and line breaks | `false` |

### License & Contributing

- Details on the license [can be found here](LICENSE.md)
- Details on running tests and contributing [can be found here](contributing.md)
