import { NavLink, Link } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState, useEffect, useRef } from "react";
import { FaMoon } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoIosSunny } from "react-icons/io";
import ModalComponent from "./ModalComponenet";
import NavComp from "./NavComp";
import { useTheme } from "./ColorTheme";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 992);
  const { isDarkTheme, setisDarkTheme } = useTheme();
  const refInput = useRef(null);

  const handleResize = () => {
    setIsLargeScreen(window.innerWidth >= 992);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isLargeScreen) {
      setIsMenuOpen(false);
    }
  }, [isLargeScreen]);

  const toggleMenu = () => {
    setIsMenuOpen((isMenuOpen) => !isMenuOpen);
  };

  const handleLensFocus = () => {
    if (refInput.current) {
      refInput.current.focus();
    }
  };

  const toggleDarkTheme = () => {
    setisDarkTheme((prevTheme) => {
      const newTheme = !prevTheme;
      if (newTheme) {
        document.body.classList.add("dark-theme");
      } else {
        document.body.classList.remove("dark-theme");
      }
      return newTheme;
    });
  };

  const closeModal = () => {
    setIsMenuOpen(false);
  };

  return (
    <header>
      <div className="header-first">
        <RxHamburgerMenu
          className="hamburger"
          onClick={toggleMenu}
          style={{
            width: "30px",
            height: "30px",
            paddingTop: "0",
            cursor: "pointer",
          }}
        />
        <div className="logo">
          <Link to="/home" onClick={closeModal}>
            Eriko's Agro
          </Link>
        </div>
      </div>
      {isLargeScreen ? (
        <NavComp isMenuOpen={isMenuOpen} />
      ) : (
        <ModalComponent
          isOpen={isMenuOpen}
          contentLabel="Menu Modal"
          onClose={closeModal}
          isDarkTheme={isDarkTheme}
        >
          <NavComp isMenuOpen={isMenuOpen} closeModal={closeModal} />
        </ModalComponent>
      )}

      <div className="header-end">
        <div className="login">
          <NavLink to="/login">Sign in</NavLink>
        </div>
        <FaMagnifyingGlass
          className="search-lens"
          style={{
            height: "30px",
            cursor: "pointer",
            padding: "0 0.5em",
          }}
          onClick={handleLensFocus}
        />
        <div className="theme">
          <FaMoon
            onClick={toggleDarkTheme}
            style={{
              color: "#def249",
              display: isDarkTheme ? "none" : "block",
              cursor: "pointer",
              paddingLeft: "0.5em",
            }}
          />
          <IoIosSunny
            onClick={toggleDarkTheme}
            style={{
              color: "#d5f00a",
              display: isDarkTheme ? "block" : "none",
              cursor: "pointer",
              paddingLeft: "0.5em",
              height: "30px",
            }}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
