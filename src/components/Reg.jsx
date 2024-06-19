import { useState } from "react";
import axios from "axios";

const Reg = () => {
  const [name, setName] = useState({ firstname: "", lastname: "" });
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleNameChange = (e) => {
    const { name, value } = e.target;
    setName((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fullName = `${name.firstname} ${name.lastname}`;
    const payload = { fullName, username, password, email };

    try {
      const response = await axios.post(
        "https://scentreel-be.onrender.com/api/v1/auth/register",
        payload,
        { headers: { "Content-Type": "application/json" } }
      );
      setMessage("Registration Successful");
    } catch (error) {
      if (error.response) {
        setMessage(`Registration Failed: ${error.response.data.message}`);
      } else if (error.request) {
        setMessage("Registration Failed: No response from server");
      } else {
        setMessage(`Registration Failed: ${error.message}`);
      }
    }
  };

  return (
    <div className="text-white">
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name</label>
          <input
            type="text"
            name="firstname"
            value={name.firstname}
            onChange={handleNameChange}
          />
        </div>
        <div>
          <label>Last Name</label>
          <input
            type="text"
            name="lastname"
            value={name.lastname}
            onChange={handleNameChange}
          />
        </div>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Register</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default Reg;
