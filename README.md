# azur-json

## Features

**TODO**

## Installation

```bash
npm install azur-json
yarn add azur-json
```

## Usage

API can be used by importing _azur-json_ in your JS script, or by importing the individual functions you need.

```js
import azurJson from 'azur-json'
// or const azurJson = require('azur-json')

console.log(azurJson.ships.getShip('z23'))
// or console.log(azurJson.getShip('z23'))
// => { ... }

import { getShip, getShipByName } from 'azur-json'
console.log(getShipByName('z23'))
// => { ... }
```

## Update the data

**TODO**

## Test

API is carefully tested with Jest. To run tests, call the following npm script :

```bash
npm run test
```

## Contributing

#### Bug Reports & Feature Requests

Please use the [issue tracker](https://github.com/jasperchua99/azur-json/issues) to report any bugs or file feature requests.

#### Developing

PRs and new contributors are welcome.

A `src` directory is available for any ES6 development, project is using Babel in order to transpile the scripts in ES5 and save them into the `build` directory.
The following npm script runs the Babel job :

```bash
npm run babel
```

Please contact XXXXXXXXXXXXXX for other information.
