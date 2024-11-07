export const addToFavorites = (episode) => {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  if (!favorites.some((fav) => fav.id === episode.id)) {
    favorites.push(episode);
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }
};

export const removeFromFavorites = (episodeId) => {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  favorites = favorites.filter((fav) => fav.id !== episodeId);
  localStorage.setItem("favorites", JSON.stringify(favorites));
};

export const getFavorites = () => {
  return JSON.parse(localStorage.getItem("favorites")) || [];
};

export const resetFavorites = () => {
  localStorage.removeItem("favorites");
};
