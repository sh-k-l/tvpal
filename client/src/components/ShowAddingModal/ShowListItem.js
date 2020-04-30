import React from 'react';

const ShowListItem = ({ show, alreadyAdded, addShowHandler }) => {
  const handleAdd = () => {
    addShowHandler({
      id: show.id,
      name: show.name,
      imdb: show.externals.imdb,
      image: show.image ? show.image.medium : null,
    });
  };

  return (
    <li onClick={handleAdd}>
      {show.name} {alreadyAdded && '- Added'}
    </li>
  );
};

export default ShowListItem;
