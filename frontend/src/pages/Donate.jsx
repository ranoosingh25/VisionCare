import { useState } from "react";
import "./Donate.css";

function Donate() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleQuickDonate = async (value) => {
    const response = await fetch("/api/donations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: fullName.trim() || "Anonymous",
        email: email.trim().toLowerCase() || "anonymous@visioncare.org",
        amount: value,
        message: message.trim(),
        type: "quick",
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      setFeedback(data.error || "Unable to save donation.");
      return;
    }

    setFeedback(`Donation of ₹${value} saved successfully.`);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!fullName || !email || !amount) {
      setFeedback("Please provide your name, email, and donation amount.");
      return;
    }

    const response = await fetch("/api/donations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        amount: Number(amount),
        message: message.trim(),
        type: "custom",
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      setFeedback(data.error || "Unable to save donation.");
      return;
    }

    setFeedback("Custom donation saved successfully.");
    setFullName("");
    setEmail("");
    setAmount("");
    setMessage("");
  };

  return (
    <div className="donate-page">

      {/* HERO SECTION */}
      <section className="donate-hero">
        <h1>Support VisionCare Charity</h1>
        <p>
          Your donation helps provide free eye surgeries,
          treatments, and eye camps for people in need.
        </p>
      </section>

      {/* DONATION CARDS */}
      <section className="donation-cards">

        <div className="card">
          <h2>₹200</h2>
          <p>Basic Eye Checkup</p>
          <button type="button" onClick={() => handleQuickDonate(200)}>
            Donate
          </button>
        </div>

        <div className="card">
          <h2>₹1000</h2>
          <p>Provide Free Medicines</p>
          <button type="button" onClick={() => handleQuickDonate(1000)}>
            Donate
          </button>
        </div>

        <div className="card">
          <h2>₹3000</h2>
          <p>Sponsor Cataract Surgery</p>
          <button type="button" onClick={() => handleQuickDonate(3000)}>
            Donate
          </button>
        </div>

      </section>

      {/* CUSTOM DONATION FORM */}
      <section className="donate-form-section">

        <form className="donate-form" onSubmit={handleSubmit}>

          <h2>Make a Custom Donation</h2>

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
            type="number"
            placeholder="Donation Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <textarea
            placeholder="Message (Optional)"
            rows="4"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>

          <button className="donate-btn" type="submit">
            Donate Now
          </button>

          {feedback && <div className="donation-feedback">{feedback}</div>}

        </form>

      </section>

    </div>
  );
}

export default Donate;
