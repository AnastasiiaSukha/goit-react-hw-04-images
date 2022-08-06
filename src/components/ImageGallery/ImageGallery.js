import React from "react";
import { ImageGalleryItem } from "./ImageGalleryItem/ImageGalleryItem";

export const ImageGallery =({pictures, loadMore})=>{
  return (<ul>
    {pictures.map(picture => (
      <li key={picture.id}>
        <ImageGalleryItem link={picture.webformatURL} tag={picture.tags} />
      </li>
    ))}
  </ul>)
}