const path = require('path')
const debug = require('debug')('presets')
const merge = require('deepmerge')
const resolveFilename = require('./resolve-filename')

module.exports = preset

function preset(nameOrObject, options = {}) {
  if (!nameOrObject) return {}

  options = merge(
    {
      dir: './',
      key: 'extends'
    },
    options
  )

  const callerDir = require('./caller-path')()
  options.dir = path.resolve(callerDir, options.dir)

  const rootObject =
    typeof nameOrObject === 'string' ? {} : merge({}, nameOrObject)
  if (rootObject.extends) rootObject.extends = ensureArray(rootObject.extends)

  const startPaths =
    typeof nameOrObject === 'string' ? nameOrObject : nameOrObject.extends || []

  const allPresetPaths = Array.from(
    getAllPresetPaths(startPaths, options.extends)
  )
  debug({ allPresetPaths, rootObject })
  const allPresets = applyAllPresetsFrom(allPresetPaths, rootObject)

  debug({ allPresets })
  return allPresets

  function getAllPresetPaths(
    names,
    extendsKey = 'extends',
    result = new Set()
  ) {
    if (typeof names === 'string') {
      const resolvedName = resolveFilename(names, options)
      if (!resolvedName) throw new Error(`Cannot find preset '${names}'`)
      if (result.has(resolvedName)) return result
      result.add(resolvedName)
      const mod = require(resolvedName)
      names = ensureArray(mod.extends || [])
    }

    return names.reduce((result, extendName) => {
      return getAllPresetPaths(extendName, extendsKey, result)
    }, result)
  }

  function applyAllPresetsFrom(pathsArray, initialValue) {
    return pathsArray.reduce((result, filename) => {
      const presets = require(filename)
      if (presets.extends && result.extends) {
        result.extends = ensureArray(result.extends)
        presets.extends = ensureArray(presets.extends)
      }
      return merge(result, presets)
    }, initialValue)
  }
}

function ensureArray(array) {
  return Array.isArray(array) ? array : [array]
}
