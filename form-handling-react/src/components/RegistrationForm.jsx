import { useState } from "react";

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!formData.username || !formData.email || !formData.password) {
      setError("All fields are required!");
      return;
    }

    try {
      // Simulate API call
      const res = await fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      alert(`User registered: ${data.username}`);
    } catch  {
      setError("Something went wrong!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg">
      <h2 className="text-xl font-bold">Controlled Registration Form</h2>

      {error && <p className="text-red-500">{error}</p>}

      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
        className="border p-2 w-full"
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="border p-2 w-full"
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="border p-2 w-full"
      />

      <button type="submit" className="bg-blue-600 text-white p-2 rounded">
        Register
      </button>
    </form>
  );
}
