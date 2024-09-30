import BlogData from "../data/BlogData";
import { useState } from "react";

const Blog = () => {
  const [displayContent, setDisplayContent] = useState({});

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

            <p
              className="blog-excerpt"
              style={{ display: displayContent[data.id] ? "none" : "block" }}
            >
              {data.excerpt}

              {data.source ? (
                <a
                  href={data.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button"
                >
                  Read more
                </a>
              ) : (
                <span
                  onClick={() => displayBlogContent(data.id)}
                  className="button"
                >
                  Read more
                </span>
              )}
            </p>
            {data.content && (
              <div
                className="blog-content"
                style={{ display: displayContent[data.id] ? "block" : "none" }}
              >
                {data.content.split("\n").map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
                <span
                  onClick={() => displayBlogContent(data.id)}
                  className="button"
                >
                  See less
                </span>
              </div>
            )}
            <h3>{data.author}</h3>
            <h5>{data.date}</h5>
          </li>
        ))}
      </ul>
      <div className="button button-cta">Add a Blog</div>
    </div>
  );
};

export default Blog;
