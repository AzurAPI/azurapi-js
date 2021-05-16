/// <reference types="node" />
import { EventEmitter } from 'events';
export declare class Server extends EventEmitter {
    port: number;
    private handle;
    private client;
    private server;
    constructor(port?: number);
}
