import React, { useState, useEffect } from "react";
import Searchbar from "./Searchbar/Searchbar";
import { getImages, quantityPerPage } from "./services/api";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Button } from "./Button/Button";
import { Loader } from "./Loader/Loader.js";
import { Container } from "App.styled";
import Modal from "./Modal/Modal";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function App() {
  
  const [search, setSearch] = useState("");
  const [pictures, setPictures] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState("");
  const [status, setStatus] = useState('idle');
  const [imageLink, setImageLink] = useState(null);
 

  const notify = () => toast("Sorry, there is no images with this name!");

  useEffect(() => {
  
    if (!search) return;

    setStatus('pending');

  getImages(search, page).then(
    response => {
      if (response.total === 0) {
        notify();
        setPictures([]);
      }
      setPictures(prevState => ([...prevState, ...response.hits]));
      setStatus('resolved');
      
    }
  ).catch(error => {
    setError(error);
    setStatus('rejected')
    
  });

  },[search, page])



  const handleSubmit = text => {
    setPage(1);
    setSearch(text);
    setPictures([]);
  };

  const loadMore = () => {
    setPage(prevState => (prevState + 1));
  };


  
  const showModal = link => {
    setImageLink(`${link}`)
  };

  const closeModal = () => {
    setImageLink(null);
  };
  
    const lastPictures = (pictures.length / quantityPerPage) < page;


    return (
      <Container>
        <Searchbar onSubmit={handleSubmit} />
        {status === 'pending' && <Loader />}
        {status === 'rejected' && console.log(error)}
        {pictures.length > 0 && (<ImageGallery pictures={pictures} openModal={showModal} />)}
        {imageLink &&(<Modal onClose={closeModal}>
          <img src={imageLink} alt={imageLink} />
        </Modal>)}
        {status === 'resolved'&& !lastPictures && (<Button onLoadMore={loadMore}/>)}
        <ToastContainer
        position="top-center"/>

      </Container>
    )


};