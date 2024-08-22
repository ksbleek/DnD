import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { userLogIn } from "../utilities";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useOutletContext();

  return (
    <div className="form-container">
      <h2>Log In</h2>
      <form
        className="user_form"
        onSubmit={async (e) => [
          e.preventDefault(),
          setUser(await userLogIn(email, password)),
        ]}
      >
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
        <button type="submit">Log in</button>
      </form>
    </div>
  );
};

export default LogIn;
