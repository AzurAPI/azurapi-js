/// <reference types="node" />
import { AzurAPI } from '../Client';
export default class Updater {
    cron?: NodeJS.Timeout;
    private client;
    /**
     * Constructor
     * @param client AzurAPI instance
     */
    constructor(client: AzurAPI);
    /**
     * Check for updates then update and load cache
     */
    update(): Promise<void[] | undefined>;
    /**
     * Start cron job
     */
    start(): void;
    /**
     * Stop cron job
     */
    stop(): void;
    /**
     * Check if folder and JSON files exist then load cache
     */
    init(): Promise<void>;
    /**
     * Load the cache
     */
    load(): Promise<void[] | undefined> | undefined;
}
