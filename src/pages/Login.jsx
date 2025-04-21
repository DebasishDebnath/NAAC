import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginUser } = useAuth();
  const { role = "user" } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await login(email, password);
      const userData = res.data;

      if (userData.role !== role) {
        alert(
          `Unauthorized: You tried to login as ${role}, but your account role is ${userData.role}`
        );
        return;
      }

      loginUser(userData);
      navigate("/dashboard"); // Redirect after login
    } catch (err) {
      console.error("Login failed:", err);
      alert("Invalid credentials");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{role.toUpperCase()} Login</h2>
      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
