import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getCurrentUser } from "../utils/auth";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(true);
  const from = location.state?.from?.pathname || "/";
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  const storeCurrentUser = (user) => {
    if (rememberMe) {
      localStorage.setItem("visioncareCurrentUser", JSON.stringify(user));
      sessionStorage.removeItem("visioncareCurrentUser");
    } else {
      sessionStorage.setItem("visioncareCurrentUser", JSON.stringify(user));
      localStorage.removeItem("visioncareCurrentUser");
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("mode") === "register") {
      setIsLogin(false);
    }
  }, [location.search]);

  useEffect(() => {
    if (getCurrentUser()) {
      navigate(from, { replace: true });
    }
  }, [from, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    if (!email || !password || (!isLogin && !fullName)) {
      setMessageType("error");
      setMessage("Please complete all required fields.");
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      setMessageType("error");
      setMessage("Passwords do not match.");
      return;
    }

    const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
    const body = isLogin
      ? { email: email.trim().toLowerCase(), password }
      : { fullName: fullName.trim(), email: email.trim().toLowerCase(), password };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await response.json();

      if (!response.ok) {
        setMessageType("error");
        setMessage(data.error || "Unable to complete request.");
        return;
      }

      storeCurrentUser(data.user);
      setMessageType("success");
      setMessage(isLogin ? "Login successful. Redirecting..." : "Account created successfully. Redirecting...");
      setTimeout(() => navigate(from, { replace: true }), 900);
    } catch (error) {
      setMessageType("error");
      setMessage("Server error. Please try again later.");
    }
  };

  const handleToggleMode = () => {
    setIsLogin(!isLogin);
    setMessage("");
    setFullName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="login-page">

      <div className="login-container">

        {/* LEFT SIDE */}
        <div className="login-left">

          <h1>VisionCare Charity</h1>

          <p>
            Providing quality eye care services and
            helping people see a brighter future.
          </p>

          <img
            src="https://cdn-icons-png.flaticon.com/512/2966/2966486.png"
            alt="eye"
          />

        </div>

        {/* RIGHT SIDE */}
        <div className="login-right">

          <h2>
            {isLogin ? "Login Account" : "Create Account"}
          </h2>

          <form onSubmit={handleSubmit}>

            {!isLogin && (
              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            )}

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {!isLogin && (
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            )}

            <label className="login-checkbox">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Remember Me
            </label>

            <button type="submit">
              {isLogin ? "Login" : "Register"}
            </button>

            <button
              type="button"
              className="forgot-link"
              onClick={() => {
                setMessageType("success");
                setMessage("Please contact support@visioncare.org to reset your password.");
              }}
            >
              Forgot Password?
            </button>

          </form>

          {message && (
            <div className={`login-message ${messageType}`}>
              {message}
            </div>
          )}

          <p className="toggle-text">

            {isLogin
              ? "Don't have an account?"
              : "Already have an account?"}

            <span onClick={handleToggleMode}>

              {isLogin ? " Register" : " Login"}

            </span>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;