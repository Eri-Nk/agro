import eventsData from "../data/EventsData.json";
import ModalComponent from "../ModalComponenet";
import { useEffect, useState } from "react";
import { useTheme } from "../contexts/ThemeProvider";
import { useNavigate } from "react-router-dom";
import { db } from "../firebaseConfig";
import { arrayUnion, updateDoc, arrayRemove, doc } from "firebase/firestore";
import { useUser } from "../contexts/UserProvider";
import { BsCheckCircle, BsExclamationCircle } from "react-icons/bs";
import { Helmet } from "react-helmet-async";

const Events = () => {
  const { isDarkTheme } = useTheme();
  const [showModal, setShowModal] = useState(false);
  const [eventMsg, setEventMsg] = useState({});
  const [rsvpStatus, setRsvpStatus] = useState({});
  const { user } = useUser();
  const navigate = useNavigate();
  const [timers, setTimers] = useState({});

  useEffect(() => {
    return () => {
      Object.values(timers).forEach(clearTimeout);
    };
  }, [timers]);

  //populating the events ID from firestore
  useEffect(() => {
    if (user && user.events) {
      const initialStatus = user.events.reduce((status, event) => {
        status[event.EventId] = true;
        return status;
      }, {});
      setRsvpStatus(initialStatus);
    } else {
      setRsvpStatus({});
    }
  }, [user]);

  const handleRSVP = async (eventId, title, date) => {
    if (user) {
      try {
        const newStatus = !rsvpStatus[eventId]; // for firestore

        if (newStatus) {
          await updateDoc(doc(db, "users", user.uid), {
            RSVP: arrayUnion({
              Event: title,
              "Event Date": date,
              EventId: eventId,
            }),
          });
        } else {
          // Remove event from RSVP, by toggling button
          await updateDoc(doc(db, "users", user.uid), {
            RSVP: arrayRemove({
              Event: title,
              "Event Date": date,
              EventId: eventId,
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
        clearMessage(eventId);
      } catch (error) {
        setEventMsg((prevMsg) => ({
          ...prevMsg,
          [eventId]: "Failed to update RSVP. Please try again.",
        }));

        if (timers[eventId]) {
          clearTimeout(timers[eventId]);
        }

        clearMessage(eventId);
      }
    } else {
      navigate("/user/login");
    }
  };

  const clearMessage = (eventId) => {
    const timer = setTimeout(() => {
      setEventMsg((prevMessages) => {
        const updatedMessages = { ...prevMessages };
        delete updatedMessages[eventId];
        return updatedMessages;
      });
      setTimers((prevTimers) => {
        const updatedTimers = { ...prevTimers };
        delete updatedTimers[eventId];
        return updatedTimers;
      });
    }, 3000);
    setTimers((prevTimers) => ({ ...prevTimers, [eventId]: timer }));
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
      <Helmet>
        <title>Events | Eriko Agro</title>
        <meta
          name="description"
          content="Join our events and learn more about sustainable agriculture practices and Eriko Agro initiatives."
        />
      </Helmet>

      <h1 id="upcoming-events">Upcoming Events</h1>
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
