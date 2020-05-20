import externalRequest from '../utils/externalRequest';
export const REQUEST_EPISODES = 'REQUEST_EPISODES';
export const RECEIVE_EPISODES = 'RECEIVE_EPISODES';

const requestEpisodes = (showId) => ({
  type: REQUEST_EPISODES,
  id: showId,
});

const receiveEpisodes = (showId, episodes) => ({
  type: RECEIVE_EPISODES,
  id: showId,
  episodes,
});

export const handleRequestEpisodes = (showId) => async (dispatch) => {
  try {
    dispatch(requestEpisodes(showId));
    const { data } = await externalRequest.get(`https://api.tvmaze.com/shows/${showId}/episodes`);

    dispatch(receiveEpisodes(showId, data));
  } catch (error) {
    console.log(error);
    // Try again after waiting
    setTimeout(() => {
      dispatch(handleRequestEpisodes(showId));
    }, 5000);
  }
};
