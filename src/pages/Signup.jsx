import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebaseConfig.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { LuEye } from "react-icons/lu";
import { PiEyeClosedThin } from "react-icons/pi";
import { getErrorMessage } from "../firebaseUtil.js";

const signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((password) => !password);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((password) => !password);
  };

  const signUpUser = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (password !== confirmPassword) {
      setErrorMessage("Passwords don't match");
      setIsLoading(false);
      return;
    }

    try {
      const userDetails = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password.trim()
      );

      const user = userDetails.user;

      // Save additional user info in Firestore
      await setDoc(doc(db, "users", user.uid), {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
      });

      console.log("User signed up and data saved in Firestore");
      navigate("/home");
    } catch (error) {
      const customErrorMessage = getErrorMessage(error.code);
      setErrorMessage(customErrorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={signUpUser}>
      <div>
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          required
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          required
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <div className="password-container">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            autoComplete="new-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="password-eye" onClick={togglePasswordVisibility}>
            {showPassword ? <LuEye /> : <PiEyeClosedThin />}
          </span>
        </div>
      </div>

      <div>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <div className="password-container">
          <input
            type={showConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            name="confirmPassword"
            autoComplete="new-password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <span
            className="password-eye"
            onClick={toggleConfirmPasswordVisibility}
          >
            {showConfirmPassword ? <LuEye /> : <PiEyeClosedThin />}
          </span>
        </div>
      </div>

      <button type="submit" className="button-cta">
        {isLoading ? <span className="spinner"></span> : "Sign Up"}
      </button>

      <div className="have-account">
        <p>
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
        {errorMessage && (
          <p style={{ color: "red", fontWeight: "bold" }}>{errorMessage}</p>
        )}
      </div>
    </form>
  );
};

export default signup;
