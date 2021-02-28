/**
 * TAKEN/ADAPTED FROM https://github.com/alberto-bottarini/httpdispatcher
 */
import util from 'util';
import path from 'path';
import Http from 'http';
export default class HTTPDispatcher {
    public listeners = {
      'head'  : [],
      'get'   : [],
      'post'  : [],
      'put'   : [],
      'delete': [],
      'options': []
    };
	public filters = { before: [], after: [] };
	public errorListener(req, res) {
	  res.writeHead(404);
	  res.end();
	}
	public staticFolderPrefix = '/static';
	public staticDirname: string | undefined = undefined;
    public queue;
    public staticUrlPrefix;

    /**
	 * Generic function to set up request listener. Prefer onGet and onPost instead.
	 * @param method - The HTTP method to response to: "get" or "post"
	 * @param url - String, RegExp, or Function that will match and/or return true with a provided URL string.
	 * @param callback - The function that will be called on match.
	 */
    on(method:string, url:string|RegExp|HttpDispatcher.UrlMatcher, callback:HttpDispatcher.Callback):void {
	  this.listeners[method].push({
	    cb : callback,
	    url: url
	  });
    }

    /**
	 * What to do when a GET reqeust matches _url_.
	 * @param url - String, RegExp, or Function that will match and/or return true with a provided URL string.
	 * @param callback - The function that will be called on match.
	 */
    filter(method:string, url:string|RegExp|HttpDispatcher.UrlMatcher, callback:HttpDispatcher.Callback):void {
	  this.filters[method].push({
	    cb : callback,
	    url: url
	  });
    }

    /**
	 * What to do when a HEAD reqeust matches _url_.
	 * @param url - String, RegExp, or Function that will match and/or return true with a provided URL string.
	 * @param callback - The function that will be called on match.
	 */
    onHead(url:string|RegExp|HttpDispatcher.UrlMatcher, callback:HttpDispatcher.Callback):void {
	  this.on('head', url, callback);
    }

    /**
	 * What to do when a GET reqeust matches _url_.
	 * @param url - String, RegExp, or Function that will match and/or return true with a provided URL string.
	 * @param callback - The function that will be called on match.
	 */
    onGet(url:string|RegExp|HttpDispatcher.UrlMatcher, callback:HttpDispatcher.Callback):void {
	  this.on('get', url, callback);
    }

    /**
	 * What to do when a POST request matches _url_.
	 * @param url - String, RegExp, or Function that will match and/or return true with a provided URL string.
	 * @param callback - The function that will be called on match.
	 */
    onPost(url:string|RegExp|HttpDispatcher.UrlMatcher, callback:HttpDispatcher.Callback):void {
	  this.on('post', url, callback);
    }

    /**
	 * What to do when a OPTIONS request matches _url_.
	 * @param url - String, RegExp, or Function that will match and/or return true with a provided URL string.
	 * @param callback - The function that will be called on match.
	 */
    onOptions(url:string|RegExp|HttpDispatcher.UrlMatcher, callback:HttpDispatcher.Callback):void {
	  this.on('options', url, callback);
    }

    /**
	 * What to do when a PUT request matches _url_.
	 * @param url - String, RegExp, or Function that will match and/or return true with a provided URL string.
	 * @param callback - The function that will be called on match.
	 */
    onPut(url:string|RegExp|HttpDispatcher.UrlMatcher, callback:HttpDispatcher.Callback):void {
	  this.on('put', url, callback);
    }

    /**
	 * What to do when a DELETE request matches _url_.
	 * @param url - String, RegExp, or Function that will match and/or return true with a provided URL string.
	 * @param callback - The function that will be called on match.
	 */
    onDelete(url:string|RegExp|HttpDispatcher.UrlMatcher, callback:HttpDispatcher.Callback):void {
	  this.on('delete', url, callback);
    }

    /**
	 * What function should be called when there is an error.
	 * @param callback - The function that will be called on match.
	 */
    onError(callback:HttpDispatcher.Callback):void {
	  this.errorListener = callback;
    }

    /**
	 * Set the virtual folder for the static resources.
	 * @param folder - Relative path in URL to static resources.
	 */
    setStatic(folder:string):void {
	  this.staticUrlPrefix = folder;
	  this.on('get', function(url) {
	    return url.indexOf(folder) === 0;
	  }, this.staticListener.bind(this));
    }

    /**
	 * Set the physical/local folder for the static resources.
	 * @param dirname - Relative path in file system to static resources.
	 */
    setStaticDirname(dirname:string):void {
	  this.staticDirname = dirname;
    }

    /**
	 * Called before a route is handeled; can modify the request and response.
	 * @param url - String, RegExp, or Function that will match and/or return true with a provided URL string.
	 * @param callback - The function that will be called on match.
	 */
    beforeFilter(url, callback):void {
	  this.filter('before', url, callback);
    }

    /**
	 * Called after a route is handeled; can modify the request and response.
	 * @param url - String, RegExp, or Function that will match and/or return true with a provided URL string.
	 * @param callback - The function that will be called on match.
	 */
    afterFilter(url, callback):void {
	  this.filter('after', url, callback);
    }

