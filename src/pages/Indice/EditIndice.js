import React, { Component } from 'react';
import axios from 'axios';

import './EditIndice.css';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

class IndiceEditPage extends Component {
  state = {
    isLoading: true,
    title: '',
    price: '',
    imageUrl: '',
    description: ''
  };

  componentDidMount() {
    // Will be "edit" or "add"
    if (this.props.match.params.mode === 'edit') {
      axios
        .get('http://localhost:3200/indices/' + this.props.match.params.id)
        .then(indiceResponse => {
          const indice = indiceResponse.data;
          this.setState({
            isLoading: false,
            title: indice.name,
            price: indice.price.toString(),
            imageUrl: indice.image,
            description: indice.description
          });
        })
        .catch(err => {
          this.setState({ isLoading: false });
          console.log(err);
        });
    } else {
      this.setState({ isLoading: false });
    }
  }

  editIndiceHandler = event => {
    event.preventDefault();
    if (
      this.state.title.trim() === '' ||
      this.state.price.trim() === '' ||
      this.state.imageUrl.trim() === '' ||
      this.state.description.trim() === ''
    ) {
      return;
    }
    this.setState({ isLoading: true });
    const indiceData = {
      name: this.state.title,
      price: parseFloat(this.state.price),
      image: this.state.imageUrl,
      description: this.state.description
    };
    let request;
    if (this.props.match.params.mode === 'edit') {
      request = axios.patch(
        'http://localhost:3200/indices/' + this.props.match.params.id,
        indiceData
      );
    } else {
      request = axios.post('http://localhost:3200/indices', indiceData);
    }
    request
      .then(result => {
        this.setState({ isLoading: false });
        this.props.history.replace('/indices');
      })
      .catch(err => {
        this.setState({ isLoading: false });
        console.log(err);
        this.props.onError(
          'Editing or adding the indice failed. Please try again later'
        );
      });
  };

  inputChangeHandler = (event, input) => {
    this.setState({ [input]: event.target.value });
  };

  render() {
    let content = (
      <form className="edit-indice__form" onSubmit={this.editIndiceHandler}>
        <Input
          label="Title"
          config={{ type: 'text', value: this.state.title }}
          onChange={event => this.inputChangeHandler(event, 'title')}
        />
        <Input
          label="Price"
          config={{ type: 'number', value: this.state.price }}
          onChange={event => this.inputChangeHandler(event, 'price')}
        />
        <Input
          label="Image URL"
          config={{ type: 'text', value: this.state.imageUrl }}
          onChange={event => this.inputChangeHandler(event, 'imageUrl')}
        />
        <Input
          label="Description"
          elType="textarea"
          config={{ rows: '5', value: this.state.description }}
          onChange={event => this.inputChangeHandler(event, 'description')}
        />
        <Button type="submit">
          {this.props.match.params.mode === 'add'
            ? 'Create Indice'
            : 'Update Indice'}
        </Button>
      </form>
    );
    if (this.state.isLoading) {
      content = <p>Is loading...</p>;
    }
    return <main>{content}</main>;
  }
}

export default IndiceEditPage;
