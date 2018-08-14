const test = require('ava')
const resolve = require('../src/resolve-filename')

test('works with no options', t => {
  const result = resolve('lodash.kebabcase')
  t.is(result, 'lodash.kebabcase')
})

test('can resolve camelCase to kebab-case', t => {
  const result = resolve('kebabCase', { dir: './fixtures' })
  t.true(result.endsWith('kebab-case'))
})
