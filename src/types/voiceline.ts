// voiceline.ts
/**
 * Voiceline types
 * @packageDocumentation
 */

export interface Voiceline {
    Default: Line[];
    Retrofit: Line[];
    [key: string]: Line[]
}

interface Line {
    event: string;
    en?: string;
    zh?: string;
    jp?: string;
    audio?: string;
}
