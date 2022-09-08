import React, { Component } from 'react';
import axios from 'axios';

import './Product.css';

class ProductPage extends Component {
  state = { isLoading: true, indice: null };

  componentDidMount() {
    axios
      .get('http://localhost:3200/products/' + this.props.match.params.id)
      .then(indiceResponse => {
        this.setState({ isLoading: false, indice: indiceResponse.data });
      })
      .catch(err => {
        this.setState({ isLoading: false });
        console.log(err);
        this.props.onError('Loading the indice failed. Please try again later');
      });
  }

  render() {
    let content = <p>Is loading...</p>;

    if (!this.state.isLoading && this.state.indice) {
      content = (
        <main className="product-page">
          <h1>{this.state.indice.cod_indice}</h1>
          <h2>{this.state.indice.nombre_cuoc_indice}</h2>
          {/* <div
            className="product-page__image"
            style={{
              backgroundImage: "url('" + this.state.indice.image + "')"
            }}
          /> */}
          {/* <p>{this.state.indice.description}</p> */}
        </main>
      );
    }
    if (!this.state.isLoading && !this.state.indice) {
      content = (
        <main>
          <p>Found no indice. Try again later.</p>
        </main>
      );
    }
    return content;
  }
}

export default ProductPage;