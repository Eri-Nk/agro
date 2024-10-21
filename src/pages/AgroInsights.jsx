import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AgroInsights = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const keyID = import.meta.env.VITE_WEATHER_KEY;
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=Port+Harcourt&appid=${keyID}&units=metric`
    )
      .then((response) => response.json())
      .then((data) => {
        setWeatherData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error is", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="agro-insights">
      <h1>Visit Us at Our Farm Location</h1>
      <p>
        Explore our lush agricultural fields in Port Harcourt, where innovation
        meets nature.
      </p>

      <div className="weather-map-content">
        {loading ? (
          <div className="skeleton-loader">
            <div className="skeleton-text title"></div>
            <div className="skeleton-text line"></div>
            <div className="skeleton-text line"></div>
            <div className="skeleton-text line"></div>
          </div>
        ) : (
          <section className="weather-section">
            <p>
              At Eriko Agro, we prioritize excellence in farming. We cultivate
              premium crops with care and dedication, ensuring that every
              harvest meets the highest standards for quality and
              sustainability.
            </p>

            <h2 id="weather-section">Today's Weather in {weatherData.name}</h2>
            <p>
              <strong>Weather Condition:</strong> {weatherData.weather[0].main}{" "}
              ({weatherData.weather[0].description})
            </p>
            <p>
              <strong>Temperature:</strong> {weatherData.main.temp}°C — perfect
              for growing our fresh crops!
            </p>
            <p>
              <strong>Humidity:</strong> {weatherData.main.humidity}% — keeping
              the fields hydrated and healthy.
            </p>
            <p>
              <strong>Wind Speed:</strong> {weatherData.wind.speed} m/s — a
              gentle breeze to carry the scent of our blooming crops.
            </p>
            <p>Whether rain or shine, we're always cultivating growth here!</p>
          </section>
        )}

        <div className="call-to-action">
          <h3>You can also explore some of our products and services</h3>
          <Link to="/about/products-and-services" className="button button-cta">
            Explore
          </Link>
        </div>

        <section id="map-section" className="map-section">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31804.780687660794!2d7.036811916818454!3d4.838950300725542!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1069cd41a92a7d39%3A0xa5c51adf45dadfac!2sElelenwo%2C%20Port%20Harcourt%2C%20Rivers!5e0!3m2!1sen!2sng!4v1726493903469!5m2!1sen!2sng"
            width="400"
            height="250"
            style={{ border: 0 }}
            allow="fullscreen"
            loading="lazy"
            title="Google Map"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </section>
      </div>
    </div>
  );
};

export default AgroInsights;
