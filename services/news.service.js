import axios from 'axios';

const BASE_URL = 'https://newsapi.org/v2';
const DEFAULT_TTL = 5 * 60 * 1000; // 5 minutes

// NOTE: do NOT read NEWS_API_KEY at module load time (ESM imports are hoisted)
// read it inside request functions so dotenv.config() in app.js can run first.

const cache = new Map();

function getCache(key) {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expires) { cache.delete(key); return null; }
  return entry.data;
}

function setCache(key, data, ttl = DEFAULT_TTL) {
  cache.set(key, { data, expires: Date.now() + ttl });
}

async function fetchFromNewsApi(endpoint, params = {}) {
  const apiKey = process.env.NEWS_API_KEY;
  if (!apiKey) throw new Error('NEWS_API_KEY is not set');
  const q = { apiKey, ...params };
  const cacheKey = `${endpoint}|${JSON.stringify(q)}`;
  const cached = getCache(cacheKey);
  if (cached) return cached;
  try {
    const resp = await axios.get(`${BASE_URL}${endpoint}`, { params: q });
    setCache(cacheKey, resp.data);
    return resp.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || err.message);
  }
}

export async function getTopHeadlines({ country = 'us', category, pageSize = 20, page = 1 } = {}) {
  const params = { country, pageSize, page };
  if (category) params.category = category;
  return await fetchFromNewsApi('/top-headlines', params);
}

export async function searchEverything({ q, pageSize = 20, page = 1, sortBy = 'publishedAt' } = {}) {
  if (!q) throw new Error('query (q) is required');
  return await fetchFromNewsApi('/everything', { q, pageSize, page, sortBy });
}

export async function getByCategory(category, options = {}) {
  return await getTopHeadlines({ category, ...options });
}
