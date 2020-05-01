import React from 'react';

const ShowListItem = ({ show, alreadyAdded, addShowHandler }) => {
  const handleAdd = () => {
    if (alreadyAdded) return;

    addShowHandler({
      id: show.id,
      name: show.name,
      imdb: show.externals.imdb,
      image: show.image ? show.image.medium : null,
      country: show.network ? show.network.country.code : null,
    });
  };

  return (
    <li onClick={handleAdd}>
      <p className={alreadyAdded ? 'added' : null}>
        {' '}
        {show.name} {alreadyAdded && <i className="far fa-check-circle"></i>}
      </p>
    </li>
  );
};

export default ShowListItem;
