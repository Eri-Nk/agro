import { auth } from "../../firebaseConfig.js";
import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { getErrorMessage } from "../../firebaseUtil.js";
import { Helmet } from "react-helmet-async";
import { useRef } from "react";
import { BsCheckCircle, BsExclamationCircle } from "react-icons/bs";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const timer = useRef();

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await sendPasswordResetEmail(auth, email.trim());
      const msg = "A link for Password reset has been sent to your email!";
      if (timer.current) {
        clearTimeout(timer.current);
      }
      setMessage(msg);
      timer.current = setTimeout(() => setMessage(""), 7000);
    } catch (error) {
      const customErrorMessage = getErrorMessage(error.code);
      if (timer.current) {
        clearTimeout(timer.current);
      }
      setErrorMessage(customErrorMessage);
      timer.current = setTimeout(() => setErrorMessage(""), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <Helmet>
        <title>Forgot Password | Eriko Agro</title>
      </Helmet>
      <form onSubmit={handlePasswordReset}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
        />
        <button type="submit" className="button-cta">
          {isLoading ? <span className="spinner"></span> : "Reset Password"}
        </button>
      </form>
      {message && (
        <p className="message-box message-success">
          {message}
          <span>
            <BsCheckCircle />
          </span>
        </p>
      )}
      {errorMessage && (
        <p className="message-box message-error">
          {errorMessage}
          <span>
            <BsExclamationCircle />
          </span>
        </p>
      )}
    </div>
  );
};

export default ForgotPassword;
