import { useState } from "react";
import { loginUser } from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const data = await loginUser(
        email,
        password
      );

      console.log(
        "LOGIN RESPONSE:",
        data
      );

      localStorage.setItem(
        "token",
        data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify({
          id: data.id,
          name: data.name,
          email: data.email,
          role:data.role
        })
      );

      setMessage(
        "✅ Login successful"
      );

      setMessageType(
        "success"
      );

     setTimeout(() => {

       if (data.role === "ADMIN") {

         navigate("/admin/dashboard");

       } else {

         navigate("/home");

       }

     }, 1000);

    } catch (error) {

      console.error(error);

      setMessage(
        "❌ Invalid email or password"
      );

      setMessageType(
        "error"
      );

      setTimeout(() => {

        setMessage("");

      }, 3000);
    }
  };

  return (

    <div className="page-container">


      <form
        className="card"
        onSubmit={handleSubmit}
      >

        <h2>Login</h2>
        {message && (
            <div
              className={
                messageType === "success"
                  ? "success-message"
                  : "error-message"
              }
            >
              {message}
            </div>
          )}
        <input
          type="email"
          placeholder="Enter your email"
          className="input-field"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Enter your password"
          className="input-field"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          type="submit"
          className="btn-primary"
        >
          Login
        </button>

        <p>
          Don't have an account?{" "}
          <a href="/register">
            Register
          </a>
        </p>

      </form>

    </div>

  );
}

export default Login;