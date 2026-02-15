import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Account created successfully");
      navigate("/login");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-sm p-6 border rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-4 text-center">Create Account</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full border p-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border p-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button type="submit" className="w-full bg-black text-white py-2 rounded">
            Register
          </button>

          <p className="text-sm text-center mt-2">
            Already have an account?{" "}
            <Link to="/login" className="underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
