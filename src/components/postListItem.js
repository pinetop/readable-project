import React, { Component } from 'react';
import {connect} from 'react-redux';
import {upvote_post_api} from '../actions';

class PostListItem extends Component{

  render(){
    return(
      <div>
        <button>-</button>
        <span> {this.props.listItem} </span>
        <button onClick={() => this.props.dispatch(upvote_post_api("8xf0y6ziyjabvozdd253nd"))}>+</button>
      </div>

    )
  }
}



export default connect()(PostListItem);
