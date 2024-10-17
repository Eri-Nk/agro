import { FaWhatsapp, FaYoutube, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";
import { HashLink } from "react-router-hash-link";

const Footer = () => {
  return (
    <footer className="footer" id="footer">
      <div className="footer-content">
        <div className="contact-us">
          <h3>CONTACT</h3>
          <p>Eriko Agro services</p>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
          <p>123-456-789</p>
          <p>
            Find us at:
            <HashLink smooth to="/about/agro-insights#weather-section">
              Our Location
            </HashLink>
          </p>
        </div>

        <div className="connect-with-us">
          <h3>CONNECT</h3>
          <ul className="social-media">
            <li>
              <a href="#footer" aria-label="Twitter">
                <FaXTwitter />
              </a>
            </li>
            <li>
              <a href="#footer" aria-label="Whatsapp">
                <FaWhatsapp />
              </a>
            </li>
            <li>
              <a href="#footer" aria-label="Linkedin">
                <FaLinkedin />
              </a>
            </li>
            <li>
              <a href="#footer" aria-label="Youtube">
                <FaYoutube />
              </a>
            </li>
            <li>
              <a href="#footer" aria-label="Mail">
                <IoMail />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-last-row">
        <ul className="extra-links">
          <li>
            <a href="#footer">Privacy Policy</a>
          </li>
          <li>
            <a href="#footer">Terms of Service</a>
          </li>
        </ul>

        <span>
          Copyright &#169; {new Date().getFullYear()} Eriko Agro Services
        </span>
      </div>
    </footer>
  );
};

export default Footer;
