import React, { useState, useEffect } from 'react';
import axios from 'axios';
import externalRequest from '../../utils/externalRequest';
import Modal from '../Modal';
import ShowList from './ShowList';

const ShowAddingModal = ({ toggleVisibleModal, isOpen }) => {
  const [search, setSearch] = useState('');
  const [shows, setShows] = useState(null);

  useEffect(() => {
    if (search.length < 4) {
      setShows(null);
      return;
    }
    let source = axios.CancelToken.source();

    const loadData = async () => {
      try {
        const response = await externalRequest.get(
          `http://api.tvmaze.com/search/shows?q=${search}`,
          {
            cancelToken: source.token,
          }
        );
        setShows(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    loadData();

    return () => {
      source.cancel();
    };
  }, [search]);

  return (
    <Modal toggleVisibleModal={toggleVisibleModal} isOpen={isOpen} direction={'right'}>
      <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
      <ShowList shows={shows} />
    </Modal>
  );
};

export default ShowAddingModal;
