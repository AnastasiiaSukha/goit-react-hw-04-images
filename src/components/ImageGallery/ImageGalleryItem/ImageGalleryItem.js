import React from "react";
import PropTypes from 'prop-types';
import { Image } from "./ImageGalleryItem.styled";

export const ImageGalleryItem = ({link, tag, openModal}) => {
    return (
      <Image src={link} alt={tag} onClick={openModal}/>)
}

ImageGalleryItem.propTypes = {
  link: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};