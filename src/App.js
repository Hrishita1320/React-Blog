
import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';
import Home from './Home';
import NewPost from './NewPost';
import PostPage from './PostPage';
import EditPost from './EditPost';
import About from './About';
import Missing from './Missing';
import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
// import { format } from "date-fns";
// import api from "./api/posts";
// import axios from "axios";
// import useWindowSize from "./hooks/useWindowSize";

import useAxiosFetch from './hooks/useAxiosFetch';
import { useStoreActions } from 'easy-peasy';


function App() {

  const setPosts = useStoreActions((actions) => actions.setPosts);

  const { data, fetchError, isLoading } = useAxiosFetch('http://localhost:3500/posts');

  useEffect(() => {
    setPosts(data);
  }, [data, setPosts]);

  // const [posts, setPosts] = useState([]);
  // const [search, setSearch] = useState("");
  // const [searchResults, setSearchResults] = useState([]);
  // const [postTitle, setPostTitle] = useState("");
  // const [postBody, setPostBody] = useState("");
  // const [editTitle, setEditTitle] = useState("");
  // const [editBody, setEditBody] = useState("");
  // const history = useNavigate();
  // const { width } = useWindowSize();

  // const { data, fetchError, isLoading } = useAxiosFetch(
  //   "http://localhost:3500/posts"
  // );

  // const baseURL = "http://localhost:3500/posts";

  // api fetch folder error;
  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     try {
  //       axios.get(baseURL).then((response) => {
  //         setPosts(response.data);
  //       });
  //       // const response = await api.get();
  //       // setPosts(response.data);
  //     } catch (err) {
  //       if (err.response) {
  //         // This is not in 200 response range
  //         console.log(err.response.data);
  //         console.log(err.response.status);
  //         console.log(err.response.headers);
  //       } else {
  //         console.log(`Error : ${err.message}`);
  //       }
  //     }
  //   };
  //   fetchPosts();
  // }, []);

  // useEffect(() => {
  //   setPosts(data);
  // }, [data]);

  // useEffect(() => {
  //   const filteredResults = posts.filter(
  //     (post) =>
  //       post.body.toLowerCase().includes(search.toLowerCase()) ||
  //       post.title.toLowerCase().includes(search.toLowerCase())
  //   );
  //   setSearchResults(filteredResults.reverse());
  // }, [posts, search]);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
  //   const datetime = format(new Date(), "MMMM dd, yyyy pp");
  //   const newPost = { id, title: postTitle, datetime, body: postBody };

  //   try {
  //     const response = await axios.post(baseURL, newPost);
  //     const allPosts = [...posts, response.data];
  //     setPosts(allPosts);
  //     setPostTitle("");
  //     setPostBody("");
  //     history("/");
  //   } catch (error) {
  //     console.log(`Error: ${error.message}`);
  //   }
  // };
  // const handleEdit = async (id) => {
  //   const datetime = format(new Date(), "MMMM dd, yyyy pp");
  //   const updatedPost = { id, title: editTitle, datetime, body: editBody };
  //   try {
  //     const response = await axios.put(`${baseURL}/${id}`, updatedPost);
  //     setPosts(
  //       posts.map((post) => (post.id === id ? { ...response.data } : post))
  //     );
  //     setEditTitle("");
  //     setEditBody("");
  //     history("/");
  //   } catch (error) {
  //     console.log(`Error: ${error.message}`);
  //   }
  // };
  // const handleDelete = async (id) => {
  //   try {
  //     await axios.delete(`${baseURL}/${id}`).then((data) => data.data.data);
  //     const postList = posts.filter((post) => post.id !== id);
  //     setPosts(postList);
  //     history("/");
  //   } catch (error) {
  //     console.log(`Error: ${error.message}`);
  //   }
  // };

  return (
    <div className="App">
      
        <Header title="React JS Blog" />
        <Nav />
        <Routes>
          <Route exact path="/" element={<Home
                isLoading={isLoading}
                fetchError={fetchError} />} />

          <Route path="post" element={<NewPost />} />
          <Route path="edit/:id" element={<EditPost />} />
          <Route path="post" element={<PostPage />}>
            <Route path=":id" element={<PostPage />} />
          </Route>

          <Route path="about" element={<About />} />
          <Route path="*" element={<Missing />} />
        </Routes>
        <Footer />
     
    </div>
  );
}

export default App;
