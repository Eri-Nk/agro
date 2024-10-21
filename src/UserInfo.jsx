import ModalComponent from "./ModalComponenet";
import { signOut } from "firebase/auth";
import { auth } from "./firebaseConfig.js";
import { useUser } from "./contexts/UserProvider.jsx";
import { useTheme } from "./contexts/ThemeProvider.jsx";
import { BsEmojiSunglasses } from "react-icons/bs";
import { useState, useEffect } from "react";

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
        <p>
          Hello,{user.firstName} {user.lastName}{" "}
          <BsEmojiSunglasses style={{ paddingLeft: "10px" }} />
        </p>
        <p>{timeMsg}</p>
        <p>{user.email}</p>

        {/* Display events if available */}
        {user.events && user.events.length > 0 && (
          <div>
            <h3>RSVP'd Events:</h3>
            <ul>
              {user.events.map((event, index) => (
                <li key={index}>
                  {event.Event} - {event["Event Date"]}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="button button-cta" onClick={signOutUser}>
          Sign Out
        </div>
      </div>
    </ModalComponent>
  );
};

export default UserInfo;
