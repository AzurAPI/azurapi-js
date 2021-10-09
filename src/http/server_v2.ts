import http from 'http';
import { AzurAPI } from '../index';

export class Server {
  public port: number;
  private client: AzurAPI = new AzurAPI();
  private server: http.Server;
  constructor(port?: number) {
    console.log('[NOTICE] AzurAPI-TS server mode has been deprecated. Please use Formidable (https://github.com/Deivu/Formidable) where possible.');
    this.port = port ? port : 80;
    this.server = http.createServer(this.listener);
    this.client.on('ready', () => {
      this.server.listen(this.port, () => {
        console.log(`API listening on port ${this.port}`);
      });
    });
  }
  private listener(req, res) {
    // JSON content type in header
    res.setHeader('Content-Type', 'application/json');
    // Routing
    switch(req.url) {
      case '/':
        res.writeHead(200);
        res.end('{ status: 200, response: \'OK\' }');
        break;
      case '/api':
        if(!req.params.type) return res.end('{ status: 400, response: \'Missing param \"type"\' }') && res.writeHead(400);
        if(req.params.type !== 'ships' && req.params.type !== 'equipments' && req.params.type !== 'chapters' && req.params.type !== 'voicelines' && req.params.type !== 'barrages') return res.end('{ status: 400, response: \'Invalid value for param \"type"\' }') && res.writeHead(400);
        // eslint-disable-next-line brace-style, @typescript-eslint/brace-style
        if (req.params.method === 'raw') return res.end(`{ status: 200, response: ${JSON.stringify(this.client[`${req.params.type}`].raw).replace(/[\u007F-\uFFFF]/g, (chr) => { return `\\u${('0000' + chr.charCodeAt(0).toString(16)).substr(-4)}`; })}`) && res.writeHead(200);
        if(!req.params.method) return res.end('{ status: 400, response: \'Missing param \"method\"\' }') && res.writeHead(400);
        const q = req.params.q ? req.params.q : '';
        try {
          const fn = this.client[`${req.params.type}`][`${req.params.method}`](`${q}`);
          // eslint-disable-next-line brace-style, @typescript-eslint/brace-style
          return res.end(`{ status: 200, response: ${JSON.stringify(fn).replace(/[\u007F-\uFFFF]/g, (chr) => { return `\\u${('0000' + chr.charCodeAt(0).toString(16)).substr(-4)}`; })}`) && res.writeHead(200);
        } catch {
          res.end('{ status: 400, response: \'Not a function or missing param \"q\"\' }') && res.writeHead(400);
        }
        break;
      // Catch 404 error
      default:
        res.writeHead(404);
        res.end('{ status: 404, response: \'Endpoint does not exist\' }');
    }
  }
}
