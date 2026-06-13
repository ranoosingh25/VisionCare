from datetime import datetime
from pathlib import Path
import sqlite3

from flask import Flask, jsonify, request
from flask_cors import CORS

BASE_DIR = Path(__file__).resolve().parent
DB_PATH = BASE_DIR / "data.sqlite"

app = Flask(__name__)
CORS(app)


def get_db_connection():
    conn = sqlite3.connect(DB_PATH, check_same_thread=False)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    db = get_db_connection()
    db.executescript(
        """
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

        CREATE TABLE IF NOT EXISTS doctors (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          fullName TEXT,
          specialty TEXT,
          bio TEXT,
          image TEXT,
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
        """
    )

    # seed events if empty
    event_count = db.execute("SELECT COUNT(*) AS count FROM events").fetchone()["count"]
    if event_count == 0:
        db.executemany(
            """
            INSERT INTO events (title, description, date, location, image, buttonType, createdAt)
            VALUES (?, ?, ?, ?, ?, ?, ?)
            """,
            [
                (
                    "Free Eye Checkup Camp",
                    "Free checkups, vision testing, and consultations for underprivileged communities.",
                    "20 June 2026",
                    "Nagpur",
                    "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d",
                    "register",
                    datetime.utcnow().isoformat(),
                ),
                (
                    "Vision Awareness Program",
                    "Awareness campaign about eye health, preventive care, and modern treatments.",
                    "5 July 2026",
                    "Mumbai",
                    "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb",
                    "join",
                    datetime.utcnow().isoformat(),
                ),
                (
                    "Charity Fundraiser",
                    "Fundraising event to sponsor free cataract surgeries for needy patients.",
                    "18 August 2026",
                    "Delhi",
                    "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b",
                    "donate",
                    datetime.utcnow().isoformat(),
                ),
            ],
        )

    # seed default doctors if empty
    doctor_count = db.execute("SELECT COUNT(*) AS count FROM doctors").fetchone()["count"]
    if doctor_count == 0:
        db.executemany(
            """
            INSERT INTO doctors (fullName, specialty, bio, image, createdAt)
            VALUES (?, ?, ?, ?, ?)
            """,
            [
                (
                    "Dr. Raj Sharma",
                    "Cataract Specialist",
                    "12+ years of experience in cataract and vision correction surgeries.",
                    "https://randomuser.me/api/portraits/men/32.jpg",
                    datetime.utcnow().isoformat(),
                ),
                (
                    "Dr. Priya Mehta",
                    "LASIK Expert",
                    "Expert in modern LASIK treatments and laser eye surgeries.",
                    "https://randomuser.me/api/portraits/women/44.jpg",
                    datetime.utcnow().isoformat(),
                ),
                (
                    "Dr. Ahmed Khan",
                    "Retina Specialist",
                    "Specialized in retina diseases and advanced retina surgeries.",
                    "https://randomuser.me/api/portraits/men/75.jpg",
                    datetime.utcnow().isoformat(),
                ),
                (
                    "Dr. Suresh Patel",
                    "Glaucoma Specialist",
                    "Experienced glaucoma specialist focusing on minimally invasive treatments.",
                    "https://randomuser.me/api/portraits/men/12.jpg",
                    datetime.utcnow().isoformat(),
                ),
                (
                    "Dr. Kavita Rao",
                    "Oculoplastic Surgeon",
                    "Specialist in oculoplastic and reconstructive eyelid surgery.",
                    "https://randomuser.me/api/portraits/women/30.jpg",
                    datetime.utcnow().isoformat(),
                ),
                (
                    "Dr. Neha Verma",
                    "Pediatric Ophthalmologist",
                    "Child eye care specialist with expertise in pediatric treatments.",
                    "https://randomuser.me/api/portraits/women/68.jpg",
                    datetime.utcnow().isoformat(),
                ),
            ],
        )

    db.commit()
    db.close()


def row_to_dict(row):
    return dict(row) if row else None


def rows_to_list(rows):
    return [dict(row) for row in rows]


