import React, { Component } from "react";
import Searchbar from "./Searchbar/Searchbar";
import { getImages } from "./services/api";
import ImageGallery from "./ImageGallery/ImageGallery";



export default class App extends Component {
 
  state = {
    search: "",
    pictures: [],
    page:1,
    isLoading: false,
    status: 'idle',
  }


  async componentDidUpdate(_, prevState) {
    const { search, page } = this.state;

    if (search !== prevState.search|| page !== prevState.page) {
      this.setState({ status: 'pending' });

      try {
        const response = await getImages(search, page);

        if (response.total === 0) {
          alert('Sorry, no results matching your request');
          this.setState({ pictures: [] });
          throw new Error();
        }

        this.setState(prevState => ({
          status: 'resolved',
          images: [...prevState.images, ...response.hits],
        }));
      } catch (error) {
        this.setState({ status: 'rejected' });
      }
    }
  }


  handleInput = text => {

    this.setState({
      search: text,
    })
  }

  render() {
    return (

      <div>
        <Searchbar onSubmit={this.handleInput} />
        <ImageGallery search={this.state.search} />
      </div>
    )
  }

};