import { useState } from "react";

const RegistrationForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    let validationErrors = {};

    if (!username) {
      validationErrors.username = "Username is required";
    }
    if (!email) {
      validationErrors.email = "Email is required";
    }
    if (!password) {
      validationErrors.password = "Password is required";
    }

    setErrors(validationErrors);

    // stop submission if errors exist
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    console.log("Form submitted:", { username, email, password });
    // You can replace console.log with an API call
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded w-80 mx-auto mt-6">
      <h2 className="text-xl font-bold mb-4">User Registration</h2>

      <div className="mb-3">
        <label className="block mb-1">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border px-2 py-1 w-full"
        />
        {errors.username && <p className="text-red-500">{errors.username}</p>}
      </div>

      <div className="mb-3">
        <label className="block mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border px-2 py-1 w-full"
        />
        {errors.email && <p className="text-red-500">{errors.email}</p>}
      </div>

      <div className="mb-3">
        <label className="block mb-1">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border px-2 py-1 w-full"
        />
        {errors.password && <p className="text-red-500">{errors.password}</p>}
      </div>

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Register
      </button>
    </form>
  );
};

export default RegistrationForm;
