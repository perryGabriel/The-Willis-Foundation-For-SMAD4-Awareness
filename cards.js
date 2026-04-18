(function () {
  function escapeHtml(value) {
    return String(value)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;');
  }

  function createCard(card) {
    const article = document.createElement('article');
    article.className = 'content-card';

    const heading = document.createElement('h3');
    heading.className = 'content-card-title';

    if (card.url) {
      const link = document.createElement('a');
      link.href = card.url;
      link.textContent = card.title || 'Untitled card';
      link.target = card.external === false ? '_self' : '_blank';
      link.rel = card.external === false ? '' : 'noopener noreferrer';
      heading.appendChild(link);
    } else {
      heading.textContent = card.title || 'Untitled card';
    }

    article.appendChild(heading);

    if (card.description) {
      const body = document.createElement('p');
      body.className = 'content-card-description';
      body.textContent = card.description;
      article.appendChild(body);
    }

    const meta = [];
    if (card.type) meta.push(`<span class="card-chip">${escapeHtml(card.type)}</span>`);
    if (card.source) meta.push(`<span>${escapeHtml(card.source)}</span>`);
    if (card.date) meta.push(`<time datetime="${escapeHtml(card.date)}">${escapeHtml(card.date)}</time>`);

    if (meta.length > 0) {
      const metaLine = document.createElement('p');
      metaLine.className = 'content-card-meta';
      metaLine.innerHTML = meta.join(' · ');
      article.appendChild(metaLine);
    }

    if (Array.isArray(card.tags) && card.tags.length > 0) {
      const tags = document.createElement('ul');
      tags.className = 'card-tag-list';
      for (const tag of card.tags) {
        const item = document.createElement('li');
        item.className = 'card-tag';
        item.textContent = tag;
        tags.appendChild(item);
      }
      article.appendChild(tags);
    }

    return article;
  }


  async function resourceExists(path) {
    try {
      const response = await fetch(path, { method: 'HEAD' });
      return response.ok;
    } catch (error) {
      console.warn(`Unable to check favicon path: ${path}`, error);
      return false;
    }
  }

  async function configureFavicon() {
    const preferredIcon = 'favicon-custom.png';
    const fallbackIcon = 'favicon-default.svg';
    const iconPath = (await resourceExists(preferredIcon)) ? preferredIcon : fallbackIcon;

    let iconLink = document.querySelector('link[rel~="icon"]');
    if (!iconLink) {
      iconLink = document.createElement('link');
      iconLink.rel = 'icon';
      document.head.appendChild(iconLink);
    }

    iconLink.href = iconPath;
  }

  async function loadCards(section) {
    const cardsPath = section.dataset.cardsPath;
    const indexFile = section.dataset.indexFile || 'index.json';
    if (!cardsPath) return;

    const status = section.querySelector('[data-card-status]');
    const grid = section.querySelector('[data-card-grid]');

    try {
      const indexResponse = await fetch(`${cardsPath}/${indexFile}`);
      if (!indexResponse.ok) {
        throw new Error(`Unable to load card index: ${indexResponse.status}`);
      }

      const indexData = await indexResponse.json();
      const files = Array.isArray(indexData.cards) ? indexData.cards : [];

      if (files.length === 0) {
        if (status) status.textContent = 'No cards added yet.';
        return;
      }

      const cardResponses = await Promise.all(files.map((file) => fetch(`${cardsPath}/${file}`)));
      const cards = await Promise.all(
        cardResponses.map(async (response, i) => {
          if (!response.ok) {
            throw new Error(`Unable to load card file: ${files[i]}`);
          }
          return response.json();
        })
      );

      if (status) status.remove();
      for (const card of cards) {
        grid.appendChild(createCard(card));
      }
    } catch (error) {
      if (status) {
        status.textContent = 'Could not load cards. Confirm paths and run this site from a local web server.';
      }
      console.error(error);
    }
  }

  window.addEventListener('DOMContentLoaded', () => {
    configureFavicon();

    const sections = document.querySelectorAll('[data-card-section]');
    sections.forEach(loadCards);
  });
})();
