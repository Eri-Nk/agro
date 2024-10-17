import BlogData from "../data/BlogData";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../UserProvider.jsx";
import FetchedBlog from "./FetchedBlog.jsx";

const Blog = () => {
  const [displayContent, setDisplayContent] = useState({});
  const { user } = useUser();

  const displayBlogContent = (id) => {
    setDisplayContent((prevContent) => ({
      ...prevContent,
      [id]: !prevContent[id],
    }));
  };
  return (
    <div className="blog-data">
      <h1>Blog</h1>
      <ul>
        {BlogData.map((data) => (
          <li key={data.id}>
            <h2>{data.title}</h2>

            <div className="blog-excerpt">
              {data.excerpt && (
                <p>
                  {data.excerpt}
                  <span>
                    <a
                      href={data.source}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="button"
                    >
                      ...read more
                    </a>
                  </span>
                </p>
              )}
            </div>

            {data.content && (
              <>
                <div>
                  {data.content.split("\n").slice(0, 2).join(" ")}
                  <span
                    className="button"
                    onClick={() => displayBlogContent(data.id)}
                    style={{
                      display: displayContent[data.id] ? "none" : "block",
                    }}
                  >
                    ...read more
                  </span>
                </div>
                <span
                  className="blog-content"
                  style={{
                    display: displayContent[data.id] ? "block" : "none",
                  }}
                >
                  {data.content
                    .split("\n")
                    .slice(2)
                    .map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  <span
                    onClick={() => displayBlogContent(data.id)}
                    className="button"
                  >
                    ...See less
                  </span>
                </span>
              </>
            )}
            <h3>{data.author}</h3>
            <h5>{data.date}</h5>
          </li>
        ))}
      </ul>

      <FetchedBlog
        displayContent={displayContent}
        displayBlogContent={displayBlogContent}
      />

      <div className="add-blog">
        <Link
          to={user ? "/blogs/create-blog" : "/signup"}
          className="button button-cta"
        >
          Add a Blog
        </Link>
      </div>
    </div>
  );
};

export default Blog;
