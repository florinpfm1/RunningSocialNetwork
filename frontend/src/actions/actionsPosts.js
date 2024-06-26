import axios from 'axios';
import { ADD_POST, GET_ALL_POSTS, UPDATE_POST, POST_ERROR, DELETE_POST, ADD_LIKE, UNLIKE } from './actionsConstants';

// for posts - add post
export const addPost = (formData) => async (dispatch) => {
  try {
    const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
    const response = await axios.post('/api/posts', formData, config);
    dispatch({
      type: ADD_POST,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// for posts - get all posts
export const getPosts = () => async (dispatch) => {
  try {
    const response = await axios.get('/api/posts');
    console.log('actionsPosts.js@getPosts --> se face axios.get all posts si avem GET_ALL_POSTS ');
    console.log('here are the posts: ');
    console.log(response.data);
    dispatch({
      type: GET_ALL_POSTS,
      payload: response.data,
    });

  } catch (error) {
    console.log('actionsPosts.js@getPosts --> se face axios.get all posts si avem POST_ERROR ');

    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// for posts - update post
export const updatePost = (postId, formData) => async (dispatch) => {
  try {
    const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
    const response = await axios.put(`/api/posts/${postId}`, formData, config);
    dispatch({
      type: UPDATE_POST,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// for posts - delete post
export const deletePost = (postId) => async (dispatch) => {
  try {
    await axios.delete(`/api/posts/${postId}`);
    dispatch({
      type: DELETE_POST,
      payload: postId,
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        masg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
}

// for likes - update by adding like
export const addLike = (postId) => async (dispatch) => {
  try {
    const response = await axios.put(`/api/posts/like/${postId}`);

    dispatch({
      type: ADD_LIKE,
      payload: response.data,

    });

    const resp = await axios.get('/api/posts');
    dispatch({
      type: GET_ALL_POSTS,
      payload: resp.data,
    })
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// for likes - update by removing like
export const unLike = (postId) => async (dispatch) => {
  try {
    const response = await axios.put(`/api/posts/unlike/${postId}`);
    dispatch({
      type: UNLIKE,
      payload: response.data,

    });

    const resp = await axios.get('/api/posts');
    dispatch({
      type: GET_ALL_POSTS,
      payload: resp.data,
    })
  } catch (error) {

    // const errors = error.response.data.errors;
    console.log(error);

  //   dispatch({
  //     type: POST_ERROR,
  //     payload: {
  //       msg: error.response.statusText,
  //       status: error.response.status,
  //     },
  //   });
  }
};



