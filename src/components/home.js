import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getAllPosts, getAllPostsByCategory} from '../api/readable';
import {get_all_posts, get_all_posts_by_category, post_order_by,fetch_all_posts, upvote_post_api, downvote_post_request, delete_post_request } from '../actions';
import { push} from 'react-router-redux';
import {Link} from 'react-router-dom';
import PostListItem from './postListItem';

class Home extends Component{

  constructor(props) {
    super(props);
    this.state = {selectCategory: 'all', orderBy: 'voteScore'};

    this.handleChangeCategory = this.handleChangeCategory.bind(this);
    this.handleChangeOrderBy = this.handleChangeOrderBy.bind(this);
    this.linkTo = this.linkTo.bind(this);

  //  this.handleSubmit = this.handleSubmit.bind(this);
  }

  linkTo(e){
    console.log("LInk to ",e);
  //  this.props.dispatch(push(`/post/${post_id}`))
  }


  handleChangeCategory(e){
    //console.log(e);
    this.setState({
      selectCategory: e.target.value
    });


      if(!this.props.posts){
        getAllPostsByCategory(e.target.value).then((data) => {
          console.log("category post data",data );

        });
      }else{
        console.log("dispatch select post category");
        this.props.dispatch(get_all_posts_by_category(e.target.value));
      }



  }

  handleChangeOrderBy(e){
    this.setState({
      orderBy: e.target.value
    });

    console.log("Change Order");
    this.props.dispatch(post_order_by(e.target.value));


  }


  componentDidMount(){
    //call out thunk to get the data.
    this.props.dispatch(fetch_all_posts());

    /*
      getAllPosts().then((data) => {
        console.log("post data",data);
        this.props.dispatch(get_all_posts(data));
      });
      */



  }


  render(){
    return(
      <div>
        <p>Readable Posts</p>
        <select value={this.state.selectCategory} onChange={this.handleChangeCategory}>
          <option value="all">All</option>
          <option value="react">React</option>
          <option value="redux">Redux</option>
          <option value="udacity">Udacity</option>
        </select>

        <select value={this.state.orderBy} onChange={this.handleChangeOrderBy}>
          <option value="voteScore">Vote Score</option>
          <option value="timestamp">Time</option>
        </select>


        {
          this.props.filter_posts.length > 0 ?

          <div>

            <p>List {this.state.selectCategory} posts</p>

          <ul >
            {
              this.props.posts.map((post,index) => {

                let linkPost = `/post/${post.id}`;
                return(

                  (post.category === this.state.selectCategory || this.state.selectCategory === "all")?
                    <li key={post.id}><Link to={linkPost} >{post.title}</Link>
                    <button>o</button>
                    <button onClick={() => this.props.dispatch(delete_post_request(post.id))}>x</button>
                      <ul>
                        <li>category: {post.category}</li>
                        <li>timestamp: {post.timestamp}</li>
                        <li><button onClick={() => this.props.dispatch(downvote_post_request(post.id))}>-</button>
                        {post.voteScore}
                         <button onClick={() => this.props.dispatch(upvote_post_api(post.id))}>+</button>
                       </li>

                      </ul>
                    </li>
                    : null
                  )
              })
            }
          </ul>

          </div>


             :
            <p>No post is found.</p>
        }

      </div>

    )}

}

const mapStateToProps = (state, props) => ({
  posts: state.posts.posts,
  filter_posts: state.posts.filter_posts
})



export default connect(mapStateToProps)(Home);
