import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { userRegistration } from "../utilities";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useOutletContext();

  return (
    <div>
      <h2>Sign Up</h2>
      <form
        onSubmit={async (e) => [
          e.preventDefault(),
          setUser(await userRegistration(email, password)),
        ]}
      >
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
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
