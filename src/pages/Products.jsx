import { useEffect, useState } from "react";
import Breadcrumbs from "../Breadcrumbs";
import ServicesData from "../data/ServicesData.js";
import { HashLink } from "react-router-hash-link";

const Products = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const nextSlide = () => {
    setSlideIndex((prevIndex) =>
      prevIndex === ServicesData.length - 1 ? 0 : prevIndex + 1
    );
    resetAutoSlide();
  };

  const prevSlide = () => {
    setSlideIndex((prevIndex) =>
      prevIndex === 0 ? ServicesData.length - 1 : prevIndex - 1
    );
    resetAutoSlide();
  };
  const currentSlide = (n) => {
    setSlideIndex(n);
    resetAutoSlide();
  };

  useEffect(() => {
    const autoSlide = () => {
      setSlideIndex((prevIndex) =>
        prevIndex === ServicesData.length - 1 ? 0 : prevIndex + 1
      );
    };

    const timeOut = setTimeout(autoSlide, 5000);
    return () => clearTimeout(timeOut);
  }, [slideIndex]);

  const resetAutoSlide = () => {
    clearTimeout();
  };

  return (
    <div className="products-services-page">
      <Breadcrumbs />
      <h1>Our Products & Services</h1>

      <div className="services-intro">
        <h2>
          We offer professional agricultural services that have evolved over the
          years to meet your needs.
        </h2>
        <p>
          Explore our range of services designed to help you maximize your
          agricultural potential and resources.
        </p>
      </div>

      <div className="services-section">
        {ServicesData.map((service, index) => (
          <div
            className="service-card fade"
            key={index}
            style={{ display: index === slideIndex ? "block" : "none" }}
          >
            <img
              src={service.img}
              alt={service.h2}
              style={{ width: "100%", height: "500px" }}
            />

            <h2>{service.h2}</h2>
            <p>{service.description}</p>
          </div>
        ))}

        <div className="slider-arrows">
          <span className="prev" onClick={() => prevSlide()}>
            &#10094;
          </span>
          <span className="next" onClick={() => nextSlide()}>
            &#10095;
          </span>
        </div>

        <div className="dots-container">
          {ServicesData.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === slideIndex ? "active" : ""}`}
              onClick={() => currentSlide(index)}
            ></span>
          ))}
        </div>
      </div>

      <p className="products-intro">
        We deliver a variety of quality agricultural products tailored to your
        needs.
      </p>
      <div className="products-services-grid">
        <a href="#" className="product-item">
          {/* img source: https://fdbeck.com.au/consultant-insurance/agricultural/ */}
          <img
            src="/product_images/consultancy.jpg"
            alt="consultancy session"
          />
          <h2>Expert Agricultural Consultancy</h2>
          <div className="description">
            <p> Get professional advice for improving your farm’s yield.</p>
          </div>
        </a>

        <a href="#" className="product-item">
          <img src="/product_images/crops.jfif" alt="freshly harvested crops" />
          <h2>Fresh Organic Produce</h2>
          <div className="description">
            <p>Locally grown, organic fruits and vegetables</p>
          </div>
        </a>

        <a href="#" className="product-item">
          <img src="/product_images/equipment.jfif" alt="equipment" />
          <h2>Modern Farm Equipment</h2>
          <div className="description">
            <p>High quality tools and machinery for efficient farming.</p>
          </div>
        </a>

        <a href="#" className="product-item">
          <img src="/product_images/farm_animals.jfif" alt="farm animals" />
          <h2>Healthy livestock</h2>
          <div className="description">
            <p>We ensure the best care for our livestock</p>
          </div>
        </a>

        <a href="#" className="product-item">
          <img src="/product_images/fertilizer.jfif" alt="organic manure" />
          <h2>Eco-friendly Fertilizers</h2>
          <div className="description">
            <p>Organic soil enhancer for healthier crops</p>
          </div>
        </a>

        <a href="#" className="product-item">
          <img src="/product_images/greenhouse.jfif" alt="greenhouse section" />
          <h2>Sustainable Greenhouse</h2>
          <div className="description">
            <p>Advanced greenhouse systems for year-round farming.</p>
          </div>
        </a>

        <a href="#" className="product-item">
          <img
            src="/product_images/irrigation_structure.jfif"
            alt="irrigation system"
          />
          <h2>Efficient Irrigation System</h2>
          <div className="description">
            <p>Customized irrigation systems for water conservation.</p>
          </div>
        </a>

        <a href="#" className="product-item">
          {/* img source:https://www.bworldonline.com/economy/2023/10/10/550869/regulator-announces-incentive-scheme-favoring-use-of-eco-friendly-pesticides/ */}
          <img
            src="/product_images/Pesticide_farmer.jpg"
            alt="applying pesticides"
          />
          <h2>Natural Pest Control</h2>
          <div className="description">
            <p>Safe and effective pest management solutions.</p>
          </div>
        </a>

        <a href="#" className="product-item">
          <img
            src="/product_images/research_lab.jfif"
            alt="greenhouse section"
          />
          <h2>Innovative Agricultural research</h2>
          <div className="description">
            <p>
              We’re advancing sustainable farming practices through research.
            </p>
          </div>
        </a>
      </div>

      <section className="call-to-action">
        <p>For more enquiries about our services, feel free to contact us.</p>
        <HashLink
          smooth
          to="/about/agro-insights#weather-section"
          className="button button-cta"
        >
          Get In Touch
        </HashLink>
      </section>
    </div>
  );
};

export default Products;
