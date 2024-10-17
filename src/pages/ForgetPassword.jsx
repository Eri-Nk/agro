import { auth } from "../firebaseConfig.js";
import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { getErrorMessage } from "../firebaseUtil.js";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await sendPasswordResetEmail(auth, email.trim());
      setMessage("Password reset email sent!");
    } catch (error) {
      const customErrorMessage = getErrorMessage(error.code);
      setErrorMessage(customErrorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <form onSubmit={handlePasswordReset}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
        />
        <button type="submit" className="button-cta">
          {isLoading ? <span className="spinner"></span> : "Reset Password"}
        </button>
      </form>
      {message && <p>{message}</p>}
      {errorMessage && (
        <p style={{ color: "red", fontWeight: "bold" }}>{errorMessage}</p>
      )}
    </div>
  );
};

export default ForgotPassword;
