import React, { useState} from "react";
import PropTypes from 'prop-types';
import { SearchbarHeader, SearchForm, SearchFormButton, SearchFormInput, ButtonLabel } from "./Searchbar.styled";
import { FiSearch } from "react-icons/fi";


function Searchbar({onSubmit}) {

  const [inputValue, setInputValue] = useState("");
    

  const handelInputChange = e => (
    setInputValue(e.currentTarget.value));


  const handleSubmit = e => {
         e.preventDefault();
         
        if (inputValue.trim() === "") {
      return
    }
      onSubmit(inputValue.trim());

    setInputValue('');
    }


        return (
        <SearchbarHeader>
     <SearchForm onSubmit={handleSubmit}>
      <SearchFormButton type="submit">
      <FiSearch size={20}> </FiSearch>     
      <ButtonLabel> Search</ButtonLabel>
    </SearchFormButton>

    <SearchFormInput
      onChange={handelInputChange}
      value = {inputValue}       
      type="text"
      autoComplete="off"
      autoFocus
      placeholder="Search images and photos"
    />
  </SearchForm>
</SearchbarHeader>
        )

    
}

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};