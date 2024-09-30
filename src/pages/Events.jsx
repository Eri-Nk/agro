import eventsData from "../data/EventsData.json";
import ModalComponent from "../ModalComponenet";
import { useEffect, useState } from "react";
import { useTheme } from "../ColorTheme";

const Events = () => {
  const [rsvpStatus, setRsvpStatus] = useState({});
  const [showModal, setShowModal] = useState(false);
  const { isDarkTheme } = useTheme();

  const handleRSVP = (eventId) => {
    setRsvpStatus((prevStatus) => ({
      ...prevStatus,
      [eventId]: !prevStatus[eventId],
    }));
  };

  console.log(rsvpStatus);
  useEffect(() => {
    setShowModal(true);
  }, []);
  const centeredStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)", // Centering the modal
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
              onClick={() => handleRSVP(event.id)}
            >
              {rsvpStatus[event.id] ? "Cancel RSVP" : "RSVP"}
            </div>
          </li>
        ))}
      </ul>

      <ModalComponent
        isOpen={showModal}
        contentLabel={"events modal"}
        additionalStyles={centeredStyles}
        onClose={closeModal}
        isDarkTheme={isDarkTheme}
      >
        <div>
          <p>
            This is a demo RSVP feature. No actual registration is taking place.
          </p>
        </div>
      </ModalComponent>
    </div>
  );
};

export default Events;
