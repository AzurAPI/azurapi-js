export interface ops {
    name: string;
    version: string;
    functions: {
        update: any;
        methods?: {
            ship: any;
            equipments: any;
            chapters: any;
            voicelines: any;
            barrage: any;
        };
    };
}
export default class PluginSource {
    sources: any[];
    constructor();
    register(plugin: ops): void;
    get(plugin: string): any;
}
