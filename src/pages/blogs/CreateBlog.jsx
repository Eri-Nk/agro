import { useState } from "react";
import { db, auth } from "../../firebaseConfig";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const user = auth.currentUser;

  const capitalizeFirstLetter = (sentence) => {
    const newSentence = sentence.replace(/\b\w/gi, (boundaryWord) =>
      boundaryWord.toUpperCase()
    );
    return newSentence;
  };

  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    if (!user) {
      setErrorMessage("You must be logged in to create a blog post.");
      return;
    }
    setIsLoading(true);

    const BlogData = {
      title: capitalizeFirstLetter(title),
      firstName: capitalizeFirstLetter(firstName),
      lastName: capitalizeFirstLetter(lastName),
      content: blogContent,
      createdAt: serverTimestamp(),
      authorId: user ? user.uid : null,
    };
    try {
      await addDoc(collection(db, "blogs"), BlogData);
      navigate("/blogs/blog-component");
      setTitle("");
      setFirstName("");
      setLastName("");
      setBlogContent("");
    } catch (error) {
      setErrorMessage("An error occured, couldn't create blog");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="create-blog">
      <Helmet>
        <title>Create Blog | Eriko Agro</title>
      </Helmet>
      <form onSubmit={handleBlogSubmit}>
        <h1>Create Blog</h1>
        <div>
          <label htmlFor="title">Blog Title</label>
          <textarea
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="firstName">Author FirstName</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            id="firstName"
            required
          />
        </div>

        <div>
          <label htmlFor="lastName">Author LastName</label>
          <input
            type="text"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            id="lastName"
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
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </form>
    </div>
  );
};

export default CreateBlog;
