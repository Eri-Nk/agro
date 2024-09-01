import { NavLink, Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to GreenField Farms!</h1>
          <p>Growing the Future, One Seed at a Time.</p>
          <Link to="/about/products" className="button button-cta">
            Explore our products
          </Link>
        </div>
      </section>

      <h1>Our priority</h1>
      <div className="container">
        <div className="tile-row">
          <div className="tile">
            <h4>Sustainable Agriculture</h4>
            <p>
              Sustainable agriculture practices help preserve the environment,
              improve public health, and ensure future food security.It is
              essential for maintaining the health of our planet while ensuring
              food security. Learn more about sustainable farming practices on
              the FAO's sustainability page. .
            </p>
            <a
              href="https://www.fao.org/sustainability/en/"
              className="button"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read more
            </a>
          </div>

          <div className="tile">
            <h4>Food Security</h4>
            <p>
              Food security ensures that all people, at all times, have physical
              and economic access to sufficient, safe, and nutritious food. For
              more details, see the FAO's PDF document on food security.
            </p>

            <a
              href="https://www.fao.org/fileadmin/templates/faoitaly/documents/pdf/pdf_Food_Security_Cocept_Note.pdf"
              className="button"
              target="_blank"
              rel="noopener noreferrer"
            >
              View PDF Document
            </a>
          </div>

          <div className="tile">
            <h4>Tackling Climate Change</h4>
            <p>
              Recognizing the impact of agriculture on our climate, we adhere to
              FAO standards to mitigate these effects. Learn more by clicking
              the button below.
            </p>
            <a
              href="https://www.fao.org/climate-change/en"
              className="button"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read more
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
