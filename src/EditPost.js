import { useEffect } from "react";
import { useNavigate,useParams, Link } from "react-router-dom";
import { format } from "date-fns";
// import axios from "axios";
import { useStoreState, useStoreActions } from 'easy-peasy';


const EditPost = () => {
  const history = useNavigate();
  const { id } = useParams();

  const editTitle = useStoreState((state) => state.editTitle);
    const editBody = useStoreState((state) => state.editBody);

    const editPost = useStoreActions((actions) => actions.editPost);
    const setEditTitle = useStoreActions((actions) => actions.setEditTitle);
    const setEditBody = useStoreActions((actions) => actions.setEditBody);

    const getPostById = useStoreState((state) => state.getPostById);
    const post = getPostById(id);
  
  
  
  
  
  // const baseURL = "http://localhost:3500/posts";
  useEffect(() => {
    if (post) {
        setEditTitle(post.title);
        setEditBody(post.body);
    }
}, [post, setEditTitle, setEditBody])

const handleEdit = (id) => {
  const datetime = format(new Date(), 'MMMM dd, yyyy pp');
  const updatedPost = { id, title: editTitle, datetime, body: editBody };
  editPost(updatedPost);
  history.push(`/post/${id}`);
}
  return (
    <main className="NewPost">
      {editTitle && (
        <>
          <h2>Edit Post</h2>

          <form className="newPostForm" onSubmit={(e)=>e.preventDefault()}>
            <label htmlFor="postTitle" className="">
              Title:
            </label>
            <input
              id="editTitle"
              type="text"
              required
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <label htmlFor="postBody">Post:</label>
            <textarea
              id="editBody"
              required
              value={editBody}
              onChange={(e) => setEditBody(e.target.value)}
            />
            <button type="button" onClick={() => handleEdit(post.id)}>Submit</button>
          </form>
        </>
      )}
      {!editTitle &&
            <>
              <h2>Post Not found</h2>
              <p>Disaponting.</p>
              <p>
                <Link to="/">Visit to our Homepage</Link>
              </p>
            </>
        }
    </main>
  );
};

export default EditPost;
