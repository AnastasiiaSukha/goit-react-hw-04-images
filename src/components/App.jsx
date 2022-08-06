import React, { Component } from "react";
import Searchbar from "./Searchbar/Searchbar";
import { getImages } from "./services/api";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Button } from "./Button/Button";
import { Loader } from "./Loader/Loader.js";



export default class App extends Component {
 
  state = {
    search: "",
    pictures: [],
    page:1,
    isLoading: false,
    error:'',
    status: 'idle'
  }

 
  async componentDidUpdate(_, prevState) {
    const { search, page } = this.state;

    if (search !== prevState.search|| page !== prevState.page) {
      this.setState({ status: 'pending', isLoading: true});

      try {
        const response = await getImages(search, page);

        if (response.total === 0) {
          alert('Sorry, no results matching your request');
          this.setState({ pictures: [] });
        }

        this.setState(prevState => ({
          status: 'resolved',
          pictures: [...prevState.pictures, ...response.hits],
        }));
      } catch (error) {
        this.setState({ status: 'rejected', error: 'Sorry, something happened, please try again later' });
      }
    }
  }


  handleSubmit = text => {
    this.setState({
      page:1,
      search: text,
      pictures:[],

    })
  }

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };
  

  render() {
    const { pictures, status, error } = this.state;

    if (status === 'idle') {
      return <Searchbar onSubmit={this.handleSubmit} />
    }
    
    if (status === 'pending') {
      return <Loader/>
    }
 
    if (status === 'rejected') {
      return console.log(error)
    }

    if (status === 'resolved') {
      return (<div>
        <Searchbar onSubmit={this.handleSubmit}/>
        <ImageGallery pictures={pictures} />
        <Button onLoadMore={this.loadMore}/>
      </div>
        
      );
    }

    
  }

};