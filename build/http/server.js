"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const events_1 = require("events");
const http_1 = __importDefault(require("http"));
const dispatcher_1 = __importDefault(require("./dispatcher"));
const index_1 = require("../index");
const dispatcher = new dispatcher_1.default();
class Server extends events_1.EventEmitter {
    constructor(port) {
        super();
        this.client = new index_1.AzurAPI();
        this.server = http_1.default.createServer(this.handle);
        this.port = port ? port : 8080;
        dispatcher.onGet('/', (req, res) => {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end('{ status: 200, response: \'OK\' }');
        });
        dispatcher.onGet('/api', (req, res) => {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            if (!req.params.type)
                return res.end('{ status: 400, response: \'Missing param \"type"\' }');
            if (req.params.type !== 'ships' && req.params.type !== 'equipments' && req.params.type !== 'chapters' && req.params.type !== 'voicelines' && req.params.type !== 'barrages')
                return res.end('{ status: 400, response: \'Invalid value for param \"type"\' }');
            // eslint-disable-next-line brace-style, @typescript-eslint/brace-style
            if (req.params.method === 'raw')
                return res.end(`{ status: 200, response: ${JSON.stringify(this.client[`${req.params.type}`].raw).replace(/[\u007F-\uFFFF]/g, (chr) => { return `\\u${('0000' + chr.charCodeAt(0).toString(16)).substr(-4)}`; })}`);
            if (!req.params.method)
                return res.end('{ status: 400, response: \'Missing param \"method\"\' }');
            const q = req.params.q ? req.params.q : '';
            try {
                const fn = this.client[`${req.params.type}`][`${req.params.method}`](`${q}`);
                // eslint-disable-next-line brace-style, @typescript-eslint/brace-style
                return res.end(`{ status: 200, response: ${JSON.stringify(fn).replace(/[\u007F-\uFFFF]/g, (chr) => { return `\\u${('0000' + chr.charCodeAt(0).toString(16)).substr(-4)}`; })}`);
            }
            catch {
                res.end('{ status: 400, response: \'Not a function or missing param \"q\"\' }');
            }
        });
        dispatcher.onError((req, res) => {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end('{ status: 404, response: \'Endpoint does not exist\' }');
        });
        this.client.on('ready', () => {
            this.server.listen(this.port, () => {
                console.log(`API listening on port ${this.port}`);
            });
        });
    }
    handle(req, res) {
        try {
            dispatcher.dispatch(req, res);
        }
        catch (ex) {
            this.emit('error', ex);
        }
    }
}
exports.Server = Server;
//# sourceMappingURL=server.js.map