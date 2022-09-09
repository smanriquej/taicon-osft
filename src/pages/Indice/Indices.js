import React, { Component } from 'react';
import axios from 'axios';

import Indices from '../../components/Indices/Indices';

class IndicesPage extends Component {
  state = { isLoading: true, indices: [] };
  componentDidMount() {
    this.fetchData();
  }

  indiceDeleteHandler = indiceId => {
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

  fetchData = () => {
    axios
      .get('http://localhost:3200/indices')
      .then(indicesResponse => {
        this.setState({ isLoading: false, indices: indicesResponse.data });
      })
      .catch(err => {
        console.log(err);
        this.setState({ isLoading: false, indices: [] });
        this.props.onError('Loading indices failed. Please try again later');
      });
  }

  render() {
    let content = <p>Loading indices...</p>;

    if (!this.state.isLoading && this.state.indices.length > 0) {
      content = (
        <Indices
          indices={this.state.indices}
          onDeleteindice={this.indiceDeleteHandler}
        />
      );
    }
    if (!this.state.isLoading && this.state.indices.length === 0) {
      content = <p>Found no indices. Try again later.</p>;
    }
    return <main>{content}</main>;
  }
}

export default IndicesPage;
