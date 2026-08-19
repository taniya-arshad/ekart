import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/api";

export default function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value
        });
    };

    
    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const res = await registerUser(formData);
        alert(res);

        navigate("/login");
    } catch (err) {
        alert(err.message);
    }
    };

  return (
    <div className="page-container">
      <form className="card" onSubmit={handleSubmit}>
        <h2>Register</h2>

        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          className="input-field"
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          className="input-field"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          className="input-field"
          onChange={handleChange}
          required
        />

        <button type="submit" className="btn-primary">
          Register
        </button>

        <p>
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}