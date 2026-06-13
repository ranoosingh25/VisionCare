import express from "express";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import cors from "cors";

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

const initDb = async () => {
  const db = await open({
    filename: "./data.sqlite",
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      fullName TEXT,
      email TEXT UNIQUE,
      password TEXT,
      createdAt TEXT
    );

    CREATE TABLE IF NOT EXISTS appointments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      fullName TEXT,
      email TEXT,
      phone TEXT,
      service TEXT,
      doctor TEXT,
      date TEXT,
      time TEXT,
      message TEXT,
      submittedAt TEXT
    );

    CREATE TABLE IF NOT EXISTS donations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      fullName TEXT,
      email TEXT,
      amount REAL,
      message TEXT,
      type TEXT,
      donatedAt TEXT
    );

    CREATE TABLE IF NOT EXISTS contact_messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      fullName TEXT,
      email TEXT,
      phone TEXT,
      message TEXT,
      submittedAt TEXT
    );

    CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      description TEXT,
      date TEXT,
      location TEXT,
      image TEXT,
      buttonType TEXT,
      createdAt TEXT
    );

    CREATE TABLE IF NOT EXISTS event_registrations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      eventId INTEGER,
      fullName TEXT,
      email TEXT,
      phone TEXT,
      action TEXT,
      registeredAt TEXT,
      FOREIGN KEY(eventId) REFERENCES events(id)
    );
  `);

  const eventsCount = await db.get("SELECT COUNT(*) AS count FROM events");
  if (eventsCount.count === 0) {
    await db.run(
      `INSERT INTO events (title, description, date, location, image, buttonType, createdAt)
       VALUES
         (?, ?, ?, ?, ?, ?, ?),
         (?, ?, ?, ?, ?, ?, ?),
         (?, ?, ?, ?, ?, ?, ?)`,
      "Free Eye Checkup Camp",
      "Free checkups, vision testing, and consultations for underprivileged communities.",
      "20 June 2026",
      "Nagpur",
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d",
      "register",
      new Date().toISOString(),
      "Vision Awareness Program",
      "Awareness campaign about eye health, preventive care, and modern treatments.",
      "5 July 2026",
      "Mumbai",
      "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb",
      "join",
      new Date().toISOString(),
      "Charity Fundraiser",
      "Fundraising event to sponsor free cataract surgeries for needy patients.",
      "18 August 2026",
      "Delhi",
      "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b",
      "donate",
      new Date().toISOString()
    );
  }

  return db;
};

const dbPromise = initDb();

app.post("/api/auth/register", async (req, res) => {
  const db = await dbPromise;
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({ error: "Missing registration fields." });
  }

  try {
    const createdAt = new Date().toISOString();
    const result = await db.run(
      "INSERT INTO users (fullName, email, password, createdAt) VALUES (?, ?, ?, ?)",
      fullName.trim(),
      email.trim().toLowerCase(),
      password,
      createdAt
    );
    const user = { id: result.lastID, fullName, email: email.trim().toLowerCase(), createdAt };
    return res.json({ user });
  } catch (error) {
    if (error.message.includes("UNIQUE")) {
      return res.status(409).json({ error: "User already exists." });
    }
    return res.status(500).json({ error: "Registration failed." });
  }
});

app.post("/api/auth/login", async (req, res) => {
  const db = await dbPromise;
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Missing login fields." });
  }

  const user = await db.get("SELECT * FROM users WHERE email = ?", email.trim().toLowerCase());
  if (!user || user.password !== password) {
    return res.status(401).json({ error: "Invalid credentials." });
  }

  return res.json({ user: { id: user.id, fullName: user.fullName, email: user.email, createdAt: user.createdAt } });
});

app.get("/api/users", async (req, res) => {
  const db = await dbPromise;
  const users = await db.all("SELECT id, fullName, email, createdAt FROM users ORDER BY id DESC");
  res.json({ users });
});

app.post("/api/appointments", async (req, res) => {
  const db = await dbPromise;
  const { fullName, email, phone, service, doctor, date, time, message } = req.body;
  if (!fullName || !email || !phone || !service || !doctor || !date || !time) {
    return res.status(400).json({ error: "Please fill in all required fields." });
  }

  const submittedAt = new Date().toISOString();
  const result = await db.run(
    `INSERT INTO appointments (fullName, email, phone, service, doctor, date, time, message, submittedAt)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    fullName.trim(),
    email.trim().toLowerCase(),
    phone.trim(),
    service,
    doctor,
    date,
    time,
    message || "",
    submittedAt
  );

  res.json({ appointment: { id: result.lastID, fullName, email, phone, service, doctor, date, time, message, submittedAt } });
});

app.get("/api/appointments", async (req, res) => {
  const db = await dbPromise;
  const appointments = await db.all("SELECT * FROM appointments ORDER BY id DESC");
  res.json({ appointments });
});

app.post("/api/donations", async (req, res) => {
  const db = await dbPromise;
  const { fullName, email, amount, message, type } = req.body;
  if (!fullName || !email || !amount) {
    return res.status(400).json({ error: "Please provide name, email, and donation amount." });
  }
  const donatedAt = new Date().toISOString();
  const result = await db.run(
    `INSERT INTO donations (fullName, email, amount, message, type, donatedAt)
     VALUES (?, ?, ?, ?, ?, ?)`,
    fullName.trim(),
    email.trim().toLowerCase(),
    amount,
    message || "",
    type || "custom",
    donatedAt
  );

  res.json({ donation: { id: result.lastID, fullName, email, amount, message, type, donatedAt } });
});

