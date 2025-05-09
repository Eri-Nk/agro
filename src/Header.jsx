import { NavLink, Link } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState, useEffect } from "react";
import { FaMoon } from "react-icons/fa";
import { RxMagnifyingGlass } from "react-icons/rx";
import { IoIosSunny } from "react-icons/io";
import ModalComponent from "./ModalComponenet";
import NavComp from "./NavComp";
import { useTheme } from "./contexts/ThemeProvider";
import { useUser } from "./contexts/UserProvider";
import UserInfo from "./UserInfo";
import Search from "./Search";
import Tooltip from "./Tooltip";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 992);
  const { isDarkTheme, setisDarkTheme } = useTheme();
  const [userInfoVisible, setUserInfoVisible] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const { user } = useUser();

  const [tooltipVisible, setTooltipVisible] = useState(false);

  // tooltip useffect
  useEffect(() => {
    if (user?.firstName) {
      setTooltipVisible(true);
      const timer = setTimeout(() => setTooltipVisible(false), 10000);
      return () => clearTimeout(timer);
    }
  }, [user?.firstName]);

  //automatic responsive header
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  //automatic responsive header
  useEffect(() => {
    if (isLargeScreen) {
      setIsMenuOpen(false);
    }
  }, [isLargeScreen]);

  const handleToggleTooltip = () => {
    setTooltipVisible(!tooltipVisible);
  };

  const handleResize = () => {
    setIsLargeScreen(window.innerWidth >= 992);
  };

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
          {user?.firstName ? (
            <div
              style={{ color: "#e8dfdf", fontWeight: "bold" }}
              className="welcome-message"
            >
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
              {tooltipVisible && <Tooltip closeTooltip={handleToggleTooltip} />}
            </div>
          ) : (
            <NavLink to="/user/login">Sign in</NavLink>
          )}
        </div>
        <RxMagnifyingGlass
          className="search-lens"
          style={{
            height: "30px",
            cursor: "pointer",
            padding: "0 7px",
            fontSize: "20px",
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
              paddingRight: "5px",
              paddingLeft: "4px",
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
