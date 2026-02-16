import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";
import { useNavigate, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";

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
    <Layout>
      <section className="min-h-[70vh] flex items-center justify-center px-6">
        <div className="w-full max-w-sm">
          <h1 className="text-display-l text-foreground mb-12 text-center">
            Create Account
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-label text-muted-foreground mb-2 block">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border-b border-border py-3 text-body text-foreground focus:outline-none focus:border-foreground transition-colors duration-300"
              />
            </div>
            <div>
              <label className="text-label text-muted-foreground mb-2 block">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border-b border-border py-3 text-body text-foreground focus:outline-none focus:border-foreground transition-colors duration-300"
              />
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <button
              type="submit"
              className="w-full py-4 bg-foreground text-primary-foreground text-label tracking-[0.3em] transition-all duration-500 hover:opacity-90"
            >
              Register
            </button>
          </form>

          <p className="text-center mt-8">
            <Link
              to="/login"
              className="text-label text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              Already have an account? Sign In
            </Link>
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default Register;
