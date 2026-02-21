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
    <div className="flex items-center justify-center min-h-screen bg-background px-4">
      {/* Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="font-serif font-black text-[14vw] tracking-[0.3em] text-foreground/[0.02] whitespace-nowrap">
          HIGH ON DRIP
        </span>
      </div>

      <div className="relative w-full max-w-sm text-center">
        {/* Culture Header */}
        <div className="mb-16">
          <p className="text-[9px] tracking-[0.5em] uppercase text-muted-foreground mb-3">
            Become a Member
          </p>
          <h1 className="font-serif font-black text-3xl md:text-4xl tracking-[0.2em] uppercase mb-4">
            Join the Community
          </h1>
          <div className="w-8 h-[1px] bg-foreground/20 mx-auto mb-4" />
          <p className="text-[11px] tracking-[0.15em] text-muted-foreground">
            Unlock exclusive drops and early access.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8 text-left">
          <div className="space-y-2">
            <label className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent border-b border-border/60 pb-3 text-sm font-serif tracking-wide placeholder:text-muted-foreground/40 focus:outline-none focus:border-foreground transition-colors duration-300"
              placeholder="your@email.com"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent border-b border-border/60 pb-3 text-sm font-serif tracking-wide placeholder:text-muted-foreground/40 focus:outline-none focus:border-foreground transition-colors duration-300"
              placeholder="Create a password"
            />
          </div>

          {error && (
            <p className="text-[11px] tracking-[0.1em] text-destructive text-center">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full py-4 bg-foreground text-background font-serif text-xs tracking-[0.25em] uppercase hover:bg-foreground/90 transition-all duration-500 mt-4"
          >
            Join
          </button>
        </form>

        {/* Footer Link */}
        <div className="mt-10">
          <p className="text-[11px] tracking-[0.1em] text-muted-foreground">
            Already a member?{" "}
            <Link
              to="/login"
              className="text-foreground underline underline-offset-4 hover:text-muted-foreground transition-colors duration-300"
            >
              Enter
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
