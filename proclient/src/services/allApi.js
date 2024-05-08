

import { BASEURL } from "./baseurl"
import { commonApi } from "./commonApi"

// regiaster
export  const registerAPI =async(user)=>{
  return await commonApi("POST",`${BASEURL}/user/register`,user,"")
}


//login api call

export const loginAPI=async(user)=>{
  return await commonApi("POST",`${BASEURL}/user/login`,user,"")
}


//create post

export const createPostAPI=async(reqBody,reqHeader)=>{
  return await commonApi("POST",`${BASEURL}/posts/add`,reqBody,reqHeader)
}


//get all posts

export const allPostAPI=async(reqBody,reqHeader)=>{
  return await commonApi("GET",`${BASEURL}/posts/all`,"","")
}


//add like comments

export const Likecomment=async(userdata)=>{
  return await commonApi("POST",`${BASEURL}/user/comment`,userdata,"")
}

//update likes

export const updatelike=async(userid)=>{
  return await commonApi("PUT",`${BASEURL}/posts/likes`,userid,"")
}

// add followed brand


export const addfollowedbrands=async(brands)=>{
  return await commonApi("POST",`${BASEURL}/user/follows`,brands,"")
}


export const followedposts=async(postData)=>{
  return await commonApi("POST",`${BASEURL}/posts/brands`,postData,"")
}


// add liked brand to user

export const addlikedbrands=async(likedatas)=>{
  return await commonApi("POST",`${BASEURL}/user/brands`,likedatas,"")
}

//update product like

export const updateproductlike=async(productlikedatas)=>{
  return await commonApi("PUT",`${BASEURL}/posts/productlike`,productlikedatas,"")
}


//create video

export const createvideoAPI=async(reqBody,reqHeader)=>{
  return await commonApi("POST",`${BASEURL}/sollutions/add`,reqBody,reqHeader)
}

// get all sollutions

export const allsollutionsAPI=async(reqBody,reqHeader)=>{
  return await commonApi("GET",`${BASEURL}/sollutions/all`,"","")
}

//add sollution like to user


export const Likesollution=async(sollutiondata)=>{
  return await commonApi("POST",`${BASEURL}/user/sollutions`,sollutiondata,"")
}

//update sollution like
export const updatesollutionlike=async(userid)=>{
  return await commonApi("PUT",`${BASEURL}/sollutions/likes`,userid,"")
}

//get seperate sollutions
export const seperatesollution=async(reqHeader)=>{
  return await commonApi("POST",`${BASEURL}/posts/sollutions`,"",reqHeader)
}


//get seperate comments
export const seperatecomments=async(reqHeader)=>{
  return await commonApi("POST",`${BASEURL}/posts/comments`,"",reqHeader)
}


//get seperate users
export const seperateusers=async(reqHeader)=>{
  return await commonApi("POST",`${BASEURL}/user/seperate`,"",reqHeader)
}

//update profile
export const updateprofileAPI=async(reqBody,reqHeader)=>{
  return await commonApi("POST",`${BASEURL}/users/update`,reqBody,reqHeader)
}


// delete a post

export const deletepostAPI=async(data)=>{
  return await commonApi("DELETE",`${BASEURL}/post/delete`,data,"")
}

//adminlogin
export const adminloginAPI=async(user)=>{
  return await commonApi("POST",`${BASEURL}/admin/login`,user,"")
}


// get all users
export const allusersAPI=async(reqBody,reqHeader)=>{
  return await commonApi("GET",`${BASEURL}/users/all`,"","")
}

// send messages
export const sendmessageAPI=async(message)=>{
  return await commonApi("POST",`${BASEURL}/admin/message`,message,"")
}


export const allmessagesAPI=async(reqBody,reqHeader)=>{
  return await commonApi("GET",`${BASEURL}/messages/all`,"","")
}