    /**
	 * Main entry point for httpdispatcher. Http.CreateServer would call this.
	 * @param request - A ClientRequest object from NodeJS _Http_ module.
	 * @param response - A ClientResponse object from NodeJS _Http_ module.
	 */
    dispatch(request, response):void {
	  const url = require('url').parse(request.url, true);
	  const method = request?.method?.toLowerCase();
	  // eslint-disable-next-line @typescript-eslint/no-this-alias
	  const dispatcher = this;
	  const doDispatch = () => {
	    const httpChain = new this.HttpChain();
	    const beforeFilters = this.getFilters(url.pathname, 'before');
	    httpChain.addAll(beforeFilters);
	    const listenerCb = this.getListener(url.pathname, method) ? this.getListener(url.pathname, method) : this.errorListener;
	    httpChain.add(httpChain.getWrapped(listenerCb));
	    const afterFilters = this.getFilters(url.pathname, 'after');
	    httpChain.addAll(afterFilters);
	    httpChain.next(request, response);
	  };
	  if(method?.match(/(post|put|patch)/i)) {
	    let body;
	    const chunks: any = [];
	    request.on('data', (data: any) => chunks.push(data));
	    request.on('end', function() {
	      request.bodyBuffer = Buffer.concat(chunks);
	      body = request.bodyBuffer.toString();
	      const post = require('querystring').parse(body);
	      request.body = body;
	      request.params = post;
	      doDispatch.call(dispatcher);
	    });
	  } else {
	    /* eslint-disable-next-line camelcase */
	    const url_parts = require('url').parse(request.url, true);
	    /* eslint-disable-next-line camelcase */
	    request.params = url_parts.query;
	    doDispatch.call(dispatcher);
	  }
    }

    /**
	 * Listen to requests for static assests and serve them from the file system.
	 * @param request - A ClientRequest object from NodeJS _Http_ module.
	 * @param response - A ClientResponse object from NodeJS _Http_ module.
	 */
    staticListener(request:Http.IncomingMessage, response:Http.ServerResponse):void {
	  const url = require('url').parse(request.url, true);
	  const errorListener = this.errorListener;
	  const filename = path.join(this.staticDirname!, path.relative(this.staticUrlPrefix, url.pathname));
	  if (filename.indexOf(this.staticDirname!) !== 0) {
	    errorListener(request, response);
	    return;
	  }
	  require('fs').readFile(filename, function(err, file) {
	    if(err) {
	      errorListener(request, response);
	      return;
	    }
	    response.writeHead(200, {
	      'Content-Type': require('mime-types').lookup(filename)
	    });
	    response.write(file, 'binary');
	    response.end();
	  });
    }

    /**
	 * Return the Callback that matches the URL and method requested.
	 * @param url - The URL requested.
	 * @param method - The method, "get" or "post", that the URL was requested with.
	 * @returns Callback
	 */
    getListener(url:string, method:string):any {
	  if (this.listeners[method]) {
	    for(let i = 0, listener; i<this.listeners[method].length; i++) {
	      listener = this.listeners[method][i];
	      if(this.urlMatches(listener.url, url)) return listener.cb;
	    }
	  } else {
        return;
      }
    }

    /**
	 * Return the Callback filter that matches the URL and method requested.
	 * @param url - The URL requested.
	 * @param type - The type of the filter, "before" or "after, for which the Callback should be returned.
	 * @returns Callback
	 */
    getFilters(url:string, type:string):HttpDispatcher.Callback {
	  const filters: any = [];
	  for(let i = 0, filter; i<this.filters[type].length; i++) {
	    filter = this.filters[type][i];
	    if(this.urlMatches(filter.url, url)) filters.push(filter.cb);
	  }
	  return filters;
    }

    /**
	 * Will determine if there is a match for a _url_ given a _config_.
	 * @param config - String, RegExp, or Function that will match and/or return true with a provided URL string.
	 * @param url - The string that will be passed to config() or compared (===) with config or matched with config.test() to return a boolean.
	 */
    urlMatches(config:string|RegExp|HttpDispatcher.UrlMatcher|any, url:string):boolean {
	  if(config instanceof RegExp) return config.test(url);
	  if(util.inspect(config) === '[Function]') return config(url);
	  return config === url;
    }

    HttpChain() {
      this.queue = [];
    }

    add(cb) {
      this.queue.push(cb);
    }

    addAll(cbs) {
      for(let i = 0; i<cbs.length; i++) this.add(cbs[i]);
    }

    next(req, res) {
      const cb = this.queue.shift();
      if(cb) cb(req, res, this);
    }

    stop(req, res) {
      res.end();
    }

    getWrapped(cb) {
      return (req, res, chain) => {
        cb(req, res);
        chain.next(req, res);
      };
    }
}

declare namespace HttpDispatcher {

	export interface ClientRequest extends Http.IncomingMessage {
		params: Record<string, unknown>,
		// available only on POST requests
		body?: string,
		// available only on POST requests
		bodyBuffer?: Buffer,
	}

	export class HttpChain {
	  constructor();
	  add(callback: ChainCallback): void;
	  addAll(callbacks: ChainCallback[]): void;
	  next(req: ClientRequest, res: Http.ServerResponse): void;
	}

	export interface Callback {
		(request: ClientRequest, response: Http.ServerResponse): void;
	}

	export interface ChainCallback {
		(request: ClientRequest, response: Http.ServerResponse, chain: HttpChain): void;
	}

	export interface UrlMatcher {
		(url:string): boolean;
	}

}
