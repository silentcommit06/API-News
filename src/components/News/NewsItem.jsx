function NewsItem({ article }) {
  const {
    title,
    description,
    content,
    image_url: imageUrl,
    source_id: sourceId,
    pubDate,
    language,
    link,
  } = article;

  const formattedDate = pubDate
    ? new Date(pubDate).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Latest";

  return (
    <article className="news-card">
      <div className="news-card__media">
        {imageUrl ? (
          <img src={imageUrl} alt={title || "News article"} />
        ) : (
          <div className="news-card__placeholder">
            <span>Headline</span>
          </div>
        )}
      </div>

      <div className="news-card__content">
        <div className="news-card__meta">
          <span>{sourceId || "News Wire"}</span>
          <span>{formattedDate}</span>
          <span>{language || "global"}</span>
        </div>

        <h2>{title || "Untitled article"}</h2>
        <p>{description || content || "No summary available for this article yet."}</p>

        {content && content !== description ? (
          <p className="news-card__excerpt">{content}</p>
        ) : null}

        {link ? (
          <a
            className="news-card__link"
            href={link}
            target="_blank"
            rel="noreferrer"
          >
            Read article
          </a>
        ) : null}
      </div>
    </article>
  );
}

export default NewsItem;
