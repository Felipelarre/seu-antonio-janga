/* ==========================================================================
   SEU ANTÔNIO JANGA — cardapio.js
   Real-Time Instant Search + Category Filter Tabs + Deep Link Sync
   ========================================================================== */

(function () {
  'use strict';

  const filters = document.querySelectorAll('.menu-filter');
  const categories = document.querySelectorAll('.menu-category');
  const searchInput = document.getElementById('menu-search-input');
  const emptyState = document.getElementById('menu-empty-state');

  let currentFilter = 'todos';
  let searchQuery = '';

  function applyFiltersAndSearch() {
    let totalVisible = 0;

    categories.forEach(function (cat) {
      const catKey = cat.getAttribute('data-category');
      const categoryMatchesTab = (currentFilter === 'todos' || catKey === currentFilter);

      const items = cat.querySelectorAll('.menu-item');
      let visibleInCat = 0;

      items.forEach(function (item) {
        const searchText = (item.getAttribute('data-search-text') || '') + ' ' + item.textContent;
        const matchesSearch = !searchQuery || searchText.toLowerCase().includes(searchQuery.toLowerCase());

        if (categoryMatchesTab && matchesSearch) {
          item.style.display = '';
          visibleInCat++;
          totalVisible++;
        } else {
          item.style.display = 'none';
        }
      });

      // Show/hide category based on whether any item inside matches
      if (categoryMatchesTab && (visibleInCat > 0 || !searchQuery)) {
        cat.style.display = '';
      } else {
        cat.style.display = 'none';
      }
    });

    if (emptyState) {
      if (totalVisible === 0) {
        emptyState.classList.add('is-visible');
      } else {
        emptyState.classList.remove('is-visible');
      }
    }
  }

  // Category Tab Clicks
  filters.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filters.forEach(function (b) {
        b.classList.remove('is-active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('is-active');
      btn.setAttribute('aria-selected', 'true');

      currentFilter = btn.getAttribute('data-filter');

      // Update URL hash without jumping page
      if (history.replaceState) {
        const hash = currentFilter === 'todos' ? '' : '#' + currentFilter;
        history.replaceState(null, '', location.pathname + hash);
      }

      applyFiltersAndSearch();
    });
  });

  // Instant Search Input
  if (searchInput) {
    searchInput.addEventListener('input', function (e) {
      searchQuery = e.target.value.trim();
      applyFiltersAndSearch();
    });
  }

  // Honor initial hash deep link (e.g. cardapio.html#drinks)
  const initialHash = location.hash ? decodeURIComponent(location.hash.slice(1)) : 'todos';
  const initialBtn = Array.prototype.slice.call(filters).find(function (btn) {
    return btn.getAttribute('data-filter') === initialHash;
  });
  if (initialBtn) {
    filters.forEach(function (b) {
      b.classList.remove('is-active');
      b.setAttribute('aria-selected', 'false');
    });
    initialBtn.classList.add('is-active');
    initialBtn.setAttribute('aria-selected', 'true');
    currentFilter = initialHash;
    applyFiltersAndSearch();
  }
})();
