import { useEffect, useState } from "react";
import "./Admin.css";

function Admin() {
  const [users, setUsers] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [donations, setDonations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [events, setEvents] = useState([]);
  const [eventRegistrations, setEventRegistrations] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [editDoctorId, setEditDoctorId] = useState(null);
  const [editFullName, setEditFullName] = useState("");
  const [editSpecialty, setEditSpecialty] = useState("");
  const [editBio, setEditBio] = useState("");
  const [editImage, setEditImage] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState("");
  const [buttonType, setButtonType] = useState("register");
  const [feedback, setFeedback] = useState("");

  const loadUsers = async () => {
    const response = await fetch("/api/users");
    const data = await response.json();
    setUsers(data.users || []);
  };

  const loadAppointments = async () => {
    const response = await fetch("/api/appointments");
    const data = await response.json();
    setAppointments(data.appointments || []);
  };

  const loadDonations = async () => {
    const response = await fetch("/api/donations");
    const data = await response.json();
    setDonations(data.donations || []);
  };

  const loadMessages = async () => {
    const response = await fetch("/api/messages");
    const data = await response.json();
    setMessages(data.messages || []);
  };

  const loadEvents = async () => {
    const response = await fetch("/api/events");
    const data = await response.json();
    setEvents(data.events || []);
  };

  const loadDoctors = async () => {
    const response = await fetch("/api/doctors");
    const data = await response.json();
    setDoctors(data.doctors || []);
  };

  const loadEventRegistrations = async () => {
    const response = await fetch("/api/event-registrations");
    const data = await response.json();
    setEventRegistrations(data.registrations || []);
  };

  const startEditDoctor = (doc) => {
    setEditDoctorId(doc.id);
    setEditFullName(doc.fullName || "");
    setEditSpecialty(doc.specialty || "");
    setEditBio(doc.bio || "");
    setEditImage(doc.image || "");
  };

  const cancelEditDoctor = () => {
    setEditDoctorId(null);
    setEditFullName("");
    setEditSpecialty("");
    setEditBio("");
    setEditImage("");
  };

  const saveEditDoctor = async (id) => {
    const response = await fetch(`/api/doctors/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fullName: editFullName.trim(), specialty: editSpecialty.trim(), bio: editBio.trim(), image: editImage.trim() }),
    });
    const data = await response.json();
    if (!response.ok) {
      setFeedback(data.error || "Unable to update doctor.");
      return;
    }
    cancelEditDoctor();
    loadDoctors();
  };

  const loadData = async () => {
    await Promise.all([
      loadUsers(),
      loadAppointments(),
      loadDonations(),
      loadMessages(),
      loadEvents(),
      loadDoctors(),
      loadEventRegistrations(),
    ]);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (resource, id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) {
      return;
    }

    await fetch(`/api/${resource}/${id}`, { method: "DELETE" });
    loadData();
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();
    setFeedback("");

    const response = await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title.trim(),
        description: description.trim(),
        date,
        location: location.trim(),
        image: image.trim(),
        buttonType,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      setFeedback(data.error || "Unable to add event.");
      return;
    }

    setTitle("");
    setDescription("");
    setDate("");
    setLocation("");
    setImage("");
    setButtonType("register");
    setFeedback("Upcoming event added successfully.");
    loadEvents();
  };

  const handleAddDoctor = async (e) => {
    e.preventDefault();
    setFeedback("");
    // Doctor creation removed from admin UI
  };

  return (
    <div className="admin-page">
      {/* HERO SECTION */}
      <section className="admin-hero">
        <h1>Admin Review Dashboard</h1>
        <p>Review users, appointments, donations, contact messages, and events.</p>
      </section>

      <section className="admin-section admin-section-form">
        <h2>Add Upcoming Event</h2>
        <form className="admin-form" onSubmit={handleAddEvent}>
          <div className="admin-form-grid">
            <label>
              Event Title
              <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Event title" />
            </label>
            <label>
              Location
              <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Event location" />
            </label>
            <label>
              Event Date
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </label>
            <label>
              Action Type
              <select value={buttonType} onChange={(e) => setButtonType(e.target.value)}>
                <option value="register">Register Now</option>
                <option value="join">Join Event</option>
                <option value="donate">Donate Now</option>
              </select>
            </label>
            <label className="admin-form-full">
              Image URL
              <input value={image} onChange={(e) => setImage(e.target.value)} placeholder="Optional image URL" />
            </label>
            <label className="admin-form-full">
              Description
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Event description" rows={4} />
            </label>
          </div>
          <div className="admin-form-actions">
            <button className="admin-submit" type="submit">Add Event</button>
            {feedback && <p className="admin-feedback">{feedback}</p>}
          </div>
        </form>
      </section>
      

      <section className="admin-section">
        <h2>Events ({events.length})</h2>
        {events.length === 0 ? (
          <p>No upcoming events found.</p>
        ) : (
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Date</th>
                  <th>Location</th>
                  <th>Action</th>
                  <th>Manage</th>
                </tr>
              </thead>
              <tbody>
                {events.map((eventItem, index) => (
                  <tr key={eventItem.id}>
                    <td>{index + 1}</td>
                    <td>{eventItem.title}</td>
                    <td>{eventItem.date}</td>
                    <td>{eventItem.location}</td>
                    <td>{eventItem.buttonType}</td>
                    <td>
                      <button className="admin-delete" type="button" onClick={() => handleDelete("events", eventItem.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="admin-section">
        <h2>Event Registrations ({eventRegistrations.length})</h2>
        {eventRegistrations.length === 0 ? (
          <p>No event registrations found.</p>
        ) : (
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Event</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Action</th>
                  <th>Registered At</th>
                  <th>Manage</th>
                </tr>
              </thead>
              <tbody>
                {eventRegistrations.map((reg, index) => (
                  <tr key={reg.id}>
                    <td>{index + 1}</td>
                    <td>{reg.eventTitle || `Event #${reg.eventId}`}</td>
                    <td>{reg.fullName}</td>
                    <td>{reg.email}</td>
                    <td>{reg.phone}</td>
                    <td>{reg.action}</td>
                    <td>{reg.registeredAt}</td>
                    <td>
                      <button className="admin-delete" type="button" onClick={() => handleDelete("event-registrations", reg.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="admin-section">
        <h2>Registered Users ({users.length})</h2>
        {users.length === 0 ? (
          <p>No registered users found.</p>
        ) : (
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Registered At</th>
                  <th>Manage</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user.id}>
                    <td>{index + 1}</td>
                    <td>{user.fullName || "—"}</td>
                    <td>{user.email}</td>
                    <td>{user.createdAt || "—"}</td>
                    <td>
                      <button className="admin-delete" type="button" onClick={() => handleDelete("users", user.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="admin-section">
        <h2>Appointments ({appointments.length})</h2>
        {appointments.length === 0 ? (
          <p>No appointment requests found.</p>
        ) : (
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Service</th>
                  <th>Doctor</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Manage</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment, index) => (
                  <tr key={appointment.id}>
                    <td>{index + 1}</td>
                    <td>{appointment.fullName}</td>
                    <td>{appointment.email}</td>
                    <td>{appointment.phone}</td>
                    <td>{appointment.service}</td>
                    <td>{appointment.doctor}</td>
                    <td>{appointment.date}</td>
                    <td>{appointment.time}</td>
                    <td>
                      <button className="admin-delete" type="button" onClick={() => handleDelete("appointments", appointment.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="admin-section">
        <h2>Donations ({donations.length})</h2>
        {donations.length === 0 ? (
          <p>No donation records found.</p>
        ) : (
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Amount</th>
                  <th>Type</th>
                  <th>Message</th>
                  <th>Manage</th>
                </tr>
              </thead>
              <tbody>
                {donations.map((donation, index) => (
                  <tr key={donation.id}>
                    <td>{index + 1}</td>
                    <td>{donation.fullName}</td>
                    <td>{donation.email}</td>
                    <td>{donation.amount}</td>
                    <td>{donation.type || "custom"}</td>
                    <td>{donation.message || "—"}</td>
                    <td>
                      <button className="admin-delete" type="button" onClick={() => handleDelete("donations", donation.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="admin-section">
        <h2>Contact Messages ({messages.length})</h2>
        {messages.length === 0 ? (
          <p>No contact messages found.</p>
        ) : (
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Message</th>
                  <th>Manage</th>
                </tr>
              </thead>
              <tbody>
                {messages.map((messageItem, index) => (
                  <tr key={messageItem.id}>
                    <td>{index + 1}</td>
                    <td>{messageItem.fullName}</td>
                    <td>{messageItem.email}</td>
                    <td>{messageItem.phone}</td>
                    <td>{messageItem.message}</td>
                    <td>
                      <button className="admin-delete" type="button" onClick={() => handleDelete("messages", messageItem.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

export default Admin;
