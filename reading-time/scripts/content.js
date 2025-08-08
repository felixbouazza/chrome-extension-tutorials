function renderReadingTime(article) {
  // If we weren't provided an article, we don't need to render anything.
  if (!article) {
    return;
  }

  const text = article.textContent;
  const wordMatchRegExp = /[^\s]+/g; // Regular expression
  const words = text.matchAll(wordMatchRegExp);
  // matchAll returns an iterator, convert to array to get word count
  const wordCount = [...words].length;
  const readingTime = Math.round(wordCount / 200);
  const badge = document.createElement("p");
  // Use the same styling as the publish information in an article's header
  badge.classList.add("color-secondary-text", "type--caption");
  badge.textContent = `⏱️ ${readingTime} min read`;

  // Support for API reference docs
  const heading = article.querySelector("h3");
  // Support for article docs with date
  const date = article.querySelector("time")?.parentNode;

  (date ?? heading).insertAdjacentElement("afterend", badge);
}

const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    // If a new article was added.
    for (const node of mutation.addedNodes) {
      if (node instanceof Element && node.tagName === 'ARTICLE') {
        // Render the reading time for this particular article.
        renderReadingTime(node);
      }
    }
  }
});

renderReadingTime(document.querySelector("article"));

observer.observe(document.querySelector('devsite-content'), {
  childList: true
});