import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const NotFound = () => {
  return (
    <div className="not-found-container">
      <Helmet>
        <title>Page Not Found | Eriko Agro</title>
      </Helmet>

      <h1>404 - Page Not Found</h1>
      <p>
        Oops! The page you are looking for doesn&apos;t exist. Let&apos;s get
        you back to the
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
