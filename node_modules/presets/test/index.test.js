const test = require('ava')
const debug = require('debug')('test')
const presets = require('..')

const FIXTURES = {
  options: { dir: './fixtures' }
}

function testUsing(preset) {
  function it(text, ...args) {
    return test(`${typeof preset} · ${text}`, ...args)
  }

  it(`can load presets without \`extends\``, t => {
    const result = presets(preset, FIXTURES.options)
    debug({ result })
    t.deepEqual(result, {})
  })

  it(`can load preset with one \`extends\``, t => {
    const result = presets({ extends: 'extends-one' }, FIXTURES.options)
    debug({ result })
    t.deepEqual(result, {
      extends: ['extends-one', 'extends-none'],
      'extends-one': true
    })
  })
}

test('presets(undefined)', t => {
  t.deepEqual(presets(), {})
})

testUsing({})
testUsing('extends-none')

test('can resolve circular dependencies', t => {
  const result = presets('circular-a', FIXTURES.options)
  t.deepEqual(result, {
    extends: ['circular-b', 'circular-a'],
    a: true,
    b: true
  })
})

test('can work with prefixes', t => {
  const result = presets(
    'a',
    Object.assign({ prefix: 'circular-' }, FIXTURES.options)
  )
  t.deepEqual(result, {
    extends: ['circular-b', 'circular-a'],
    a: true,
    b: true
  })
})

test('throws for non-existing files', t => {
  t.throws(() => {
    presets(require('unique-string')())
  })
})

test('can load xo settings', t => {
  const pkg = require('../package.json')
  const result = presets(pkg.xo, {
    prefix: 'eslint-config-'
  })
  t.truthy(result, {})
})
