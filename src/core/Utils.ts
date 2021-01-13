const { readFile, readFileSync, writeFile, writeFileSync, existsSync, mkdirSync, access, constants } = require('fs');
const { promisify } = require('util');

const promise = {
  read: promisify(readFile),
  write: promisify(writeFile),
  access: promisify(access)
};

/*
 * Sync methods are ONLY to be used at program startup and will never be used while the program is running
 */
export default class Utils {
  static existSync(path) {
    return existsSync(path);
  }

  static existsFile(path) {
    return promise.access(path, constants.F_OK | constants.W_OK)
      .then(() => true)
      .catch(error => {
        if (error.code === 'ENOENT') return false;
        throw error;
      });
  }

  static readFile(path) {
    return promise.read(path);
  }

  static readFileSync(path) {
    return readFileSync(path);
  }

  static writeFileSync(path, data) {
    return writeFileSync(path, data);
  }

  static writeFile(path, data) {
    return promise.write(path, data);
  }

  static createDirectorySync(path) {
    return mkdirSync(path);
  }
}
