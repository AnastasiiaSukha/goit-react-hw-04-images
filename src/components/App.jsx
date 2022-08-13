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
  
    const lastPictures = (pictures.length / quantityPerPage) < 1;


    if (status === 'idle') {
      return <Searchbar onSubmit={handleSubmit} />
    }
    
    if (status === 'pending') {
      return <Loader/>
    }
 
    if (status === 'rejected') {
      return console.log(error)
    }

    if (status === 'resolved') {
      return (<Container>
        <Searchbar onSubmit={handleSubmit}/>
        <ImageGallery pictures={pictures} openModal={showModal} />
        {!lastPictures && (<Button onLoadMore={loadMore}/>)}
        {imageLink &&(<Modal onClose={closeModal}>
          <img src={imageLink} alt={imageLink} />
        </Modal>)}
        <ToastContainer
        position="top-center"/>
      </Container>
        
      );
    }


};