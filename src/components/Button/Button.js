import React from "react";

export const Button = ({onLoadMore}) => {
    return (
        <button onClick={onLoadMore} type='button'>Load more</button>
    )
}