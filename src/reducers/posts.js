function posts(state = {'posts':[],'filter_posts':[], 'current_post':{},'comments':{}}, action) {
  console.log("Enter reducer");
  console.log(state,action);

  let post_comments = {};
  let log_object = {};

  switch(action.type){

    case 'GET_ALL_POSTS':
    //  console.log("Reducer posts",action.posts);
      return {...state, 'posts': action.posts, 'filter_posts':action.posts.sort(function(a,b){return (a.voteScore < b.voteScore) ? 1 : ((b.voteScore < a.voteScore) ? -1 : 0)}) };


    case 'GET_CURRENT_POST':
    return {...state, 'current_post': action.current_post}

    case 'GET_ALL_POSTS_BY_CATEGORY':
      if(action.category === "all"){
        return {
          ...state, 'filter_posts': state.posts
        }
      }else{
        return {...state,
          'filter_posts':state.posts.filter(function(post){
            return post.category === action.category
          })
        }
      };

    case 'POST_ORDER_BY':

      return {
        ...state, 'filter_posts' : state.filter_posts.sort(function(a,b){return (a[action.order] < b[action.order]) ? 1 : ((b[action.order] < a[action.order]) ? -1 : 0)})
      }

    case 'GET_ALL_COMMENTS_BY_POST':
    post_comments = {};
      if(action.comments.length > 0){
        let post_id = action.comments[0].parentId;
        console.log("POst ID",post_id);

        post_comments[post_id]= (action.comments);
        console.log("Post_comments",post_comments);
      }

/*
      console.log("Original state comments",state.comments);
      let updateComments = Object.assign(state.comments,post_comments);
      console.log("Update Comments",updateComments);
*/
      return {
        ...state, 'comments': Object.assign(state.comments,post_comments)
      }


    case 'ADD_COMMENT':

      post_comments = {};
      let post_id = action.comment.parentId;
//      post_comments = state.comments;
//      post_comments[post_id].push(action.comment);

/*
    post_comments = {
      ...state,'comments':{
        [post_id] : [
            ...state.comments[post_id],
            action.comment
        ]
      }
    };

     console.log("new comments",post_comments);
*/
    return {
      ...state,'comments':{
        [post_id] : [
            ...state.comments[post_id],
            action.comment
        ]
      }
    }

    case 'UPVOTE_POST':
    //updat the upvoted post.

    //specific object
    console.log("action post voteScore",action.post.voteScore);

    return {
      ...state,
      'posts': state.posts.filter(post =>
        post.id === action.post.id ?
          {...post, voteScore: action.post.voteScore} :
          post
        )
    }


    default:
    return state;

  }

}

export default posts;
