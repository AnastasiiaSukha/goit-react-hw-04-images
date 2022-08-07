import React, { Component } from "react";
import PropTypes from 'prop-types';
import { SearchbarHeader, SearchForm, SearchFormButton, SearchFormInput, ButtonLabel } from "./Searchbar.styled";
import { FiSearch } from "react-icons/fi";


class Searchbar extends Component {
    
    state = {
        inputValue: "",
    }

    handelInputChange = e => (
    this.setState({
        inputValue: e.currentTarget.value,
    }));


       handleSubmit = e => {
         e.preventDefault();
         
        if (this.state.inputValue.trim() === "") {
      return
    }
      this.props.onSubmit(this.state.inputValue.trim());

      this.setState({
      inputValue: '',
      });
    }


    render() {
        return (
        <SearchbarHeader>
     <SearchForm onSubmit={this.handleSubmit}>
      <SearchFormButton type="submit">
      <FiSearch size={20}> </FiSearch>     
      <ButtonLabel> Search</ButtonLabel>
    </SearchFormButton>

    <SearchFormInput
      onChange={this.handelInputChange}
      value = {this.state.inputValue}       
      type="text"
      autoComplete="off"
      autoFocus
      placeholder="Search images and photos"
    />
  </SearchForm>
</SearchbarHeader>
        )
    }

    
}

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};