import { db } from "../../firebaseConfig.js";
import {
  collection,
  onSnapshot,
  deleteDoc,
  doc,
  orderBy,
  query,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { useUser } from "../../contexts/UserProvider.jsx";
import { FaRegTrashAlt } from "react-icons/fa";

const FetchedBlog = () => {
  const colRef = collection(db, "blogs");
  const [fetchedBlogs, setFetchedBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const { user } = useUser();

  const q = query(colRef, orderBy("createdAt", "desc"));
  useEffect(() => {
    const unsubBlogs = onSnapshot(q, (snapshot) => {
      const blogs = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setFetchedBlogs(blogs);
    });
    return () => unsubBlogs();
  }, [q]);

  const handleDeleteBlog = async (id) => {
    setErrorMessage(null);
    try {
      const docRef = doc(db, "blogs", id);
      await deleteDoc(docRef);
    } catch (error) {
      setErrorMessage("An error occurred while trying to delete the blog");
      setTimeout(() => {
        setErrorMessage(null);
      }, 7000);
    }
  };

  return (
    <div className="user-blog">
      {fetchedBlogs.length > 0 ? (
        <ul>
          {fetchedBlogs.map((blog) => (
            <li key={blog.id}>
              <div className="blog-header">
                <h2>{blog.title}</h2>
                <button
                  type="button"
                  onClick={() => handleDeleteBlog(blog.id)}
                  style={{ display: user ? "inline-block" : "none" }}
                >
                  <FaRegTrashAlt style={{ color: "var(--cta-primary)" }} />
                </button>
              </div>

              {blog.content && (
                <div className="fetched-blog-content">
                  {blog.content.split("\n").map((content, index) => (
                    <p key={index}>{content}</p>
                  ))}
                </div>
              )}

              <h3>
                {blog.firstName} {blog.lastName}
              </h3>
              <h5>
                {blog.createdAt
                  ? blog.createdAt.toDate().toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })
                  : "No date available"}
              </h5>
            </li>
          ))}
        </ul>
      ) : (
        <p>No User Blog yet</p>
      )}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
};

export default FetchedBlog;
