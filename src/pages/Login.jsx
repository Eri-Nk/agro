import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import { LuEye } from "react-icons/lu";
import { PiEyeClosedThin } from "react-icons/pi";
import { getErrorMessage } from "../firebaseUtil.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.checkbox) {
      setChecked(true);
      setEmail(localStorage.username);
    }
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword((password) => !password);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (checked && email !== "") {
      localStorage.checkbox = checked ? "true" : "false";
      localStorage.username = email;
    } else {
      localStorage.username = "";
      localStorage.checkbox = "";
    }

    try {
      await signInWithEmailAndPassword(auth, email.trim(), password.trim());
      navigate("/home");
    } catch (error) {
      console.error(error.code);
      const customErrorMessage = getErrorMessage(error.code);
      setErrorMessage(customErrorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleLoginSubmit}>
      <div className="email-container">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
        />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <div className="password-container">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
          <span className="password-eye" onClick={togglePasswordVisibility}>
            {showPassword ? <LuEye /> : <PiEyeClosedThin />}
          </span>
        </div>
      </div>

      <div className="remember-me">
        <input
          type="checkbox"
          name="remeberMe"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
        <label htmlFor="rememberMe">Remember Me</label>
      </div>

      <button type="submit" className="button-cta">
        {isLoading ? <span className="spinner"></span> : "Sign In"}
      </button>

      <div className="no-account">
        <p>
          Don't have an account ? <Link to="/signup">Sign up here!</Link>
        </p>

        <p className="forgot-password">
          <Link to="/forgot-password"> Forgot Password ?</Link>
        </p>
        {errorMessage && (
          <p style={{ color: "red", fontWeight: "bold" }}>{errorMessage}</p>
        )}
      </div>
    </form>
  );
};

export default Login;
