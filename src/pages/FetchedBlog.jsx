import { db } from "../firebaseConfig";
import {
  collection,
  onSnapshot,
  deleteDoc,
  doc,
  orderBy,
  query,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { useUser } from "../UserProvider";
import { FaRegTrashAlt } from "react-icons/fa";

const FetchedBlog = ({ displayContent, displayBlogContent }) => {
  const colRef = collection(db, "blogs");
  const [fetchedBlogs, setFetchedBlogs] = useState([]);
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(true);

  const q = query(colRef, orderBy("createdAt", "desc"));
  useEffect(() => {
    const unsubBlogs = onSnapshot(
      q,
      (snapshot) => {
        const blogs = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setIsLoading(false);
        setFetchedBlogs(blogs);
      },
      (error) => {
        console.error("Error fetching snapshot:", error.message);
      }
    );
    return () => unsubBlogs();
  }, []);

  const handleDeleteBlog = async (id) => {
    const docRef = doc(db, "blogs", id);
    await deleteDoc(docRef);
    console.log("deleted successfully");
  };

  return (
    <div className="user-blog">
      {isLoading ? (
        <div className="skeleton-loader">
          <div className="skeleton-text title"></div>
          <div className="skeleton-text body"></div>
          <div className="skeleton-text author"></div>
          <div className="skeleton-text date"></div>
        </div>
      ) : fetchedBlogs.length > 0 ? (
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
    </div>
  );
};

export default FetchedBlog;
