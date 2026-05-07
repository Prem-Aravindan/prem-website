import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const username = process.env.GITHUB_USERNAME || 'Prem-Aravindan';
const token = process.env.GITHUB_TOKEN;
const githubBaseUrl = 'https://api.github.com';
const outputPath = path.resolve('src/data/githubActivity.ts');
const activityDays = process.env.GITHUB_ACTIVITY_DAYS || 'all';

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

async function githubFetch(pathname, params = {}) {
  const url = new URL(pathname, githubBaseUrl);
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null) {
      url.searchParams.set(key, String(value));
    }
  }

  const headers = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': 'prem-website-activity-generator',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(url, { headers });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`GitHub ${response.status} for ${url.pathname}: ${details.slice(0, 300)}`);
  }

  return {
    data: await response.json(),
    link: response.headers.get('link'),
  };
}

function getNextPage(linkHeader) {
  if (!linkHeader) return null;

  const nextLink = linkHeader
    .split(',')
    .map((part) => part.trim())
    .find((part) => part.endsWith('rel="next"'));

  if (!nextLink) return null;

  const match = nextLink.match(/[?&]page=(\d+)/);
  return match ? Number.parseInt(match[1], 10) : null;
}

async function fetchAllPages(pathname, params) {
  const all = [];
  let page = 1;

  while (page) {
    const { data, link } = await githubFetch(pathname, { ...params, page, per_page: 100 });
    all.push(...data);
    page = getNextPage(link);
  }

  return all;
}

function buildDailyCounts(commits) {
  const daily = new Map();
  const seenCommits = new Set();

  for (const commit of commits) {
    const sha = commit.sha;

    if (seenCommits.has(sha)) {
      continue;
    }

    seenCommits.add(sha);
    const date = formatDay(new Date(commit.commit?.author?.date || commit.commit?.committer?.date));
    daily.set(date, (daily.get(date) || 0) + 1);
  }

  return [...daily.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, count]) => ({ date, count }));
}

function toTs(data) {
  return `import type { GitLabActivityData } from './gitlabActivityTypes';\n\nexport const githubActivity = ${JSON.stringify(data, null, 2)} satisfies GitLabActivityData;\n`;
}

const repos = await fetchAllPages(`/users/${username}/repos`, {
  type: 'owner',
  sort: 'updated',
  direction: 'desc',
});

const activity = [];

for (const repo of repos.filter((repo) => !repo.fork)) {
  const commitParams = {
    author: username,
  };

  if (since) {
    commitParams.since = since.toISOString();
  }

  const commits = await fetchAllPages(`/repos/${repo.full_name}/commits`, commitParams);
  const dailyCommits = buildDailyCounts(commits);

  activity.push({
    id: repo.id,
    name: repo.name,
    pathWithNamespace: repo.full_name,
    webUrl: repo.html_url,
    lastActivityAt: repo.pushed_at,
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
        .flatMap((repo) => repo.dailyCommits.map((day) => day.date))
        .sort()[0] || null,
  until: now.toISOString(),
  source: 'https://github.com',
  authorFilter: username,
  refs: 'default branch',
  projects: activity.filter((repo) => repo.totalCommits > 0),
};

await mkdir(path.dirname(outputPath), { recursive: true });
await writeFile(outputPath, toTs(data), 'utf8');

console.log(`Wrote ${data.projects.length} GitHub repo heatmaps to ${outputPath}`);
