import React, { useState } from "react";
import axios from "axios";
import NewsItem from "./NewsItem";

function NewsList() {
  const [results, setResults] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const getArticles = async () => {
    if (!input.trim()) {
      setResults([]);
      setError("Enter a topic, company, or country to search the latest headlines.");
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      const response = await axios.get(
        `https://newsdata.io/api/1/news?apikey=${process.env.REACT_APP_NEWS_API_KEY}&q=${input}`
      );

      setResults(response.data.results || []);
    } catch (error) {
      console.error(error);
      setError("Something went wrong while loading articles. Try another search.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    getArticles(); // Send the API request when the form is submitted
  };

  return (
    <main className="news-page">
      <section className="hero-panel">
        <p className="eyebrow">Live news search</p>
        <h1>Find a sharper view of the story.</h1>
        <p className="hero-copy">
          Search global coverage by keyword and scan the latest articles in a
          cleaner, easier-to-read layout.
        </p>

        <form className="search-panel" onSubmit={handleFormSubmit}>
          <label className="search-panel__label" htmlFor="news-search">
            Search the news
          </label>
          <div className="search-panel__controls">
            <input
              id="news-search"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Try: AI regulation, Tesla, Germany"
            />
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Searching..." : "Search"}
            </button>
          </div>
        </form>
      </section>

      <section className="results-shell">
        <div className="results-header">
          <div>
            <p className="results-header__label">Results</p>
            <h2>{results.length ? `${results.length} articles found` : "Start with a search"}</h2>
          </div>
          <p className="results-header__hint">
            Headlines, summaries, images, and source details update after each query.
          </p>
        </div>

        {error ? <div className="status-banner status-banner--error">{error}</div> : null}
        {isLoading ? (
          <div className="status-banner">Loading the latest coverage...</div>
        ) : null}
        {!isLoading && !error && results.length === 0 ? (
          <div className="empty-state">
            <h3>Search for a topic to populate your feed.</h3>
            <p>
              Use a company name, person, technology, or country to pull in current
              reporting.
            </p>
          </div>
        ) : null}

        <div className="news-grid">
          {results.map((result, index) => (
            <NewsItem
              key={result.link || `${result.title || "article"}-${index}`}
              article={result}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default NewsList;
