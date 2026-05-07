export type GitLabActivityDay = {
  date: string;
  count: number;
};

export type GitLabActivityProject = {
  id: number;
  name: string;
  pathWithNamespace: string;
  webUrl: string;
  lastActivityAt: string | null;
  totalCommits: number;
  activeDays: number;
  dailyCommits: GitLabActivityDay[];
};

export type GitLabActivityData = {
  generatedAt: string | null;
  since: string | null;
  until: string | null;
  source: string;
  authorFilter?: string;
  refs?: string;
  projects: GitLabActivityProject[];
};
