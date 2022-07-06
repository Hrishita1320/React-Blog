
import { createContext, useState, useEffect  } from 'react';
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
// import api from "../api/posts";
import axios from "axios";
import useWindowSize from '../hooks/useWindowSize';
import useAxiosFetch from '../hooks/useAxiosFetch';

export const DataContext = createContext({});

 export const DataProvider= async ({children}) =>{
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  const history = useNavigate();
  const { width } =useWindowSize();
  

  const { data, fetchError, isLoading } = useAxiosFetch('http://localhost:3500/posts');


  const baseURL = "http://localhost:3500/posts";

  useEffect(() => {
   setPosts(data);
    
  }, [data]);


  useEffect(() => {
    const filteredResults = posts.filter(
      (post) =>
        post.body.toLowerCase().includes(search.toLowerCase()) ||
        post.title.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(filteredResults.reverse());
  }, [posts, search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const newPost = { id, title: postTitle, datetime, body: postBody };

    try {
      const response = await axios.post(baseURL, newPost);
      const allPosts = [...posts, response.data];
      setPosts(allPosts);
      setPostTitle("");
      setPostBody("");
      history("/");
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  };
  const handleEdit = async (id) =>{
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const updatedPost = { id, title: editTitle, datetime, body: editBody };
    try {
      const response = await axios.put(`${baseURL}/${id}`,updatedPost);
      setPosts(posts.map(post => post.id === id ? {...response.data } : post));
      setEditTitle('');
      setEditBody('');
      history("/");
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  }
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${baseURL}/${id}`).then((data) => data.data.data);
      const postList = posts.filter((post) => post.id !== id);
      setPosts(postList);
      history("/");
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  };

    return (
        <DataContext.Provider value={{
            width,search, setSearch,searchResults,
            fetchError, isLoading, handleSubmit, 
            postTitle, 
            setPostTitle, 
            postBody, 
            setPostBody,posts,
            handleEdit,
            editTitle,
            editBody,
            setEditBody,
            setEditTitle,
             handleDelete
        }}>
            {children}
        </DataContext.Provider>
    )
  
}

export  default DataContext;