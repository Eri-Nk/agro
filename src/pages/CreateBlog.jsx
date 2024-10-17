import { useState } from "react";
import { db } from "../firebaseConfig";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const capitalizeFirstLetter = (sentence) => {
    const newSentence = sentence.replace(/\b\w/gi, (sentence) =>
      sentence.toUpperCase()
    );
    return newSentence;
  };

  const handleBlogSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    setErrorMessage(null);

    const BlogData = {
      title: capitalizeFirstLetter(title),
      firstName: capitalizeFirstLetter(firstName),
      lastName: capitalizeFirstLetter(lastName),
      content: blogContent,
      createdAt: serverTimestamp(),
    };
    try {
      await addDoc(collection(db, "blogs"), BlogData);
      navigate("/blogs");
      setTitle("");
      setFirstName("");
      setLastName("");
      setBlogContent("");
    } catch (error) {
      setErrorMessage("An error occured, couldn't create blog");
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form onSubmit={handleBlogSubmit}>
      <div>
        <label htmlFor="title">Title</label>
        <textarea
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          required
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="blog-content">Blog Content</label>
        <textarea
          id="blog-content"
          value={blogContent}
          required
          onChange={(e) => setBlogContent(e.target.value)}
        />
      </div>
      <button type="submit" className="button-cta">
        {isLoading ? <span className="spinner"></span> : "submit"}
      </button>
      {errorMessage && <p>{errorMessage}</p>}
    </form>
  );
};

export default CreateBlog;
