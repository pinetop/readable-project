import * as ReadableAPI from '../api/readable';

const GET_ALL_POSTS = "GET_ALL_POSTS";
const GET_ALL_POSTS_BY_CATEGORY = "GET_ALL_POSTS_BY_CATEGORY";
const POST_ORDER_BY = "POST_ORDER_BY";
const GET_ALL_COMMENTS_BY_POST = "GET_ALL_COMMENTS_BY_POST";
const GET_CURRENT_POST = "GET_CURRENT_POST";
const ADD_COMMENT = "ADD_COMMENT";
const UPVOTE_POST = "UPVOTE_POST";
const DOWNVOTE_POST = "DOWNVOTE_POST";
const DELETE_POST = "DELETE_POST";

export function get_all_posts(posts) {
  return ({
    type: GET_ALL_POSTS,
    posts
  })
}

export const fetch_all_posts = () => dispatch => {
  console.log("Enter Fetch Post");

  return(
    ReadableAPI
    .getAllPosts()
    .then(posts => {
      console.log("Fetch Post",posts);
      dispatch(get_all_posts(posts))
    })
  )
};

export function get_all_posts_by_category(category){
  return ({
    type: GET_ALL_POSTS_BY_CATEGORY,
    category
  })

}

export function get_current_post(current_post){
  return({
    type: GET_CURRENT_POST,
    current_post
  })
}

export function post_order_by(order){
  return ({
    type: POST_ORDER_BY,
    order
  })
}

export function get_all_comments_by_post(comments){
  return ({
    type: GET_ALL_COMMENTS_BY_POST,
    comments
  })

}

export function add_comment(comment){
  return ({
    type: ADD_COMMENT,
    comment
  })
}

export const add_comment_api = (comment) => dispatch => {
  console.log("Enter add comment");
  return(
    ReadableAPI
      .addComment(comment)
      .then(comment => {
        console.log("Comment Output",comment);
        dispatch(add_comment(comment))
      })
  )

}

export function upvote_post(updated_post){
  return({
    type: UPVOTE_POST,
    post: updated_post
  })
}

export const upvote_post_api = (post_id) => dispatch => {
  return(
    ReadableAPI
      .upVotePost(post_id)
      .then(post => {
        console.log("Updated Post",post);
        dispatch(upvote_post(post))
      })
  )
}


export function downvote_post_success(updated_post){
  return({
    type: DOWNVOTE_POST,
    post: updated_post
  })
}

export const downvote_post_request = (post_id) => dispatch => {
  return(
    ReadableAPI
      .downVotePost(post_id)
      .then(post => {
        console.log("Updated Post",post);
        dispatch(downvote_post_success(post))
      })
  )
}


export function delete_post_success(post_id){
  return({
    type: DELETE_POST,
    post_id
  })

}

export const delete_post_request = (post_id) => dispatch => {
  return(
    ReadableAPI
      .deletePost(post_id)
      .then(post => {
        if(post.deleted === true){
          dispatch(delete_post_success(post.id))
        }
      })

  )
}
