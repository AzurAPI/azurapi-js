// WARNING: THIS DOESN'T WORK AT ALL BECAUSE I HAVEN'T DO JSON FILE DIRECORIES YET
import { readFileSync } from 'fs';

/**
 * Fetcher to grab anything from the local database
 */
export default class LocalFetcher {
  /**
   * Grabs JSON data from file
   * @param file The file's name and extension
   */
  async getLocal(file: string) {
    return JSON.parse(readFileSync(`/${file}`).toString());
  }
}
