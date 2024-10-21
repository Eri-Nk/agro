import { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { IoMdArrowDropdown } from "react-icons/io";

const NavComp = ({ isMenuOpen, closeModal }) => {
  const [isAboutOpen, setisAboutOpen] = useState(false);
  const nestedAboutLinksRef = useRef(null);

  return (
    <nav>
      <ul className={`navbar ${isMenuOpen ? "show-nav" : ""}`}>
        <li>
          <NavLink to="/" onClick={closeModal}>
            Home
          </NavLink>
        </li>
        <li
          className="about"
          onMouseEnter={() => setisAboutOpen(true)}
          onMouseLeave={() => setisAboutOpen(false)}
        >
          <span>About</span>
          <IoMdArrowDropdown
            className={`arrow ${isAboutOpen ? "show-inverse-about" : ""}`}
          />

          <ul
            className="nested-about-links"
            ref={nestedAboutLinksRef}
            style={{
              maxHeight: isAboutOpen
                ? `${nestedAboutLinksRef.current.scrollHeight}px`
                : "0",
              opacity: isAboutOpen ? 1 : 0,
            }}
          >
            <li>
              <NavLink onClick={closeModal} to="/about/history">
                History
              </NavLink>
            </li>
            <li>
              <NavLink onClick={closeModal} to="/about/products-and-services">
                Products & Services
              </NavLink>
            </li>
            <li>
              <NavLink onClick={closeModal} to="/about/agro-insights">
                AgroInsights
              </NavLink>
            </li>
          </ul>
        </li>
        <li>
          <NavLink to="/events" onClick={closeModal}>
            Events
          </NavLink>
        </li>
        <li>
          <NavLink to="/fun-facts" onClick={closeModal}>
            Fun Facts
          </NavLink>
        </li>
        <li>
          <NavLink to="/blogs/blog-component" onClick={closeModal}>
            Blog
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavComp;
