import React from "react";
import PropTypes from 'prop-types';
import { ImageGalleryItem } from "./ImageGalleryItem/ImageGalleryItem";
import { GalleryItem, GalleryList } from "./ImageGallery.styled";

export const ImageGallery =({pictures, openModal})=>{
  return (<GalleryList>
    {pictures.map(picture => (
      <GalleryItem key={picture.id}>
        <ImageGalleryItem link={picture.webformatURL} tag={picture.tags} openModal={()=>openModal(picture.largeImageURL)}/>
      </GalleryItem>
    ))}
  </GalleryList>)
}

ImageGallery.propTypes = {
  pictures: PropTypes.arrayOf(PropTypes.shape).isRequired,
  openModal: PropTypes.func.isRequired,
};