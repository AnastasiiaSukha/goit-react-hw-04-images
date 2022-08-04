import React, { Component } from "react";


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
        <header>
     <form onSubmit={this.handleSubmit}>
    <button type="submit">
      <span>Search</span>
    </button>

    <input
      onChange={this.handelInputChange}
      value = {this.state.inputValue}       
      type="text"
      autoComplete="off"
      autoFocus
      placeholder="Search images and photos"
    />
  </form>
</header>
        )
    }

    
}

export default Searchbar;