import { useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { userRegistration } from "../utilities";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useOutletContext();
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await userRegistration(email, password);
      setUser(email);
      navigate("/"); // Redirect to the main page
    } catch (error) {
      console.error("Sign up failed:", error);
      alert("Sign up failed. Please try again.");
    }
  };

  return (
    <div className="form-container">
      <h2>Sign Up</h2>
      <form className="user_form" onSubmit={handleSubmit}>
        <div className="user_email">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="user_pass">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
