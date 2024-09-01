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
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={closeModal}
          >
            Home
          </NavLink>
        </li>
        <li className="about">
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={closeModal}
          >
            About
          </NavLink>
          <IoMdArrowDropdown
            className={`arrow ${isAboutOpen ? "show-inverse-about" : ""}`}
            onClick={() => setisAboutOpen((prevState) => !prevState)}
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
              <NavLink onClick={closeModal} to="/about/products">
                Products & Services
              </NavLink>
            </li>
            <li>
              <NavLink onClick={closeModal} to="/about/location">
                Location
              </NavLink>
            </li>
            <li>
              <NavLink onClick={closeModal} to="/about/contact">
                Contact
              </NavLink>
            </li>
          </ul>
        </li>
        <li>
          <NavLink
            to="/events"
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={closeModal}
          >
            Events
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/gallery"
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={closeModal}
          >
            Gallery
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/blogs"
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={closeModal}
          >
            Blog
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavComp;
