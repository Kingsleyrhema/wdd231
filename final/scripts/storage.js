// storage.js
export function saveFavorites(id) {
  const fav = JSON.parse(localStorage.getItem('favorites')) || [];
  const updated = fav.includes(id)
    ? fav.filter(f => f !== id)
    : [...fav, id];
  localStorage.setItem('favorites', JSON.stringify(updated));
}

export function getFavorites() {
  return JSON.parse(localStorage.getItem('favorites')) || [];
}
