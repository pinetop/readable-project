const api = "http://localhost:3001"
const uuidv1 = require('uuid/v1');

let token = localStorage.token
if (!token)
   token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token,
  'Content-Type': 'application/json'
}



// Categories
export function getAllCategories(){
  return(
   fetch(`${api}/categories`, { headers })
     .then(res => res.json())
     .then(data => data.categories)
   )
}

//posts
export function getAllPosts(){
  return(
   fetch(`${api}/posts`, { headers })
     .then(res => res.json())
   )
}

export function getPostById(post_id){
  return(
    fetch(`${api}/posts/${post_id}`, { headers })
      .then(res => res.json())
    )
}

export function getAllPostsByCategory(category){
  return(
    fetch(`${api}/${category}/posts`, { headers })
      .then(res => res.json())
  )
}

export function getAllCommentsByPost(post_id){
  return(
    fetch(`${api}/posts/${post_id}/comments`,{headers})
      .then(res => res.json())
  )
}

export function addComment(comment){

  let payload ={
    id: uuidv1(),
    timestamp: Date.now(),
    body: comment.comment,
    author: comment.author,
    parentId: comment.post_id
  }


  console.log("comment payload",payload);
  let post_id = comment.post_id;
  return(
    fetch(`${api}/comments`,{method: "POST", headers, body:JSON.stringify(payload)})
      .then((data) => {console.log("Success",data); return data.json()})
  )
}

export function upVotePost(post_id){
  let payload = {
    "option": "upVote"
  }

  return(
    fetch(`${api}/posts/${post_id}`,{method:"POST",headers,body:JSON.stringify(payload)})
      .then((data) => {console.log("Success",data); return data.json()})
  )
}

export function downVotePost(post_id){
  let payload = {
    "option": "downVote"
  }

  return(
    fetch(`${api}/posts/${post_id}`,{method:"POST",headers,body:JSON.stringify(payload)})
      .then((data) => {console.log("Success",data); return data.json()})
  )
}

export function deletePost(post_id){
  return(
    fetch(`${api}/posts/${post_id}`,{method:"DELETE",headers})
      .then((data) => {console.log("Success DELETE",data); return data.json()})
  )
}
