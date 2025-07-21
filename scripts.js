fetch('data/articles.json')
  .then(res => res.json())
  .then(articles => {
    const list = document.querySelector('main');
    articles.forEach(a => {
      const card = document.createElement('div');
      card.className = "bg-white p-4 rounded shadow";
      card.innerHTML = `<h2 class="text-xl font-semibold">${a.title}</h2>
                        <p>${a.category} • ${a.language}</p>
                        <a href="articles/${a.slug}.html" class="text-blue-600">Read more</a>`;
      list.appendChild(card);
    });
    const fuse = new Fuse(articles, { keys: ['title', 'category'] });
    document.querySelector('#search').addEventListener('input', e => {
      list.innerHTML = '';
      const results = e.target.value ? fuse.search(e.target.value).map(r=>r.item) : articles;
      results.forEach(a => { /* same card creation code */ });
    });
  });
