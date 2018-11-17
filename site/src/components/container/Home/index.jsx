import React, { Component } from 'react';
import { connect } from 'react-redux';

class Home extends Component {
  render() {
    return (
      <div className="container">
        this is the home page!
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
       state
    };
}
export default connect(mapStateToProps)(Home);