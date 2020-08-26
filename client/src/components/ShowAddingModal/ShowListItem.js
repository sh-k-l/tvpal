import React from 'react';

const ShowListItem = ({ show, alreadyAdded, addShowHandler, resetInput }) => {
  const handleAdd = async () => {
    if (alreadyAdded) return;

    const res = await addShowHandler({
      id: show.id,
      name: show.name,
      imdb: show.externals.imdb,
      image: show.image ? show.image.medium.replace(/^http:\/\//i, 'https://') : null,
      country: show.network ? show.network.country.code : null,
      status: show.status,
    });
    if (res === true) {
      resetInput();
    }
  };

  return (
    <li onClick={handleAdd}>
      <p className={alreadyAdded ? 'added' : null}>
        {' '}
        {show.network ? `${show.name} (${show.network.country.code}) ` : `${show.name} `}
        {alreadyAdded && <i className="far fa-check-circle"></i>}
      </p>
    </li>
  );
};

export default ShowListItem;
