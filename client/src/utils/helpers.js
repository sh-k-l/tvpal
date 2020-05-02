export const handleEpisodeNumber = (season, episode) => {
  season = '' + season;
  episode = '' + episode;
  season = season.length === 1 ? '0' + season : season;
  episode = episode.length === 1 ? '0' + episode : episode;

  return `S${season}E${episode}`;
};

export const handleDate = (d) => {
  const date = new Date(Date.parse(d));
  return date.toLocaleDateString() !== 'Invalid Date' ? date.toLocaleDateString() : '';
};
