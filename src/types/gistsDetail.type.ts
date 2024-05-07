import { GistFileType } from './gistsFile.type';

export type GistDetailsType = {
  id: string;
  owner: {
    avatar_url: string;
    login: string;
    name: string;
  };
  created_at: Date;
  updated_at: Date;
  forks: [];
  filename: string;
  content: string;
  files: GistFileType[];
  description: string;
};
