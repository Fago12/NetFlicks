const getGenres = function (genreList) {
  const newGenreList = [];
  for (const { name } of genreList) {
    newGenreList.push(name);
  }
  return newGenreList.join(', ');
};

const getCasts = function (castList) {
  const newCastList = [];
  for (let i = 0, len = castList.length; i < len && i < 10; i++) {
    const { name } = castList[i];
    newCastList.push(name);
  }
  return newCastList.join(', ');
};

const getDirectors = function (crewList) {
  const directors = crewList.filter(({ job }) => job === 'Director');
  const directorList = [];
  for (const { name } of directors) {
    directorList.push(name);
  }
  return directorList.join(', ');
};

const filterVideos = function (videoList) {
  return videoList.filter(
    ({ type, site }) =>
      (type === 'Trailer' || type === 'Teaser') && site === 'YouTube'
  );
};

export { getGenres, getCasts, getDirectors, filterVideos };