def validate_fields(data, required_fields):
    return all(data.get(field) for field in required_fields)


@app.route("/api/auth/register", methods=["POST"])
def register():
    data = request.get_json() or {}
    if not validate_fields(data, ["fullName", "email", "password"]):
        return jsonify({"error": "Missing registration fields."}), 400

    db = get_db_connection()
    try:
        created_at = datetime.utcnow().isoformat()
        cursor = db.execute(
            "INSERT INTO users (fullName, email, password, createdAt) VALUES (?, ?, ?, ?)",
            (data["fullName"].strip(), data["email"].strip().lower(), data["password"], created_at),
        )
        db.commit()
        user = {
            "id": cursor.lastrowid,
            "fullName": data["fullName"].strip(),
            "email": data["email"].strip().lower(),
            "createdAt": created_at,
        }
        return jsonify({"user": user})
    except sqlite3.IntegrityError:
        return jsonify({"error": "User already exists."}), 409
    finally:
        db.close()


@app.route("/api/auth/login", methods=["POST"])
def login():
    data = request.get_json() or {}
    if not validate_fields(data, ["email", "password"]):
        return jsonify({"error": "Missing login fields."}), 400

    db = get_db_connection()
    user = db.execute("SELECT * FROM users WHERE email = ?", (data["email"].strip().lower(),)).fetchone()
    db.close()

    if not user or user["password"] != data["password"]:
        return jsonify({"error": "Invalid credentials."}), 401

    return jsonify({
        "user": {
            "id": user["id"],
            "fullName": user["fullName"],
            "email": user["email"],
            "createdAt": user["createdAt"],
        }
    })


@app.route("/api/users", methods=["GET"])
def get_users():
    db = get_db_connection()
    users = db.execute("SELECT id, fullName, email, createdAt FROM users ORDER BY id DESC").fetchall()
    db.close()
    return jsonify({"users": rows_to_list(users)})


