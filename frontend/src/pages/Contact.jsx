import { useState } from "react";
import "./Contact.css";

function Contact() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!fullName || !email || !phone || !message) {
      setFeedback("Please complete all fields before sending your message.");
      return;
    }

    const response = await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        message: message.trim(),
      }),
    });
    const data = await response.json();

    if (!response.ok) {
      setFeedback(data.error || "Unable to send message.");
      return;
    }

    setFeedback("Your message has been saved successfully.");
    setFullName("");
    setEmail("");
    setPhone("");
    setMessage("");
  };

  return (
    <div className="contact-page">

      {/* HERO SECTION */}
      <section className="contact-hero">

        <h1>Contact VisionCare Charity</h1>

        <p>
          We are here to help you with appointments,
          treatments, and emergency eye care services.
        </p>

      </section>

      {/* CONTACT SECTION */}
      <section className="contact-container">

        {/* LEFT SIDE */}
        <div className="contact-info">

          <div className="info-box">
            <h2>📍 Address</h2>
            <p>Nagpur, Maharashtra, India</p>
          </div>

          <div className="info-box">
            <h2>📞 Phone</h2>
            <p>+91 9876543210</p>
          </div>

          <div className="info-box">
            <h2>📧 Email</h2>
            <p>visioncare@gmail.com</p>
          </div>

          <div className="info-box">
            <h2>⏰ Working Hours</h2>
            <p>Mon - Sat : 9 AM - 8 PM</p>
          </div>

          <div className="emergency-box">
            <h2>🚨 Emergency Care</h2>

            <p>
              24/7 emergency eye care services available
              for urgent treatments.
            </p>

            <button>Call Emergency</button>
          </div>

        </div>

        {/* RIGHT SIDE */}
        <form className="contact-form" onSubmit={handleSubmit}>

          <h2>Send Us a Message</h2>

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

          <textarea
            rows="6"
            placeholder="Write your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>

          <button type="submit">Send Message</button>

          {feedback && <div className="contact-feedback">{feedback}</div>}

        </form>

      </section>

    </div>
  );
}

export default Contact;





