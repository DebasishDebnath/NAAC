import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const Signup = () => {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signup({ ...form, role: "user" });
      alert("Signup successful. Please login.");
    } catch (err) {
      alert("Signup failed.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>User Signup</h2>
      <Input placeholder="Name" type="text" onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <Input placeholder="Email" type="email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <Input placeholder="Password" type="password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <Button type="submit" className="bg-blue-600">Signup</Button>
    </form>
  );
};

export default Signup;
