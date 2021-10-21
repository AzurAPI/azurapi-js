// api_chapters.ts
/**
 * Extended chapter api functions
 * @packageDocumentation
 */
import { Chapter, SubChapter } from '../../types/chapter';
import API, { Language, normalize } from './api';
import { AzurAPI } from '../Client';

/**
   * Special chapter class for extended functionality
   */
export class Chapters extends API<Chapter> {
  /**
     * Constructor
     * @param client An AzurAPI instance
     */
  constructor(client: AzurAPI) {
    super(client);
  }

  /**
   * Get chapter by name
   * @param name Chapter name
   * @param languages Language to search
   */
  name(name: string, languages: Language[] = ['en', 'cn', 'jp']): Chapter | SubChapter | undefined {
    for (let chapter of this.raw) if (languages.some(lang => chapter.names[lang] && normalize(chapter.names[lang].toUpperCase()) === normalize(name.toUpperCase()))) return chapter;
    /*for (let chapter of this.raw) {
      for (let sub of chapter) if (languages.some(lang => sub.names[lang] && normalize(sub.names[lang].toUpperCase()) === normalize(name.toUpperCase()))) return sub;
    }*/
    return undefined;
  }
}
