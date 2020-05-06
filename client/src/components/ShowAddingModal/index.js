import React, { useState, useEffect } from 'react';
import axios from 'axios';
import externalRequest from '../../utils/externalRequest';
import Modal from '../Modal';
import ShowList from './ShowList';

const ShowAddingModal = ({ toggleVisibleModal, isOpen }) => {
  const [search, setSearch] = useState('');
  const [shows, setShows] = useState(null);

  useEffect(() => {
    if (search.length == 0) {
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
      <div className="show-adder">
        <h4>Add New Show</h4>
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={`e.g. "Breaking Bad"`}
        />
        <ShowList shows={shows} />
      </div>
    </Modal>
  );
};

export default ShowAddingModal;
