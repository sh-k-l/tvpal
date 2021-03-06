import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import externalRequest from '../../utils/externalRequest';
import Modal from '../Modal/Modal';
import ShowList from './ShowList';

const ShowAddingModal = ({ toggleVisibleModal, isOpen }) => {
  const [search, setSearch] = useState('');
  const [shows, setShows] = useState(null);
  const searchField = useRef(null);

  const resetInput = () => {
    setSearch('');
    searchField.current.focus();
  };

  useEffect(() => {
    if (search.length === 0) {
      setShows(null);
      return;
    }
    let source = axios.CancelToken.source();

    const loadData = async () => {
      try {
        const response = await externalRequest.get(
          `https://api.tvmaze.com/search/shows?q=${search}`,
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
      // Cancel request if unmounted
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
          ref={searchField}
          autoFocus
        />
        <ShowList shows={shows} resetInput={resetInput} />
      </div>
    </Modal>
  );
};

export default ShowAddingModal;
