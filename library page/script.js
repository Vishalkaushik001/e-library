async function searchBook() {
      const query = document.getElementById('searchInput').value.trim();
      const resultsBox = document.getElementById('results');
      resultsBox.innerHTML = '';

      if (!query) {
        resultsBox.innerHTML = '<div class="not-found">Please enter a search term.</div>';
        return;
      }

      try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`);
        const data = await response.json();

        if (data.totalItems === 0) {
          resultsBox.innerHTML = '<div class="not-found">❌ Book not found. Try another search.</div>';
        } else {
          const books = data.items;
          books.forEach(book => {
            const title = book.volumeInfo.title;
            const authors = book.volumeInfo.authors?.join(', ') || 'Unknown';
            const preview = book.volumeInfo.previewLink;

            const item = document.createElement('div');
            item.className = 'book-item';
            item.innerHTML = `<strong>${title}</strong><br><em>${authors}</em><br><a href="${preview}" target="_blank">🔗 View / Download PDF</a>`;
            resultsBox.appendChild(item);
          });
        }
      } catch (err) {
        resultsBox.innerHTML = '<div class="not-found">⚠️ Error fetching data. Try again later.</div>';
      }
    }