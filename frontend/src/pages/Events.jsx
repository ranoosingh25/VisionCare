import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Events.css";

function Events() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [feedback, setFeedback] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const loadEvents = async () => {
    const response = await fetch("/api/events");
    const data = await response.json();
    setEvents(data.events || []);
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleRegister = (eventItem) => {
    if (eventItem.buttonType === "donate") {
      navigate("/donate");
      return;
    }

    setSelectedEvent(eventItem);
    setFeedback("");
  };

  const handleSubmitRegistration = async (event) => {
    event.preventDefault();

    if (!selectedEvent || !fullName || !email || !phone) {
      setFeedback("Please complete all fields before registering.");
      return;
    }

    const response = await fetch(`/api/events/${selectedEvent.id}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        action: selectedEvent.buttonType === "join" ? "join" : "register",
      }),
    });
    const data = await response.json();

    if (!response.ok) {
      setFeedback(data.error || "Unable to register for the event.");
      return;
    }

    const successText = `Successfully registered for ${selectedEvent.title}.`;
    setSelectedEvent(null);
    setFullName("");
    setEmail("");
    setPhone("");
    setFeedback("");
    setSuccessMessage(successText);
    setTimeout(() => setSuccessMessage(""), 6000);
  };

  return (
    <div className="events-page">

      {/* HERO SECTION */}
      <section className="events-hero">

        <h1>Our Upcoming Events</h1>

        <p>
          Join our eye camps, awareness drives,
          and charity programs to support vision care.
        </p>

      </section>

      {/* EVENTS CARDS */}
      <section className="events-container">
        {events.length === 0 ? (
          <p>Loading events...</p>
        ) : (
          events.map((eventItem) => (
            <div key={eventItem.id} className="event-card">
              <img src={eventItem.image || "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d"} alt={eventItem.title} />
              <div className="event-content">
                <h2>{eventItem.title}</h2>
                <p className="event-date">📅 {eventItem.date} | 📍 {eventItem.location}</p>
                <p>{eventItem.description}</p>
                <button type="button" onClick={() => handleRegister(eventItem)}>
                  {eventItem.buttonType === "join"
                    ? "Join Event"
                    : eventItem.buttonType === "donate"
                    ? "Donate Now"
                    : "Register Now"}
                </button>
              </div>
            </div>
          ))
        )}
      </section>

      {successMessage && (
        <section className="event-registration-success">
          <div className="event-registration-success-card">
            <p>{successMessage}</p>
            <button type="button" onClick={() => setSuccessMessage("")}>Close</button>
          </div>
        </section>
      )}
      {selectedEvent && (
        <section className="event-registration">
          <div className="event-registration-card">
            <h2>Register for {selectedEvent.title}</h2>
            <p className="event-date">📅 {selectedEvent.date} | 📍 {selectedEvent.location}</p>
            <form onSubmit={handleSubmitRegistration}>
              <label>
                Full Name
                <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Your name" />
              </label>
              <label>
                Email
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email" />
              </label>
              <label>
                Phone
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Your phone number" />
              </label>
              <div className="event-registration-actions">
                <button type="submit">Submit Registration</button>
                <button type="button" className="cancel-button" onClick={() => setSelectedEvent(null)}>
                  Cancel
                </button>
              </div>
            </form>
            {feedback && <p className="feedback-message">{feedback}</p>}
          </div>
        </section>
      )}

    </div>
  );
}

export default Events;