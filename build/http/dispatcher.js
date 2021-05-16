"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * TAKEN/ADAPTED FROM https://github.com/alberto-bottarini/httpdispatcher
 */
const util_1 = __importDefault(require("util"));
const path_1 = __importDefault(require("path"));
class HTTPDispatcher {
    constructor() {
        this.listeners = {
            'head': [],
            'get': [],
            'post': [],
            'put': [],
            'delete': [],
            'options': []
        };
        this.filters = { before: [], after: [] };
        this.staticFolderPrefix = '/static';
        this.staticDirname = undefined;
    }
    errorListener(req, res) {
        res.writeHead(404);
        res.end();
    }
    /**
     * Generic function to set up request listener. Prefer onGet and onPost instead.
     * @param method - The HTTP method to response to: "get" or "post"
     * @param url - String, RegExp, or Function that will match and/or return true with a provided URL string.
     * @param callback - The function that will be called on match.
     */
    on(method, url, callback) {
        this.listeners[method].push({
            cb: callback,
            url: url
        });
    }
    /**
     * What to do when a GET reqeust matches _url_.
     * @param url - String, RegExp, or Function that will match and/or return true with a provided URL string.
     * @param callback - The function that will be called on match.
     */
    filter(method, url, callback) {
        this.filters[method].push({
            cb: callback,
            url: url
        });
    }
    /**
     * What to do when a HEAD reqeust matches _url_.
     * @param url - String, RegExp, or Function that will match and/or return true with a provided URL string.
     * @param callback - The function that will be called on match.
     */
    onHead(url, callback) {
        this.on('head', url, callback);
    }
    /**
     * What to do when a GET reqeust matches _url_.
     * @param url - String, RegExp, or Function that will match and/or return true with a provided URL string.
     * @param callback - The function that will be called on match.
     */
    onGet(url, callback) {
        this.on('get', url, callback);
    }
    /**
     * What to do when a POST request matches _url_.
     * @param url - String, RegExp, or Function that will match and/or return true with a provided URL string.
     * @param callback - The function that will be called on match.
     */
    onPost(url, callback) {
        this.on('post', url, callback);
    }
    /**
     * What to do when a OPTIONS request matches _url_.
     * @param url - String, RegExp, or Function that will match and/or return true with a provided URL string.
     * @param callback - The function that will be called on match.
     */
    onOptions(url, callback) {
        this.on('options', url, callback);
    }
    /**
     * What to do when a PUT request matches _url_.
     * @param url - String, RegExp, or Function that will match and/or return true with a provided URL string.
     * @param callback - The function that will be called on match.
     */
    onPut(url, callback) {
        this.on('put', url, callback);
    }
    /**
     * What to do when a DELETE request matches _url_.
     * @param url - String, RegExp, or Function that will match and/or return true with a provided URL string.
     * @param callback - The function that will be called on match.
     */
    onDelete(url, callback) {
        this.on('delete', url, callback);
    }
    /**
     * What function should be called when there is an error.
     * @param callback - The function that will be called on match.
     */
    onError(callback) {
        this.errorListener = callback;
    }
    /**
     * Set the virtual folder for the static resources.
     * @param folder - Relative path in URL to static resources.
     */
    setStatic(folder) {
        this.staticUrlPrefix = folder;
        this.on('get', function (url) {
            return url.indexOf(folder) === 0;
        }, this.staticListener.bind(this));
    }
    /**
     * Set the physical/local folder for the static resources.
     * @param dirname - Relative path in file system to static resources.
     */
    setStaticDirname(dirname) {
        this.staticDirname = dirname;
    }
    /**
     * Called before a route is handeled; can modify the request and response.
     * @param url - String, RegExp, or Function that will match and/or return true with a provided URL string.
     * @param callback - The function that will be called on match.
     */
    beforeFilter(url, callback) {
        this.filter('before', url, callback);
    }
    /**
     * Called after a route is handeled; can modify the request and response.
     * @param url - String, RegExp, or Function that will match and/or return true with a provided URL string.
     * @param callback - The function that will be called on match.
     */
    afterFilter(url, callback) {
        this.filter('after', url, callback);
    }
    /**
     * Main entry point for httpdispatcher. Http.CreateServer would call this.
     * @param request - A ClientRequest object from NodeJS _Http_ module.
     * @param response - A ClientResponse object from NodeJS _Http_ module.
     */
    dispatch(request, response) {
        const url = require('url').parse(request.url, true);
        const method = request?.method?.toLowerCase();
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const dispatcher = this;
        const doDispatch = () => {
            const httpChain = this.HttpChain();
            const beforeFilters = this.getFilters(url.pathname, 'before');
            this.addAll(beforeFilters);
            const listenerCb = this.getListener(url.pathname, method) ? this.getListener(url.pathname, method) : this.errorListener;
            this.add(this.getWrapped(listenerCb));
            const afterFilters = this.getFilters(url.pathname, 'after');
            this.addAll(afterFilters);
            this.next(request, response);
        };
        if (method?.match(/(post|put|patch)/i)) {
            let body;
            const chunks = [];
            request.on('data', (data) => chunks.push(data));
            request.on('end', function () {
                request.bodyBuffer = Buffer.concat(chunks);
                body = request.bodyBuffer.toString();
                const post = require('querystring').parse(body);
                request.body = body;
                request.params = post;
                doDispatch.call(dispatcher);
            });
        }
        else {
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
    staticListener(request, response) {
        const url = require('url').parse(request.url, true);
        const errorListener = this.errorListener;
        const filename = path_1.default.join(this.staticDirname, path_1.default.relative(this.staticUrlPrefix, url.pathname));
        if (filename.indexOf(this.staticDirname) !== 0) {
            errorListener(request, response);
            return;
        }
        require('fs').readFile(filename, function (err, file) {
            if (err) {
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
    getListener(url, method) {
        if (this.listeners[method]) {
            for (let i = 0, listener; i < this.listeners[method].length; i++) {
                listener = this.listeners[method][i];
                if (this.urlMatches(listener.url, url))
                    return listener.cb;
            }
        }
        else {
            return;
        }
    }
    /**
     * Return the Callback filter that matches the URL and method requested.
     * @param url - The URL requested.
     * @param type - The type of the filter, "before" or "after, for which the Callback should be returned.
     * @returns Callback
     */
    getFilters(url, type) {
        const filters = [];
        for (let i = 0, filter; i < this.filters[type].length; i++) {
            filter = this.filters[type][i];
            if (this.urlMatches(filter.url, url))
                filters.push(filter.cb);
        }
        return filters;
    }
    /**
     * Will determine if there is a match for a _url_ given a _config_.
     * @param config - String, RegExp, or Function that will match and/or return true with a provided URL string.
     * @param url - The string that will be passed to config() or compared (===) with config or matched with config.test() to return a boolean.
     */
    urlMatches(config, url) {
        if (config instanceof RegExp)
            return config.test(url);
        if (util_1.default.inspect(config) === '[Function]')
            return config(url);
        return config === url;
    }
    HttpChain() {
        this.queue = [];
    }
    add(cb) {
        this.queue.push(cb);
    }
    addAll(cbs) {
        for (let i = 0; i < cbs.length; i++)
            this.add(cbs[i]);
    }
    next(req, res) {
        const cb = this.queue.shift();
        if (cb)
            cb(req, res, this);
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
exports.default = HTTPDispatcher;
//# sourceMappingURL=dispatcher.js.map