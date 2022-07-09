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
  name(name: string, languages: Language[] = ['en', 'cn', 'jp']): (Chapter | SubChapter)[] | [] {
    let result: (Chapter | SubChapter)[] = [];
    for (let chapter of this.raw) {
      if (
        languages.some(
          (lang) =>
            chapter.names[lang] &&
            normalize(chapter.names[lang].toUpperCase()) === normalize(name.toUpperCase())
        )
      )
        result.push(chapter);
      for (let sub of Object.values(chapter)) {
        if (sub.names !== undefined) {
          if (
            languages.some(
              (lang) =>
                sub.names[lang] &&
                normalize(sub.names[lang].toUpperCase()) === normalize(name.toUpperCase())
            )
          )
            result.push(sub);
        }
      }
    }
    return result;
  }
}
