"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetch = exports.save = exports.check = void 0;
// UpdateChecker.ts
/**
 * Check for updates and functions relating to updates
 * @packageDocumentation
 */
const Data_1 = require("./Data");
const fs_1 = __importDefault(require("fs"));
const https_1 = __importDefault(require("https"));
const supported = ['ships', 'equipments', 'chapters', 'barrages', 'voicelines'];
let version;
let remote;
/**
 * Check for updates
 */
async function check() {
    if (!version && fs_1.default.existsSync(Data_1.versionInfo))
        version = JSON.parse(fs_1.default.readFileSync(Data_1.versionInfo).toString());
    remote = JSON.parse(await fetch(Data_1.data.version));
    let needUpdate = [];
    for (let type of supported)
        if (!(version && version[type] && remote[type]['version-number'] === version[type]['version-number']))
            needUpdate.push(type);
    return needUpdate;
}
exports.check = check;
/**
 * Save the version data
 */
function save() {
    if (remote)
        fs_1.default.writeFileSync(Data_1.versionInfo, JSON.stringify(version = remote));
}
exports.save = save;
/**
 * Fetch data
 * @param url URL
 */
function fetch(url) {
    return new Promise((resolve, reject) => https_1.default.get(url, (resp) => {
        let data = '';
        resp.on('data', chunk => data += chunk);
        resp.on('end', () => resolve(data));
    }).on('error', err => reject(err)));
}
exports.fetch = fetch;
//# sourceMappingURL=UpdateChecker.js.map