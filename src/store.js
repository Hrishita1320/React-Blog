import { createStore, action, thunk, computed } from 'easy-peasy';
import axios from "axios";

export default createStore({
    posts :[],
    setPosts:action((state, payload)=>{
        state.posts.push(payload);
    }),
    postTitle :'',
    setPostTitle:action((state, payload)=>{
        state.postTitle.push(payload);
    }),
    postBody :'',
    setPostBody:action((state, payload)=>{
        state.postBody.push(payload);
    }),
    editTitle :'',
    setEditTitle:action((state, payload)=>{
        state.editTitle.push(payload);
    }),
    editBody :'',
    setEditBody:action((state, payload)=>{
        state.editBody.push(payload);
    }),
    search :'',
    setSearch:action((state, payload)=>{
        state.search.push(payload);
    }),
    searchResults :[],
    setSearchResults:action((state, payload)=>{
        state.searchResults.push(payload);
    }),
    postCount :computed((state)=> state.posts.length),
    getPostById:computed((state)=>{
        return (id) => state.posts.find(post=>(post.id).toString() === id );
    }),
    savePost : thunk(async(actions, newPost, helpers)=>{
        const { posts } = helpers.getState();
        const baseURL = "http://localhost:3500/posts";
        try {
            const response = await axios.post(baseURL, newPost);
            actions.setPosts([...posts, response.data]);
            actions.setPostTitle("");
            actions.setPostBody("");
          } catch (error) {
            console.log(`Error: ${error.message}`);
          }
    }),
    deletePost : thunk(async(actions, id, helpers)=>{
        const { posts } = helpers.getState();
        const baseURL = "http://localhost:3500/posts";
        try {
            await axios.delete(`${baseURL}/${id}`).then((data) => data.data.data);
           actions.setPosts(posts.filter((post) => post.id !== id));
          
         } catch (error) {
           console.log(`Error: ${error.message}`);
         }
    }),
    editPost : thunk(async(actions, updatedPost, helpers)=>{
        const { posts } = helpers.getState();
        const { id } = updatedPost;
        const baseURL = "http://localhost:3500/posts";
        try {
            const response = await axios.put(`${baseURL}/${id}`,updatedPost);
            actions.setPosts(posts.map(post => post.id === id ? {...response.data } : post));
            actions.setEditTitle('');
            actions.setEditBody('');
          } catch (error) {
            console.log(`Error: ${error.message}`);
          }
    }),
});