import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { format } from "date-fns";
import DataContext from "./context/DataContext";
import api from "./api/posts";
// import { useStoreState, useStoreActions } from 'easy-peasy';

const EditPost = () => {
    const { posts,setPosts }= useContext(DataContext);
    const [editTitle, setEditTitle] = useState("");
      const [editBody, setEditBody] = useState("");
      const history = useNavigate();
      const { id } = useParams();
      const post = posts.find((post) => post.id.toString() === id);
    
      useEffect(() => {
        if (post) {
          setEditTitle(post.title);
          setEditBody(post.body);
        }
      }, [post, setEditTitle, setEditBody]);
    
      const handleEdit = async (id) => {
        const datetime = format(new Date(), "MMMM dd, yyyy pp");
        const updatedPost = { id, title: editTitle, datetime, body: editBody };
        try {
          const response = await api.put(`/posts/${id}`, updatedPost);
          setPosts(
            posts.map((post) => (post.id === id ? { ...response.data } : post))
          );
          setEditTitle("");
          setEditBody("");
          history("/");
        } catch (err) {
          console.log(`Error : ${err.message}`);
        }
      };
    
      return (
        <main className="NewPost">
          {editTitle && (
            <>
              <h2>New Post</h2>
              <form className="newPostForm" onSubmit={(e)=>e.preventDefault()}>
                <label htmlFor="postTitle">Title:</label>
                <input
                  id="postTitle"
                  type="text"
                  required
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <label htmlFor="editBody">Post:</label>
                <textarea
                  id="editBody"
                  required
                  value={editBody}
                  onChange={(e) => setEditBody(e.target.value)}
                />
                <button type="submit" onClick={()=>handleEdit(post.id)}>Submit</button>
              </form>
            </>
          )}
          {!editTitle && (
            <>
              <h2>Post Not found</h2>
              <p>Disaponting.</p>
              <p>
                <Link to="/">Visit to our Homepage</Link>
              </p>
            </>
          )}
        </main>
      );
    };
    
    export default EditPost;
    