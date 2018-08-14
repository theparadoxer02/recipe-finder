# presets

[![build status](https://img.shields.io/travis/AndreasPizsa/presets.svg)](https://travis-ci.org/AndreasPizsa/presets)
[![code coverage](https://img.shields.io/codecov/c/github/AndreasPizsa/presets.svg)](https://codecov.io/gh/AndreasPizsa/presets)
[![code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![made with lass](https://img.shields.io/badge/made_with-lass-95CC28.svg)](https://lass.js.org)
[![license](https://img.shields.io/github/license/AndreasPizsa/presets.svg)](LICENSE)

> Easily load shareable presets. Supports `extends`.


## Table of Contents

* [Install](#install)
* [Usage](#usage)
  * [kebab-case and camelCase](#kebab-case-and-camelcase)
* [Contributors](#contributors)
* [License](#license)


## Install

[npm][]:

```sh
npm install presets
```

[yarn][]:

```sh
yarn add presets
```


## Usage

#### From package.json

```js
const loadPresets = require('presets');
const presets = new loadPresets('./package.json');
```

#### From shared presets

```js
const loadPresets = require('presets');
const presets = new loadPresets('presets-my-awesome-settings');
```

#### from a package.json

```js
const pkg = require('./package.json')
const presets = new loadPresets(pkg.xo);
```

### kebab-case and camelCase

`presets` can automatically lookup file names to camelCase and kebab-case.


## Contributors

| Name              | Website                           |
| ----------------- | --------------------------------- |
| **Andreas Pizsa** | <https://github.com/AndreasPizsa> |


## License

[MIT](LICENSE) © [Andreas Pizsa](https://github.com/AndreasPizsa)


## 

[npm]: https://www.npmjs.com/

[yarn]: https://yarnpkg.com/