app.get("/api/donations", async (req, res) => {
  const db = await dbPromise;
  const donations = await db.all("SELECT * FROM donations ORDER BY id DESC");
  res.json({ donations });
});

app.post("/api/messages", async (req, res) => {
  const db = await dbPromise;
  const { fullName, email, phone, message } = req.body;
  if (!fullName || !email || !phone || !message) {
    return res.status(400).json({ error: "Please complete all fields." });
  }
  const submittedAt = new Date().toISOString();
  const result = await db.run(
    `INSERT INTO contact_messages (fullName, email, phone, message, submittedAt)
     VALUES (?, ?, ?, ?, ?)`,
    fullName.trim(),
    email.trim().toLowerCase(),
    phone.trim(),
    message.trim(),
    submittedAt
  );

  res.json({ message: { id: result.lastID, fullName, email, phone, message, submittedAt } });
});

app.get("/api/messages", async (req, res) => {
  const db = await dbPromise;
  const messages = await db.all("SELECT * FROM contact_messages ORDER BY id DESC");
  res.json({ messages });
});

app.delete("/api/users/:id", async (req, res) => {
  const db = await dbPromise;
  const id = Number(req.params.id);
  await db.run("DELETE FROM users WHERE id = ?", id);
  res.json({ success: true });
});

app.delete("/api/appointments/:id", async (req, res) => {
  const db = await dbPromise;
  const id = Number(req.params.id);
  await db.run("DELETE FROM appointments WHERE id = ?", id);
  res.json({ success: true });
});

app.delete("/api/donations/:id", async (req, res) => {
  const db = await dbPromise;
  const id = Number(req.params.id);
  await db.run("DELETE FROM donations WHERE id = ?", id);
  res.json({ success: true });
});

app.delete("/api/messages/:id", async (req, res) => {
  const db = await dbPromise;
  const id = Number(req.params.id);
  await db.run("DELETE FROM contact_messages WHERE id = ?", id);
  res.json({ success: true });
});

app.get("/api/events", async (req, res) => {
  const db = await dbPromise;
  const events = await db.all("SELECT * FROM events ORDER BY id ASC");
  res.json({ events });
});

app.post("/api/events", async (req, res) => {
  const db = await dbPromise;
  const { title, description, date, location, image, buttonType } = req.body;
  if (!title || !description || !date || !location || !buttonType) {
    return res.status(400).json({ error: "Please fill in all event fields." });
  }
  const createdAt = new Date().toISOString();
  const result = await db.run(
    `INSERT INTO events (title, description, date, location, image, buttonType, createdAt)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    title.trim(),
    description.trim(),
    date,
    location.trim(),
    image || "",
    buttonType,
    createdAt
  );
  const event = { id: result.lastID, title, description, date, location, image: image || "", buttonType, createdAt };
  res.json({ event });
});

app.put("/api/events/:id", async (req, res) => {
  const db = await dbPromise;
  const id = Number(req.params.id);
  const { title, description, date, location, image, buttonType } = req.body;
  if (!title || !description || !date || !location || !buttonType) {
    return res.status(400).json({ error: "Please fill in all event fields." });
  }
  await db.run(
    `UPDATE events SET title = ?, description = ?, date = ?, location = ?, image = ?, buttonType = ? WHERE id = ?`,
    title.trim(),
    description.trim(),
    date,
    location.trim(),
    image || "",
    buttonType,
    id
  );
  const event = await db.get("SELECT * FROM events WHERE id = ?", id);
  res.json({ event });
});

app.delete("/api/events/:id", async (req, res) => {
  const db = await dbPromise;
  const id = Number(req.params.id);
  await db.run("DELETE FROM events WHERE id = ?", id);
  res.json({ success: true });
});

app.post("/api/event-registrations", async (req, res) => {
  const db = await dbPromise;
  const { eventId, fullName, email, phone, action } = req.body;
  if (!eventId || !fullName || !email || !phone || !action) {
    return res.status(400).json({ error: "Please complete all registration fields." });
  }
  const registeredAt = new Date().toISOString();
  const result = await db.run(
    `INSERT INTO event_registrations (eventId, fullName, email, phone, action, registeredAt)
     VALUES (?, ?, ?, ?, ?, ?)`,
    eventId,
    fullName.trim(),
    email.trim().toLowerCase(),
    phone.trim(),
    action,
    registeredAt
  );
  res.json({ registration: { id: result.lastID, eventId, fullName, email, phone, action, registeredAt } });
});

app.get("/api/event-registrations", async (req, res) => {
  const db = await dbPromise;
  const registrations = await db.all(`
    SELECT r.id, r.eventId, e.title AS eventTitle, r.fullName, r.email, r.phone, r.action, r.registeredAt
    FROM event_registrations r
    LEFT JOIN events e ON r.eventId = e.id
    ORDER BY r.id DESC
  `);
  res.json({ registrations });
});

app.listen(PORT, () => {
  console.log(`Backend API listening on http://localhost:${PORT}`);
});
