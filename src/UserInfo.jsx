import ModalComponent from "./ModalComponenet";
import { signOut } from "firebase/auth";
import { auth } from "./firebaseConfig.js";
import { useUser } from "./contexts/UserProvider.jsx";
import { useTheme } from "./contexts/ThemeProvider.jsx";
import { BsEmojiSunglasses } from "react-icons/bs";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const UserInfo = ({ userInfoVisible, setUserInfoVisible }) => {
  const [timeMsg, setTimeMsg] = useState(null);
  const { user } = useUser();
  const { isDarkTheme } = useTheme();

  const userInfoStyles = {
    content: {
      top: "4em",
      right: "0",
      left: "auto",
      bottom: "auto",
      borderBottomLeftRadius: "20px",
      borderTopLeftRadius: "20px",
      backgroundColor: "var(--dark-bg-block)",
      color: "var(--dark-color)",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      zIndex: "99",
    },
    overlay: {
      zIndex: "98px",
    },
  };

  useEffect(() => {
    const time = new Date().getHours();
    if (time < 12) {
      setTimeMsg("Good Morning");
    } else if (time >= 12 && time < 16) {
      setTimeMsg("Good Afternoon");
    } else {
      setTimeMsg("Good Evening");
    }
  }, []);

  const signOutUser = async () => {
    await signOut(auth);
    closeModal();
  };
  const closeModal = () => {
    setUserInfoVisible(false);
  };
  return (
    <ModalComponent
      isOpen={userInfoVisible}
      onClose={closeModal}
      isDarkTheme={isDarkTheme}
      contentLabel="user's info modal"
      additionalStyles={userInfoStyles}
    >
      <div className="user-info">
        {user && (
          <div>
            <p>
              Hello, {user.firstName} {user.lastName}
            </p>
            <p className="greetings">
              {timeMsg} <BsEmojiSunglasses style={{ paddingLeft: "10px" }} />
            </p>
            <p className="user-email">{user.email}</p>
          </div>
        )}

        {/* Display events if available */}
        {user.events && user.events.length > 0 ? (
          <div>
            <h3>RSVP&apos;d Events:</h3>
            <ul>
              {user.events.map((event, index) => (
                <li key={index}>
                  {event.Event} - {event["Event Date"]}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>You currently have no RSVP&apos;d events.</p>
        )}

        <p className="rsvp-message">
          Want to RSVP for more events? Check out our{" "}
          <Link to={"/events"} onClick={closeModal}>
            Events
          </Link>{" "}
          page!
        </p>

        <div className="button button-cta" onClick={signOutUser}>
          Sign Out
        </div>
      </div>
    </ModalComponent>
  );
};

export default UserInfo;
