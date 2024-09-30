import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="not-found-container">
      <h1>404 - Page Not Found</h1>
      <p>
        Oops! The page you're looking for doesn't exist. Let's get you back to
        the
        <Link to="/" className="home-link">
          {" "}
          home page
        </Link>
        .
      </p>
    </div>
  );
};

export default NotFound;
