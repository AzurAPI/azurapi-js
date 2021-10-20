import { Datatype } from '.';
import { createSection, Section } from './stateManager';

export interface ToolsStore {
  versionSection: Section<VersionSection>;
}
export interface VersionSection {
  version: VersionState | null;
}
export type VersionState = {
  [key in Datatype]: DataVersion;
} & { 'version-number': number };
interface DataVersion {
  'version-number': number;
  'last-data-refresh-date'?: number;
  hash?: string;
}

export const createToolsStore = (): ToolsStore => ({
  versionSection: createSection<VersionSection>({
    state: {
      version: {
        ships: { 'version-number': null },
        voicelines: { 'version-number': null },
        chapters: { 'version-number': null },
        barrages: { 'version-number': null },
        equipments: { 'version-number': null },
        'version-number': null,
      },
    },
    actions: {
      setVersion: (payload: VersionState, state) => {
        state.version = payload;
      },
    },
  }),
});
