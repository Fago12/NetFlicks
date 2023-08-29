export const mapGenreIdsToNames = (genre_ids, genres) => {
  return genre_ids.map(
    (genre_id) => genres.find((genre) => genre.id === genre_id).name
  );
};
