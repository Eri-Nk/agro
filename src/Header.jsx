import { NavLink, Link } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState, useEffect } from "react";
import { FaMoon } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoIosSunny } from "react-icons/io";
import ModalComponent from "./ModalComponenet";
import NavComp from "./NavComp";
import { useTheme } from "./contexts/ThemeProvider";
import { useUser } from "./contexts/UserProvider";
import UserInfo from "./UserInfo";
import Search from "./Search";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 992);
  const { isDarkTheme, setisDarkTheme } = useTheme();
  const [userInfoVisible, setUserInfoVisible] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const { user } = useUser();

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

  const toggleUserInfo = () => {
    setUserInfoVisible((prevInfo) => !prevInfo);
  };

  const toggleSearchModal = () => {
    setIsSearchModalOpen((prevModal) => !prevModal);
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
            Eriko Agro
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
          {user ? (
            <div style={{ color: "#e8dfdf", fontWeight: "bold" }}>
              Welcome,{" "}
              <span onClick={toggleUserInfo} style={{ cursor: "pointer" }}>
                {user.firstName}
              </span>
              {userInfoVisible && (
                <UserInfo
                  userInfoVisible={userInfoVisible}
                  setUserInfoVisible={setUserInfoVisible}
                />
              )}
            </div>
          ) : (
            <NavLink to="/user/login">Sign in</NavLink>
          )}
        </div>
        <FaMagnifyingGlass
          className="search-lens"
          style={{
            height: "30px",
            cursor: "pointer",
            padding: "0 0.5em",
          }}
          onClick={toggleSearchModal}
        />
        {isSearchModalOpen && (
          <Search
            isSearchModalOpen={isSearchModalOpen}
            setIsSearchModalOpen={setIsSearchModalOpen}
          />
        )}
        <div className="theme">
          <FaMoon
            onClick={toggleDarkTheme}
            style={{
              color: "#def249",
              display: isDarkTheme ? "none" : "block",
              cursor: "pointer",
              paddingLeft: "7px",
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
