import { EventEmitter } from 'events';
import http from 'http';
import HTTPDispatcher from './dispatcher';
const dispatcher = new HTTPDispatcher();

export default class Server extends EventEmitter {
    public port;
    private handle(req, res) {
      try {
        dispatcher.dispatch(req, res);
      } catch(ex) {
        this.emit('error', ex);
      }
    }
    private server = http.createServer(this.handle);
    constructor(port?: number) {
      super();
      this.port ? port : 8080;

      dispatcher.onGet('/', (req, res) => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end({ status: 200, response: 'OK' });
      });

      dispatcher.onError((req, res) => {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end({ status: 404, response: 'Endpoint does not exist' });
      });

      this.server.listen(this.port, () => {
        console.log(`API listening on port ${this.port}`);
      });
    }
}
