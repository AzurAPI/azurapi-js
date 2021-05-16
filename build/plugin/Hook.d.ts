declare type action = () => void;
export default class PluginHook {
    private hooks;
    constructor();
    register(name: string, action: action): Error | undefined;
    call(name: string, args: any[]): void;
}
export {};
