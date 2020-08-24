import React, { useState } from 'react';
import { connect } from 'react-redux';
import moment from 'moment/moment';
import { create2DArray, handleEpisodeNumber } from '../../utils/helpers';
import { handleToggleModal } from '../../actions/modals';
import CalenderItem from './CalenderItem';
import WeekPicker from './WeekPicker';

const WEEKCOUNT = 4;
const LIMIT = 7 * WEEKCOUNT;
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const Calendar = ({ episodesAsDays, toggleManageShow }) => {
  const startDate = moment().startOf('isoWeek');
  const [week, setWeek] = useState(0);

  const weekIncrement = () => {
    setWeek((week + 1) % WEEKCOUNT);
  };

  const weekDecrement = () => {
    if (week - 1 < 0) {
      setWeek(WEEKCOUNT - 1);
    } else {
      setWeek(week - 1);
    }
  };

  return (
    <div className="content calendar content-box">
      <WeekPicker
        startDate={startDate}
        week={week}
        weekIncrement={weekIncrement}
        weekDecrement={weekDecrement}
      />
      <div className="days-wrapper">
        {DAYS.map((day, index) => {
          const date = startDate.clone().add(week * 7 + index, 'day');
          const isToday = moment(date).isSame(moment(), 'day');

          return (
            <div key={index} className={`day ${isToday && 'today'}`}>
              <div className="head">
                {day}
                <span>{date.format('DD/MM')}</span>
              </div>
              <div className="tail">
                {episodesAsDays &&
                  Object.keys(episodesAsDays).length !== 0 &&
                  episodesAsDays[week * 7 + index].map((ep) => (
                    <CalenderItem key={ep.id} episode={ep} toggleManageShow={toggleManageShow} />
                  ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { shows, episodes } = state;
  const startDate = moment().startOf('isoWeek');

  const episodesToAir = [];

  if (!shows) return {};

  shows.forEach((show) => {
    // Skips shows without episode data
    if (typeof episodes[show.id] === 'undefined' || episodes[show.id] === null) {
      return;
    }

    // Check episodes against seen episodes
    const toAir = episodes[show.id]
      .filter((ep) => {
        return moment(ep.airstamp) >= startDate;
      })
      .map((ep) => {
        const episode = { ...ep };
        episode.show = show;
        return episode;
      });

    episodesToAir.push(...toAir);
  });

  // Sort episodes into day 2D array
  const episodesAsDays = create2DArray(LIMIT);

  episodesToAir.forEach((episode) => {
    const epDate = moment(episode.airstamp);
    const dayOffset = epDate.diff(startDate, 'days');
    if (dayOffset < LIMIT) {
      episodesAsDays[dayOffset].push({
        id: episode.id,
        name: episode.name,
        showName: episode.show.name,
        showId: episode.show.id,
        number: handleEpisodeNumber(episode.season, episode.number),
        image: episode.show.image,
      });
    }
  });

  return { episodesAsDays };
};

const mapDispatchToProps = (dispatch) => ({
  toggleManageShow: (showId) => dispatch(handleToggleModal('manage-show', showId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
