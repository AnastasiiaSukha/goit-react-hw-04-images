import React from "react";
import PropTypes from 'prop-types';
import { LoadButton } from "./Button.styled";


export const Button = ({onLoadMore}) => {
    return (
        <LoadButton onClick={onLoadMore} type='button'>Load more</LoadButton>
    )
}

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};