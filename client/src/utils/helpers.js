export const handleEpisodeNumber = (season, episode) => {
  season = '' + season;
  episode = '' + episode;
  season = season.length === 1 ? '0' + season : season;
  episode = episode.length === 1 ? '0' + episode : episode;

  const out = `S${season}E${episode}`;

  if (out.length > 6) {
    return season;
  }

  return out;
};

export const handleDate = (d) => {
  const date = new Date(Date.parse(d));
  return date.toLocaleDateString() !== 'Invalid Date' ? date.toLocaleDateString() : '';
};

export const create2DArray = (numRows) => {
  let array = new Array(numRows);

  for (let i = 0; i < numRows; i++) {
    array[i] = [];
  }

  return array;
};
