import React, {Component} from "react";
import { ImageGalleryItem } from "./ImageGalleryItem/ImageGalleryItem";

export default class ImageGallery extends Component{





  render() {
     return (<ul>
    <h1>{this.props.search}</h1>
  <ImageGalleryItem/>
</ul>)
  }
 
}