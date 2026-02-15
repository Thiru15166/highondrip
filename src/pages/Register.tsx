import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    // TODO: Add Firebase auth logic here
    setError("Registration failed. Please try again.");
  };

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-[calc(100vh-8rem)] px-4 pt-16">
        <div className="w-full max-w-[400px] bg-card border border-border rounded-xl shadow-lg p-8">
          <h1 className="text-2xl font-bold text-foreground text-center mb-6">
            Create an Account
          </h1>

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full h-11 rounded-lg border border-input bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-1.5">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full h-11 rounded-lg border border-input bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <button
              type="submit"
              className="w-full h-11 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors"
            >
              Register
            </button>

            {error && (
              <p className="text-sm text-destructive text-center">{error}</p>
            )}
          </form>

          <p className="text-sm text-muted-foreground text-center mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-foreground font-medium hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
