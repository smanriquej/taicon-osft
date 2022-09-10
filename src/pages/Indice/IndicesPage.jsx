import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Indices from '../../components/Indices/Indices.component';

const IndicesPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [indices, setIndices] = useState([]);


  useEffect(() => {
    fetchData();
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

  return (
    <main>
      {isLoading ? (
      <p>Loading indices...</p>
        ) : ( 
          indices.length > 0 ? (
          <Indices
          indices={indices}
          onDeleteindice={indiceDeleteHandler}
        /> 
        ) : ( 
          <p>Found no indices. Try again later.</p>
        ))}
    </main>
  );
};

export default IndicesPage;