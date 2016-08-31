const sugarml = require('sugarml')
const smartypants = require('retext-smartypants')
let MarkdownIt = require('markdown-it')
let expressions = require('reshape-expressions')
let content = require('reshape-content')
let include = require('reshape-include')
let layouts = require('reshape-layouts')
let retext = require('reshape-retext')
let beautify = require('reshape-beautify')
let minify = require('reshape-minify')

module.exports = function spikeHtmlStandards (options = {}) {
  // Always return an object for locals
  if (typeof options.locals === 'undefined') options.locals = {}

  // set options using webpack shortcut if present
  if (options.webpack) {
    options.filename = options.webpack.resourcePath
    options.addDependencyTo = options.webpack

    // add the page id to the locals if requested
    if (options.pageId && options.locals) {
      options.locals.pageId = pageId(options.webpack)
    }
  }

  // add options for expressions, layouts, and includes if present
  const expressionsOpt = selectiveMerge(options, ['delimiters', 'unescapeDelimiters'])
  const layoutsOpt = selectiveMerge(options, ['root', 'addDependencyTo'])
  const includeOpt = selectiveMerge(options, ['root', 'addDependencyTo'])

  // if the user has not provided a custom parser or `false`, use sugarml
  let parserOpt = options.parser || sugarml
  if (options.parser === false) parserOpt = undefined

  // If the user has not overridden the default markdown function, initialize
  // markdown-it and add the default
  let contentOpt = options.content || {}
  if (!contentOpt.md) {
    const markdownOpt = { typographer: true, linkify: true }
    const md = new MarkdownIt(Object.assign({}, markdownOpt, options.markdown))
    contentOpt.md = md.renderInline.bind(md)
  }

  const plugins = [
    layouts(layoutsOpt),
    include(includeOpt),
    expressions(expressionsOpt),
    content(contentOpt),
    retext(options.retext || smartypants)
  ]

  if (options.minify) {
    plugins.push(minify())
  } else {
    plugins.push(beautify())
  }

  return {
    parser: parserOpt,
    locals: options.locals,
    filename: options.filename,
    plugins
  }
}

function selectiveMerge (opts, optNames) {
  return optNames.reduce((m, opt) => {
    if (opts[opt]) { m[opt] = opts[opt] }; return m
  }, {})
}

function pageId (ctx) {
  return ctx.resourcePath.replace(`${ctx.options.context}/`, '').replace(/(.*)?(\..+?$)/, '$1').replace(new RegExp(`(?:${ctx.options.spike.dumpDirs.join('|')})/`), '').replace(/\//g, '-')
}