@app.route("/api/appointments", methods=["POST"])
def create_appointment():
    data = request.get_json() or {}
    required = ["fullName", "email", "phone", "service", "doctor", "date", "time"]
    if not validate_fields(data, required):
        return jsonify({"error": "Please fill in all required fields."}), 400

    submitted_at = datetime.utcnow().isoformat()
    db = get_db_connection()
    # if doctor was passed as an id, resolve to full name
    doctor_value = data["doctor"]
    doctor_name = None
    try:
        doc_id = int(doctor_value)
    except Exception:
        doc_id = None
    if doc_id is not None:
        doc_row = db.execute("SELECT fullName FROM doctors WHERE id = ?", (doc_id,)).fetchone()
        if doc_row:
            doctor_name = doc_row["fullName"]
    if not doctor_name:
        doctor_name = str(doctor_value)

    cursor = db.execute(
        """
        INSERT INTO appointments (fullName, email, phone, service, doctor, date, time, message, submittedAt)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (
            data["fullName"].strip(),
            data["email"].strip().lower(),
            data["phone"].strip(),
            data["service"],
            doctor_name,
            data["date"],
            data["time"],
            data.get("message", ""),
            submitted_at,
        ),
    )
    db.commit()
    appointment = {
        "id": cursor.lastrowid,
        "fullName": data["fullName"].strip(),
        "email": data["email"].strip().lower(),
        "phone": data["phone"].strip(),
        "service": data["service"],
        "doctor": data["doctor"],
        "date": data["date"],
        "time": data["time"],
        "message": data.get("message", ""),
        "submittedAt": submitted_at,
    }
    db.close()
    return jsonify({"appointment": appointment})


@app.route("/api/appointments", methods=["GET"])
def list_appointments():
    db = get_db_connection()
    appointments = db.execute("SELECT * FROM appointments ORDER BY id DESC").fetchall()
    db.close()
    return jsonify({"appointments": rows_to_list(appointments)})


@app.route("/api/donations", methods=["POST"])
def create_donation():
    data = request.get_json() or {}
    required = ["fullName", "email", "amount"]
    if not validate_fields(data, required):
        return jsonify({"error": "Please provide name, email, and donation amount."}), 400

    donated_at = datetime.utcnow().isoformat()
    db = get_db_connection()
    cursor = db.execute(
        """
        INSERT INTO donations (fullName, email, amount, message, type, donatedAt)
        VALUES (?, ?, ?, ?, ?, ?)
        """,
        (
            data["fullName"].strip(),
            data["email"].strip().lower(),
            data["amount"],
            data.get("message", ""),
            data.get("type", "custom"),
            donated_at,
        ),
    )

    db.commit()
    donation = {
        "id": cursor.lastrowid,
        "fullName": data["fullName"].strip(),
        "email": data["email"].strip().lower(),
        "amount": data["amount"],
        "message": data.get("message", ""),
        "type": data.get("type", "custom"),
        "donatedAt": donated_at,
    }
    db.close()
    return jsonify({"donation": donation})


@app.route("/api/donations", methods=["GET"])
def list_donations():
    db = get_db_connection()
    donations = db.execute("SELECT * FROM donations ORDER BY id DESC").fetchall()
    db.close()
    return jsonify({"donations": rows_to_list(donations)})


@app.route("/api/messages", methods=["POST"])
def create_message():
    data = request.get_json() or {}
    required = ["fullName", "email", "phone", "message"]
    if not validate_fields(data, required):
        return jsonify({"error": "Please complete all fields."}), 400

    submitted_at = datetime.utcnow().isoformat()
    db = get_db_connection()
    cursor = db.execute(
        """
        INSERT INTO contact_messages (fullName, email, phone, message, submittedAt)
        VALUES (?, ?, ?, ?, ?)
        """,
        (
            data["fullName"].strip(),
            data["email"].strip().lower(),
            data["phone"].strip(),
            data["message"].strip(),
            submitted_at,
        ),
    )
    db.commit()
    message = {
        "id": cursor.lastrowid,
        "fullName": data["fullName"].strip(),
        "email": data["email"].strip().lower(),
        "phone": data["phone"].strip(),
        "message": data["message"].strip(),
        "submittedAt": submitted_at,
    }
    db.close()
    return jsonify({"message": message})


@app.route("/api/messages", methods=["GET"])
def list_messages():
    db = get_db_connection()
    messages = db.execute("SELECT * FROM contact_messages ORDER BY id DESC").fetchall()
    db.close()
    return jsonify({"messages": rows_to_list(messages)})


@app.route("/api/users/<int:user_id>", methods=["DELETE"])
def delete_user(user_id):
    db = get_db_connection()
    db.execute("DELETE FROM users WHERE id = ?", (user_id,))
    db.commit()
    db.close()
    return jsonify({"success": True})


@app.route("/api/appointments/<int:appointment_id>", methods=["DELETE"])
def delete_appointment(appointment_id):
    db = get_db_connection()
    db.execute("DELETE FROM appointments WHERE id = ?", (appointment_id,))
    db.commit()
    db.close()
    return jsonify({"success": True})


@app.route("/api/donations/<int:donation_id>", methods=["DELETE"])
def delete_donation(donation_id):
    db = get_db_connection()
    db.execute("DELETE FROM donations WHERE id = ?", (donation_id,))
    db.commit()
    db.close()
    return jsonify({"success": True})


@app.route("/api/messages/<int:message_id>", methods=["DELETE"])
def delete_message(message_id):
    db = get_db_connection()
    db.execute("DELETE FROM contact_messages WHERE id = ?", (message_id,))
    db.commit()
    db.close()
    return jsonify({"success": True})


@app.route("/api/events", methods=["GET"])
def list_events():
    db = get_db_connection()
    events = db.execute("SELECT * FROM events ORDER BY id ASC").fetchall()
    db.close()
    return jsonify({"events": rows_to_list(events)})


@app.route("/api/events", methods=["POST"])
def create_event():
    data = request.get_json() or {}
    required = ["title", "description", "date", "location", "buttonType"]
    if not validate_fields(data, required):
        return jsonify({"error": "Please fill in all event fields."}), 400

    created_at = datetime.utcnow().isoformat()
    db = get_db_connection()
    cursor = db.execute(
        """
        INSERT INTO events (title, description, date, location, image, buttonType, createdAt)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        """,
        (
            data["title"].strip(),
            data["description"].strip(),
            data["date"],
            data["location"].strip(),
            data.get("image", ""),
            data["buttonType"],
            created_at,
        ),
    )
    db.commit()
    event = {
        "id": cursor.lastrowid,
        "title": data["title"].strip(),
        "description": data["description"].strip(),
        "date": data["date"],
        "location": data["location"].strip(),
        "image": data.get("image", ""),
        "buttonType": data["buttonType"],
        "createdAt": created_at,
    }
    db.close()
    return jsonify({"event": event})


@app.route("/api/events/<int:event_id>", methods=["PUT"])
def update_event(event_id):
    data = request.get_json() or {}
    required = ["title", "description", "date", "location", "buttonType"]
    if not validate_fields(data, required):
        return jsonify({"error": "Please fill in all event fields."}), 400

    db = get_db_connection()
    db.execute(
        """
        UPDATE events SET title = ?, description = ?, date = ?, location = ?, image = ?, buttonType = ? WHERE id = ?
        """,
        (
            data["title"].strip(),
            data["description"].strip(),
            data["date"],
            data["location"].strip(),
            data.get("image", ""),
            data["buttonType"],
            event_id,
        ),
    )
    db.commit()
    db.close()
    return jsonify({"success": True})


@app.route("/api/events/<int:event_id>", methods=["DELETE"])
def delete_event(event_id):
    db = get_db_connection()
    db.execute("DELETE FROM events WHERE id = ?", (event_id,))
    db.commit()
    db.close()
    return jsonify({"success": True})


@app.route("/api/events/<int:event_id>/register", methods=["POST"])
def register_for_event(event_id):
    data = request.get_json() or {}
    required = ["fullName", "email", "phone", "action"]
    if not validate_fields(data, required):
        return jsonify({"error": "Please provide registration details."}), 400

    registered_at = datetime.utcnow().isoformat()
    db = get_db_connection()
    cursor = db.execute(
        """
        INSERT INTO event_registrations (eventId, fullName, email, phone, action, registeredAt)
        VALUES (?, ?, ?, ?, ?, ?)
        """,
        (
            event_id,
            data["fullName"].strip(),
            data["email"].strip().lower(),
            data["phone"].strip(),
            data["action"],
            registered_at,
        ),
    )
    db.commit()
    registration = {
        "id": cursor.lastrowid,
        "eventId": event_id,
        "fullName": data["fullName"].strip(),
        "email": data["email"].strip().lower(),
        "phone": data["phone"].strip(),
        "action": data["action"],
        "registeredAt": registered_at,
    }
    db.close()
    return jsonify({"registration": registration})


@app.route("/api/event-registrations", methods=["POST"])
def create_event_registration():
    data = request.get_json() or {}
    required = ["eventId", "fullName", "email", "phone", "action"]
    if not validate_fields(data, required):
        return jsonify({"error": "Please provide registration details."}), 400

    registered_at = datetime.utcnow().isoformat()
    db = get_db_connection()
    cursor = db.execute(
        """
        INSERT INTO event_registrations (eventId, fullName, email, phone, action, registeredAt)
        VALUES (?, ?, ?, ?, ?, ?)
        """,
        (
            data["eventId"],
            data["fullName"].strip(),
            data["email"].strip().lower(),
            data["phone"].strip(),
            data["action"],
            registered_at,
        ),
    )
    db.commit()
    registration = {
        "id": cursor.lastrowid,
        "eventId": data["eventId"],
        "fullName": data["fullName"].strip(),
        "email": data["email"].strip().lower(),
        "phone": data["phone"].strip(),
        "action": data["action"],
        "registeredAt": registered_at,
    }
    db.close()
    return jsonify({"registration": registration})


@app.route("/api/event-registrations", methods=["GET"])
def list_event_registrations():
    db = get_db_connection()
    rows = db.execute(
        "SELECT er.id, er.eventId, e.title as eventTitle, er.fullName, er.email, er.phone, er.action, er.registeredAt FROM event_registrations er LEFT JOIN events e ON er.eventId = e.id ORDER BY er.id DESC"
    ).fetchall()
    db.close()
    return jsonify({"registrations": rows_to_list(rows)})


@app.route("/api/event-registrations/<int:reg_id>", methods=["DELETE"])
def delete_event_registration(reg_id):
    db = get_db_connection()
    db.execute("DELETE FROM event_registrations WHERE id = ?", (reg_id,))
    db.commit()
    db.close()
    return jsonify({"success": True})


@app.route("/api/doctors", methods=["GET"])
def list_doctors():
    db = get_db_connection()
    doctors = db.execute("SELECT * FROM doctors ORDER BY id ASC").fetchall()
    db.close()
    return jsonify({"doctors": rows_to_list(doctors)})


@app.route("/api/doctors", methods=["POST"])
def create_doctor():
    data = request.get_json() or {}
    required = ["fullName", "specialty"]
    if not validate_fields(data, required):
        return jsonify({"error": "Please provide doctor's name and specialty."}), 400

    created_at = datetime.utcnow().isoformat()
    db = get_db_connection()
    cursor = db.execute(
        "INSERT INTO doctors (fullName, specialty, bio, image, createdAt) VALUES (?, ?, ?, ?, ?)",
        (
            data["fullName"].strip(),
            data["specialty"].strip(),
            data.get("bio", ""),
            data.get("image", ""),
            created_at,
        ),
    )
    db.commit()
    doctor = {
        "id": cursor.lastrowid,
        "fullName": data["fullName"].strip(),
        "specialty": data["specialty"].strip(),
        "bio": data.get("bio", ""),
        "image": data.get("image", ""),
        "createdAt": created_at,
    }
    db.close()
    return jsonify({"doctor": doctor})


@app.route("/api/doctors/<int:doctor_id>", methods=["DELETE"])
def delete_doctor(doctor_id):
    db = get_db_connection()
    db.execute("DELETE FROM doctors WHERE id = ?", (doctor_id,))
    db.commit()
    db.close()
    return jsonify({"success": True})


@app.route("/api/doctors/<int:doctor_id>", methods=["PUT"])
def update_doctor(doctor_id):
    data = request.get_json() or {}
    required = ["fullName", "specialty"]
    if not validate_fields(data, required):
        return jsonify({"error": "Please provide doctor's name and specialty."}), 400

    db = get_db_connection()
    db.execute(
        "UPDATE doctors SET fullName = ?, specialty = ?, bio = ?, image = ? WHERE id = ?",
        (
            data["fullName"].strip(),
            data["specialty"].strip(),
            data.get("bio", ""),
            data.get("image", ""),
            doctor_id,
        ),
    )
    db.commit()
    doc = db.execute("SELECT * FROM doctors WHERE id = ?", (doctor_id,)).fetchone()
    db.close()
    return jsonify({"doctor": row_to_dict(doc)})

    @app.route("/")
def home():
    return {
        "status": "success",
        "message": "VisionCare Backend Running Successfully"
    }


if __name__ == "__main__":
    # initialize DB and start server
    init_db()
    # print registered routes for debugging
    print("Registered routes:")
    for rule in app.url_map.iter_rules():
        print(rule)
    app.run(host="0.0.0.0", port=4000, debug=False)


# Temporary debug route to list registered routes (remove in production)
@app.route("/__routes", methods=["GET"])
def list_routes():
    routes = []
    for rule in app.url_map.iter_rules():
        routes.append({"rule": str(rule), "endpoint": rule.endpoint, "methods": list(rule.methods)})
    return jsonify({"routes": routes})
 