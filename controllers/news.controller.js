import { getTopHeadlines, searchEverything } from "../services/news.service.js";

export async function home(req, res) {
  try {
    const data = await getTopHeadlines({ country: 'us', pageSize: 20 });
    res.render('home', { news: data.articles, meta: data });
  } catch (error) {
    console.error('home error', error);
    res.status(500).render('error', { error: error.message || 'Failed to fetch news' });
  }
}

export async function search(req, res) {
  const q = req.query.q;
  if (!q) return res.render('search', { news: [], query: '' });
  try {
    const data = await searchEverything({ q, pageSize: 20 });
    res.render('search', { news: data.articles, meta: data, query: q });
  } catch (error) {
    console.error('search error', error);
    res.status(500).render('error', { error: error.message || 'Search failed' });
  }
}

export async function category(req, res) {
  const categoryName = req.params.category;
  try {
    const data = await getTopHeadlines({ category: categoryName, pageSize: 20 });
    res.render('category', { news: data.articles, meta: data, category: categoryName });
  } catch (error) {
    console.error('category error', error);
    res.status(500).render('error', { error: error.message || 'Failed to fetch category' });
  }
}
