import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getAllCommentsByPost,getPostById, addComment} from '../api/readable';
import {get_current_post,get_all_comments_by_post,add_comment_api} from '../actions';

class PostDetail extends Component{

  constructor(route) {
    super();
    this.state = {
      post_id: route.match.params.post_id,
      author: '',
      comment: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }

  handleSubmit(e){
    e.preventDefault();
    console.log("Add comment",this.state);

    //addComment(this.state);
    this.props.dispatch(add_comment_api(this.state));
    // add a comment.
  }

  handleChange(e){
  this.setState({
    [e.target.name]: e.target.value
  });
  }

  componentDidMount(){
    if(this.state.post_id){

      getPostById(this.state.post_id).then((data) => {
        console.log("Post Detail",data);
        this.props.dispatch(get_current_post(data));
      })


      getAllCommentsByPost(this.state.post_id).then((data) => {
        console.log("All comments",data);
        this.props.dispatch(get_all_comments_by_post(data));
      })
    }

  }





  render(){
    return(
      <div>
        <h1> {this.props.current_post.title}</h1>
        <h3> {this.props.current_post.body}</h3>
        <h3> Author: {this.props.current_post.author}</h3>
        <h3> Time: {this.props.current_post.timestamp}</h3>
        <h3> Vote Score: {this.props.current_post.voteScore}</h3>

          {
            this.props.post_comments ?
            <div>
              <p>List all comments</p>
              <ul>
                {
                  this.props.post_comments.map(function(comment,index){
                    return(
                      <li key={comment.id}>{comment.body}
                      <ul>
                        <li>author: {comment.author}</li>
                        <li>voteScore: {comment.voteScore}</li>
                        <li>timestamp: {comment.timestamp}</li>
                      </ul>
                    </li>
                  )
                })
              }

            </ul>

            <form onSubmit={this.handleSubmit}>
              <input type="text" name="comment" onChange={this.handleChange} value={this.state.comment} placeholder="comment"/>
              <input type="text" name="author" onChange={this.handleChange} value={this.state.author} placeholder="author"/>
              <button type="submit">Add a comment</button>
            </form>



            </div>
            :
            <p>No comments</p>
          }


      </div>
    )
  }

}


const mapStateToProps = (state, props) => ({
  posts: state.posts.posts,
  filter_posts: state.posts.filter_posts,
  current_post: state.posts.current_post,
  post_comments: state.posts.comments[state.posts.current_post.id]
})

export default connect(mapStateToProps)(PostDetail);
