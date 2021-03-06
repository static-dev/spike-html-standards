const test = require('ava')
const rewire = require('rewire')
const htmlStandardsRewired = rewire('..')
const htmlStandards = require('..')

test('options passed correctly', (t) => {
  htmlStandardsRewired.__set__('content', (opts) => {
    t.truthy(opts.md === 'test')
  })
  htmlStandardsRewired.__set__('include', (opts) => {
    t.truthy(opts.root === 'test')
    t.truthy(opts.addDependencyTo.addDependency === 'test')
  })
  htmlStandardsRewired.__set__('layouts', (opts) => {
    t.truthy(opts.root === 'test')
    t.truthy(opts.addDependencyTo.addDependency === 'test')
  })
  htmlStandardsRewired.__set__('expressions', (opts) => {
    t.truthy(opts.delimiters === 'test')
    t.truthy(opts.unescapeDelimiters === 'test')
  })
  htmlStandardsRewired.__set__('retext', (opts) => {
    t.truthy(opts.length === 3)
  })
  htmlStandardsRewired.__set__('MarkdownIt', class Mock {
    constructor (opts) {
      t.truthy(opts === 'test')
    }
  })

  const out1 = htmlStandardsRewired({
    root: 'test',
    webpack: { resourcePath: 'test', addDependency: 'test' },
    delimiters: 'test',
    locals: 'true',
    unescapeDelimiters: 'test',
    content: { md: 'test' },
    retext: [1, 2, 3],
    markdown: 'test'
  })

  const out2 = htmlStandards({
    parser: false,
    addDependencyTo: { addDependency: (x) => x },
    locals: 'true',
    minify: true
  })

  t.truthy(out1.parser)
  t.truthy(out1.locals)
  t.truthy(out1.filename === 'test')
  t.truthy(out1.plugins.length === 6)
  t.falsy(out2.parser)
  t.truthy(out2.plugins[out2.plugins.length - 1].name === 'minifyPlugin')
})
