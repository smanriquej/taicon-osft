import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Indices from '../../components/Indices/Indices.component';

const IndicesPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [indices, setIndices] = useState([]);
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    fetchFilter();
    fetchData();
    // console.log("filter",filter);
  }, []);

  const indiceDeleteHandler = (indiceId) => {
    axios
      .delete('http://localhost:3200/indices/' + indiceId)
      .then(result => {
        console.log(result);
        this.fetchData();
      })
      .catch(err => {
        this.props.onError(
          'Deleting the indice failed. Please try again later'
        );
        console.log(err);
      });
  };

const fetchData = () => {
  axios
    .get('http://localhost:3200/indices')
    .then(indicesResponse => {
      setIndices(indicesResponse.data);
      setIsLoading(false);
    })
    .catch(err => {
      console.log(err);
      setIndices([]);
      setIsLoading(false);
      this.props.onError('Loading indices failed. Please try again later');
    });
  }

  const fetchFilter = () => {
    axios
      .get('http://localhost:3200/indicesFilter')
      .then(indicesResponse => {
        console.log("filter",indicesResponse);
        setFilter(indicesResponse.data);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setFilter([]);
        setIsLoading(false);
        this.props.onError('Loading filter failed. Please try again later');
      });
  }

  return (
    <main>
      {isLoading ? (
      <p>Loading indices...</p>
        ) : ( 
          indices.length > 0 ? (
          <Indices
          indices={indices}
          filter={filter}
          onDeleteindice={indiceDeleteHandler}
        /> 
        ) : ( 
          <p>Found no indices. Try again later.</p>
        ))}
    </main>
  );
};

export default IndicesPage;