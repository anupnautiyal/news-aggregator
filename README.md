# News Aggregator 📰

A simple news aggregator built with Node.js, Express and EJS that uses the NewsAPI service to fetch headlines and search results.

---

## 🚀 Features

- Fetch top headlines (country & category)
- Search news articles with query strings
- Simple in-memory caching (default 5 minutes)
- Rate-limited routes to protect NewsAPI usage

---

## 📋 Prerequisites

- Node.js 18+ and npm
- A NewsAPI API key (get one at https://newsapi.org/)

---

## 🔧 Setup

1. Clone the repository:

```bash
git clone <repo-url>
cd news-aggregator
```

2. Install dependencies:

```bash
npm install
```

3. Add a `.env` file in the project root with your API key:

```
NEWS_API_KEY=your_newsapi_key_here
PORT=3000
```

> Note: `.env` is included in `.gitignore`—do not commit your secret key.

---

## ▶️ Run

```bash
npm start
# or
node app.js
```

Open http://localhost:3000

---

## ✅ Available routes

- `GET /` — Home page with top headlines (default country: US)
- `GET /search?q=keyword` — Search articles for `keyword`
- `GET /category/:category` — View top headlines by category (e.g., `business`, `technology`, `sports`)

---

## 🧠 Implementation notes

- `services/news.service.js` wraps NewsAPI calls and includes a simple in-memory cache with a 5-minute TTL.
- `middleware/ratelimit.middleware.js` applies a rate limit (default: 30 requests/min) to the news router.
- Views use EJS templates (`views/`) and partials for header/footer.

### Production considerations

- In-memory cache is fine for development but use Redis (or another external store) in production to share cache across instances.
- Be mindful of NewsAPI rate limits and usage tiers. Consider server-side caching and pagination to reduce requests.

---

## 🧪 Tests

No tests included yet. Recommended next steps:

- Add Jest for unit tests (`services/news.service.js` mocking axios)
- Add simple integration tests for routes

---

## 💡 Troubleshooting

- `Error: NEWS_API_KEY is not set` — ensure `.env` has `NEWS_API_KEY` and restart the server.
- If Node is not found, check Node installation: `node -v`

---

## Contributing

Contributions welcome—feel free to open issues or PRs.

---

## License

MIT
