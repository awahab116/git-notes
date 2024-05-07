import { GistFileType } from './gistsFile.type';

export type Gist = {
  id: string;
  owner: {
    avatar_url: string;
    login: string;
    name: string;
  };
  created_at: Date;
  updated_at: Date;
  files: GistFileType[];
};
