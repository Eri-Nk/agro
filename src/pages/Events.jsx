import eventsData from "../data/EventsData.json";
import ModalComponent from "../ModalComponenet";
import { useEffect, useState } from "react";
import { useTheme } from "../contexts/ThemeProvider";
import { useNavigate } from "react-router-dom";
import { db } from "../firebaseConfig";
import { arrayUnion, updateDoc, arrayRemove, doc } from "firebase/firestore";
import { useUser } from "../contexts/UserProvider";
import { BsCheckCircle, BsExclamationCircle } from "react-icons/bs";

const Events = () => {
  const { isDarkTheme } = useTheme();
  const [showModal, setShowModal] = useState(false);
  const [eventMsg, setEventMsg] = useState({});
  const [rsvpStatus, setRsvpStatus] = useState({});
  const { user } = useUser();
  const navigate = useNavigate();
  const [timers, setTimers] = useState({});

  const handleRSVP = async (eventId, title, date) => {
    if (user) {
      try {
        const newStatus = !rsvpStatus[eventId]; // for firestore

        if (newStatus) {
          await updateDoc(doc(db, "users", user.uid), {
            RSVP: arrayUnion({
              Event: title,
              "Event Date": date,
            }),
          });
        } else {
          // Remove event from RSVP, by toggling button
          await updateDoc(doc(db, "users", user.uid), {
            RSVP: arrayRemove({
              Event: title,
              "Event Date": date,
            }),
          });
        }

        setRsvpStatus((prevStatus) => ({
          ...prevStatus,
          [eventId]: newStatus,
        }));

        const msg = newStatus ? "Event added to RSVP" : "RSVP canceled";
        setEventMsg((prevMsg) => ({ ...prevMsg, [eventId]: msg }));

        if (timers[eventId]) {
          clearTimeout(timers[eventId]);
        }
        const newTimer = clearMessage(eventId);
        setTimers((prevTimer) => ({
          ...prevTimer,
          [eventId]: newTimer,
        }));
      } catch (error) {
        console.error("Error updating RSVP status:", error);
        setEventMsg((prevMsg) => ({
          ...prevMsg,
          [eventId]: "Failed to update RSVP. Please try again.",
        }));

        if (timers[eventId]) {
          clearTimeout(timers[eventId]);
        }

        const newTimer = clearMessage(eventId);
        setTimers((prevTimer) => ({
          ...prevTimer,
          [eventId]: newTimer,
        }));
      }
    } else {
      navigate("/user/login");
    }
  };

  const clearMessage = (eventId) => {
    setTimeout(() => {
      setEventMsg((prevMessages) => {
        const updatedMessages = { ...prevMessages };
        delete updatedMessages[eventId];
        return updatedMessages;
      });
    }, 3000);
  };

  useEffect(() => {
    setShowModal(true);
  }, []);
  const centeredStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
    },
  };

  const closeModal = () => setShowModal(false);

  return (
    <div className="events">
      <h1>Upcoming Events</h1>
      <ul>
        {eventsData.map((event) => (
          <li key={event.id}>
            <h2>{event.title}</h2>
            <p>{event.date}</p>
            <p>{event.location}</p>
            <p>{event.description}</p>
            <div
              className="button button-cta"
              onClick={() => handleRSVP(event.id, event.title, event.date)}
            >
              {rsvpStatus[event.id] ? "Cancel RSVP" : "RSVP"}
            </div>
            {eventMsg[event.id] && (
              <div
                className={`message-box ${
                  eventMsg[event.id].includes("added")
                    ? "message-success"
                    : "message-error"
                }`}
              >
                <span className="icon">
                  {eventMsg[event.id].includes("added") ? (
                    <BsCheckCircle />
                  ) : (
                    <BsExclamationCircle />
                  )}
                </span>
                {eventMsg[event.id]}
              </div>
            )}
          </li>
        ))}
      </ul>

      <ModalComponent
        isOpen={showModal}
        contentLabel="events modal"
        additionalStyles={centeredStyles}
        onClose={closeModal}
        isDarkTheme={isDarkTheme}
      >
        <div>
          <p>This site is a project demo, and the events are not real.</p>
        </div>
      </ModalComponent>
    </div>
  );
};

export default Events;
