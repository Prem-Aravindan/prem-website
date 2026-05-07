import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const token = process.env.GITLAB_TOKEN;
const gitlabBaseUrl = process.env.GITLAB_BASE_URL || 'https://gitlab.com';
const outputPath = path.resolve('src/data/gitlabActivity.ts');
const activityDays = process.env.GITLAB_ACTIVITY_DAYS || 'all';
const includeAllRefs = process.env.GITLAB_INCLUDE_ALL_REFS === 'true';
const configuredAuthorIdentities = (process.env.GITLAB_AUTHOR_IDENTITIES || '')
  .split(',')
  .map((identity) => identity.trim())
  .filter(Boolean);

if (!token) {
  console.error('Missing GITLAB_TOKEN environment variable.');
  process.exit(1);
}

const now = new Date();
const daysToFetch = activityDays.toLowerCase() === 'all'
  ? null
  : Number.parseInt(activityDays, 10);
const since = daysToFetch
  ? new Date(now)
  : null;

if (since) {
  since.setUTCDate(since.getUTCDate() - Math.max(daysToFetch - 1, 1));
  since.setUTCHours(0, 0, 0, 0);
}

const formatDay = (date) => date.toISOString().slice(0, 10);
const encodeProjectId = (id) => encodeURIComponent(String(id));

async function gitlabFetch(pathname, params = {}) {
  const url = new URL(pathname, gitlabBaseUrl);
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null) {
      url.searchParams.set(key, String(value));
    }
  }

  const response = await fetch(url, {
    headers: {
      'PRIVATE-TOKEN': token,
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`GitLab ${response.status} for ${url.pathname}: ${details.slice(0, 300)}`);
  }

  return {
    data: await response.json(),
    nextPage: response.headers.get('x-next-page'),
  };
}

async function fetchAllPages(pathname, params) {
  const all = [];
  let page = 1;

  while (page) {
    const { data, nextPage } = await gitlabFetch(pathname, { ...params, page, per_page: 100 });
    all.push(...data);
    page = nextPage ? Number.parseInt(nextPage, 10) : 0;
  }

  return all;
}

function buildDailyCounts(commits) {
  const daily = new Map();
  const seenCommits = new Set();

  for (const commit of commits) {
    if (seenCommits.has(commit.id)) {
      continue;
    }

    seenCommits.add(commit.id);
    const date = formatDay(new Date(commit.committed_date || commit.created_at));
    daily.set(date, (daily.get(date) || 0) + 1);
  }

  return [...daily.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, count]) => ({ date, count }));
}

function toTs(data) {
  return `import type { GitLabActivityData } from './gitlabActivityTypes';\n\nexport const gitlabActivity = ${JSON.stringify(data, null, 2)} satisfies GitLabActivityData;\n`;
}

function normalizeIdentity(value) {
  return String(value || '').trim().toLowerCase();
}

function commitMatchesAuthor(commit, authorIdentities) {
  const commitIdentities = [
    commit.author_email,
    commit.committer_email,
    commit.author_name,
    commit.committer_name,
  ].map(normalizeIdentity);

  return commitIdentities.some((identity) => authorIdentities.has(identity));
}

const currentUser = await gitlabFetch('/api/v4/user');
const authorIdentities = new Set(
  [
    currentUser.data.email,
    currentUser.data.public_email,
    currentUser.data.commit_email,
    currentUser.data.name,
    currentUser.data.username,
    ...configuredAuthorIdentities,
  ]
    .map(normalizeIdentity)
    .filter(Boolean)
);

if (authorIdentities.size === 0) {
  console.error('Could not determine a GitLab author identity. Set GITLAB_AUTHOR_IDENTITIES=name-or-email.');
  process.exit(1);
}

const projects = await fetchAllPages('/api/v4/projects', {
  membership: true,
  simple: true,
  order_by: 'last_activity_at',
  sort: 'desc',
});

const activity = [];

for (const project of projects) {
  const commitParams = {
    until: now.toISOString(),
  };

  if (includeAllRefs) {
    commitParams.all = true;
  }

  if (since) {
    commitParams.since = since.toISOString();
  }

  const commits = await fetchAllPages(`/api/v4/projects/${encodeProjectId(project.id)}/repository/commits`, commitParams);

  const ownCommits = commits.filter((commit) => commitMatchesAuthor(commit, authorIdentities));
  const dailyCommits = buildDailyCounts(ownCommits);

  activity.push({
    id: project.id,
    name: project.name,
    pathWithNamespace: project.path_with_namespace,
    webUrl: project.web_url,
    lastActivityAt: project.last_activity_at,
    totalCommits: dailyCommits.reduce((sum, day) => sum + day.count, 0),
    activeDays: dailyCommits.length,
    dailyCommits,
  });
}

const data = {
  generatedAt: now.toISOString(),
  since: since
    ? since.toISOString()
    : activity
        .flatMap((project) => project.dailyCommits.map((day) => day.date))
        .sort()[0] || null,
  until: now.toISOString(),
  source: gitlabBaseUrl,
  authorFilter: configuredAuthorIdentities.length > 0
    ? `authenticated GitLab user plus ${configuredAuthorIdentities.join(', ')}`
    : 'authenticated GitLab user',
  refs: includeAllRefs ? 'all refs' : 'default branch',
  projects: activity.filter((project) => project.totalCommits > 0),
};

await mkdir(path.dirname(outputPath), { recursive: true });
await writeFile(outputPath, toTs(data), 'utf8');

console.log(`Wrote ${data.projects.length} GitLab project heatmaps to ${outputPath}`);
