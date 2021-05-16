/// <reference types="node" />
import Http from 'http';
export default class HTTPDispatcher {
    listeners: {
        head: never[];
        get: never[];
        post: never[];
        put: never[];
        delete: never[];
        options: never[];
    };
    filters: {
        before: never[];
        after: never[];
    };
    errorListener(req: any, res: any): void;
    staticFolderPrefix: string;
    staticDirname: string | undefined;
    queue: any;
    staticUrlPrefix: any;
    /**
     * Generic function to set up request listener. Prefer onGet and onPost instead.
     * @param method - The HTTP method to response to: "get" or "post"
     * @param url - String, RegExp, or Function that will match and/or return true with a provided URL string.
     * @param callback - The function that will be called on match.
     */
    on(method: string, url: string | RegExp | HttpDispatcher.UrlMatcher, callback: HttpDispatcher.Callback): void;
    /**
     * What to do when a GET reqeust matches _url_.
     * @param url - String, RegExp, or Function that will match and/or return true with a provided URL string.
     * @param callback - The function that will be called on match.
     */
    filter(method: string, url: string | RegExp | HttpDispatcher.UrlMatcher, callback: HttpDispatcher.Callback): void;
    /**
     * What to do when a HEAD reqeust matches _url_.
     * @param url - String, RegExp, or Function that will match and/or return true with a provided URL string.
     * @param callback - The function that will be called on match.
     */
    onHead(url: string | RegExp | HttpDispatcher.UrlMatcher, callback: HttpDispatcher.Callback): void;
    /**
     * What to do when a GET reqeust matches _url_.
     * @param url - String, RegExp, or Function that will match and/or return true with a provided URL string.
     * @param callback - The function that will be called on match.
     */
    onGet(url: string | RegExp | HttpDispatcher.UrlMatcher, callback: HttpDispatcher.Callback): void;
    /**
     * What to do when a POST request matches _url_.
     * @param url - String, RegExp, or Function that will match and/or return true with a provided URL string.
     * @param callback - The function that will be called on match.
     */
    onPost(url: string | RegExp | HttpDispatcher.UrlMatcher, callback: HttpDispatcher.Callback): void;
    /**
     * What to do when a OPTIONS request matches _url_.
     * @param url - String, RegExp, or Function that will match and/or return true with a provided URL string.
     * @param callback - The function that will be called on match.
     */
    onOptions(url: string | RegExp | HttpDispatcher.UrlMatcher, callback: HttpDispatcher.Callback): void;
    /**
     * What to do when a PUT request matches _url_.
     * @param url - String, RegExp, or Function that will match and/or return true with a provided URL string.
     * @param callback - The function that will be called on match.
     */
    onPut(url: string | RegExp | HttpDispatcher.UrlMatcher, callback: HttpDispatcher.Callback): void;
    /**
     * What to do when a DELETE request matches _url_.
     * @param url - String, RegExp, or Function that will match and/or return true with a provided URL string.
     * @param callback - The function that will be called on match.
     */
    onDelete(url: string | RegExp | HttpDispatcher.UrlMatcher, callback: HttpDispatcher.Callback): void;
    /**
     * What function should be called when there is an error.
     * @param callback - The function that will be called on match.
     */
    onError(callback: HttpDispatcher.Callback): void;
    /**
     * Set the virtual folder for the static resources.
     * @param folder - Relative path in URL to static resources.
     */
    setStatic(folder: string): void;
    /**
     * Set the physical/local folder for the static resources.
     * @param dirname - Relative path in file system to static resources.
     */
    setStaticDirname(dirname: string): void;
    /**
     * Called before a route is handeled; can modify the request and response.
     * @param url - String, RegExp, or Function that will match and/or return true with a provided URL string.
     * @param callback - The function that will be called on match.
     */
    beforeFilter(url: any, callback: any): void;
    /**
     * Called after a route is handeled; can modify the request and response.
     * @param url - String, RegExp, or Function that will match and/or return true with a provided URL string.
     * @param callback - The function that will be called on match.
     */
    afterFilter(url: any, callback: any): void;
    /**
     * Main entry point for httpdispatcher. Http.CreateServer would call this.
     * @param request - A ClientRequest object from NodeJS _Http_ module.
     * @param response - A ClientResponse object from NodeJS _Http_ module.
     */
    dispatch(request: any, response: any): void;
    /**
     * Listen to requests for static assests and serve them from the file system.
     * @param request - A ClientRequest object from NodeJS _Http_ module.
     * @param response - A ClientResponse object from NodeJS _Http_ module.
     */
    staticListener(request: Http.IncomingMessage, response: Http.ServerResponse): void;
    /**
     * Return the Callback that matches the URL and method requested.
     * @param url - The URL requested.
     * @param method - The method, "get" or "post", that the URL was requested with.
     * @returns Callback
     */
    getListener(url: string, method: string): any;
    /**
     * Return the Callback filter that matches the URL and method requested.
     * @param url - The URL requested.
     * @param type - The type of the filter, "before" or "after, for which the Callback should be returned.
     * @returns Callback
     */
    getFilters(url: string, type: string): HttpDispatcher.Callback;
    /**
     * Will determine if there is a match for a _url_ given a _config_.
     * @param config - String, RegExp, or Function that will match and/or return true with a provided URL string.
     * @param url - The string that will be passed to config() or compared (===) with config or matched with config.test() to return a boolean.
     */
    urlMatches(config: string | RegExp | HttpDispatcher.UrlMatcher | any, url: string): boolean;
    HttpChain(): void;
    add(cb: any): void;
    addAll(cbs: any): void;
    next(req: any, res: any): void;
    stop(req: any, res: any): void;
    getWrapped(cb: any): (req: any, res: any, chain: any) => void;
}
declare namespace HttpDispatcher {
    interface ClientRequest extends Http.IncomingMessage {
        params: Record<string, unknown>;
        body?: string;
        bodyBuffer?: Buffer;
    }
    class HttpChain {
        constructor();
        add(callback: ChainCallback): void;
        addAll(callbacks: ChainCallback[]): void;
        next(req: ClientRequest, res: Http.ServerResponse): void;
    }
    interface Callback {
        (request: ClientRequest, response: Http.ServerResponse): void;
    }
    interface ChainCallback {
        (request: ClientRequest, response: Http.ServerResponse, chain: HttpChain): void;
    }
    interface UrlMatcher {
        (url: string): boolean;
    }
}
export {};
