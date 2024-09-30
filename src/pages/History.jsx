import Breadcrumbs from "../Breadcrumbs";
import data from "../data/ChartData.js";
import LineChart from "../LineChart.jsx";
import { Link } from "react-router-dom";

const History = () => {
  return (
    <div className="history">
      <Breadcrumbs />
      <h1>Our Agricultural Evolution</h1>

      <p>
        Our agricultural journey began in 2020, during a time of significant
        challenges. We developed an innovative food processing method that
        integrates both subsistence and commercial farming. This approach has
        enabled us to produce a stable and ample supply of food year after year.
      </p>

      <section className="year-progress">
        <h2>Annual Production Overview</h2>
        <p>
          The graph below highlights our annual food production trends over the
          years.
        </p>
        <div className="chart-container" style={{ paddingBottom: "2em" }}>
          <LineChart data={data} />
        </div>
      </section>

      <section className="call-to-action">
        <h2>Discover Our Products and Services</h2>
        <Link to="/about/products-and-services" className="button button-cta">
          Explore Now
        </Link>
      </section>
    </div>
  );
};

export default History;
