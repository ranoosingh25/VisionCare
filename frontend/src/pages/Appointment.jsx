import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Appointment.css";

function Appointment() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [doctor, setDoctor] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");
  const [feedback, setFeedback] = useState("");
  const location = useLocation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!fullName || !email || !phone || !service || !doctor || !date || !time) {
      setFeedback("Please fill in all required fields.");
      return;
    }

    const response = await fetch("/api/appointments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName,
        email,
        phone,
        service,
        doctor,
        date,
        time,
        message,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      setFeedback(data.error || "Unable to save appointment.");
      return;
    }

    setFeedback("Appointment request saved successfully.");
    setFullName("");
    setEmail("");
    setPhone("");
    setService("");
    setDoctor("");
    setDate("");
    setTime("");
    setMessage("");
  };

  useEffect(() => {
    let mounted = true;
    fetch("/api/doctors")
      .then((res) => res.json())
      .then((data) => {
        if (mounted && data.doctors) setDoctors(data.doctors);
      })
      .catch(() => {
        if (mounted) setDoctors([]);
      });
    return () => (mounted = false);
  }, []);

  useEffect(() => {
    // prefill doctor if passed via navigation state (supports id or name)
    if (location && location.state) {
      if (location.state.doctorId) setDoctor(location.state.doctorId);
      else if (location.state.doctorName) setDoctor(location.state.doctorName);
    }
  }, [location]);

  return (
    <div className="appointment-page">

      {/* HERO */}
      <section className="appointment-hero">
        <h1>Book an Appointment</h1>
        <p>
          Schedule your eye consultation with our expert doctors.
        </p>
      </section>

      {/* FORM SECTION */}
      <section className="appointment-container">

        <form className="appointment-form" onSubmit={handleSubmit}>

          <h2>Patient Information</h2>

          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <select value={service} onChange={(e) => setService(e.target.value)}>
            <option value="">Select Service</option>
            <option value="Cataract Surgery">Cataract Surgery</option>
            <option value="Eye Checkup">Eye Checkup</option>
            <option value="Retina Treatment">Retina Treatment</option>
            <option value="LASIK Surgery">LASIK Surgery</option>
          </select>

          <select value={doctor} onChange={(e) => setDoctor(e.target.value)}>
            <option value="">Select Doctor</option>
            <option value="Dr. Raj Sharma">Dr. Raj Sharma</option>
            <option value="Dr. Priya Mehta">Dr. Priya Mehta</option>
            <option value="Dr. Ahmed Khan">Dr. Ahmed Khan</option>
            <option value="Dr. Kavita Rao">Dr. Kavita Rao</option>
            <option value="Dr. Neha Verma">Dr. Neha Verma</option>
          </select>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />

          <textarea
            rows="4"
            placeholder="Additional Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>

          <button className="appointment-btn" type="submit">
            Confirm Appointment
          </button>

          {feedback && <div className="appointment-feedback">{feedback}</div>}

        </form>

      </section>

    </div>
  );
}

export default Appointment;
