module.exports = resolveFilename

const debug = require('debug')('resolve-filename')

const kebabCase = require('lodash.kebabcase')
const camelCase = require('lodash.camelcase')

function resolveFilename(name, options) {
  const path = require('path')
  options = Object.assign(
    {
      dir: './'
    },
    options
  )

  const callerDir = require('./caller-path')()
  options.dir = path.resolve(callerDir, options.dir)

  const pathFomDir = name => `${options.dir}${path.sep}${name}`
  const prefixed = options.prefix
    ? name => (name.startsWith(options.prefix) ? name : options.prefix + name)
    : noop

  const kebabName = kebabCase(name)
  const camelName = camelCase(name)
  const prefixedName = prefixed(name)

  const allNames = Array.from(
    new Set(
      [
        pathFomDir(prefixedName),
        pathFomDir(name),
        pathFomDir(kebabName),
        pathFomDir(camelName),
        pathFomDir(kebabCase(prefixedName)),
        pathFomDir(camelCase(prefixedName)),
        prefixedName,
        name,
        kebabName,
        camelName,
        kebabCase(prefixedName),
        camelCase(prefixedName)
      ].filter(x => Boolean(x))
    )
  )
  const found = allNames.find(catchAll(require.resolve))
  debug({ allNames, found })
  return found
}

function noop(value) {
  return value
}

function catchAll(fn, defaultValue) {
  return function() {
    try {
      return fn.apply(this, arguments)
    } catch (err) {
      return defaultValue
    }
  }
}
