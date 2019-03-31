import React, { Component } from 'react';
import '../home.scss';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
library.add(faSearch);
class UserSearch extends Component {
    render(){
        return(
            <div className='headind_srch'>
                <div className='form-group d-flex flex-row'>
                  <input
                    placeholder = 'Search'
                    type = 'text'
                    className = 'form-control user-search'
                    onKeyUp = {(e) => this.props.onSearchTextChange(e)}
                  />
                  
                </div>
            </div>
        );
    }
}

export default UserSearch;