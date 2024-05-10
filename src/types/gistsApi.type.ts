import { GistFileType } from './gistsFile.type';

export type GistApiType = {
  public: boolean;
  description?: string;
  files: { [key: string]: GistFileType | null };
};
