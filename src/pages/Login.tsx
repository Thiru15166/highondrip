import { useState } from "react";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/firebase";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err: any) {
      setError("Invalid email or password");
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      alert("Please enter your email first");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent to your email");
    } catch (err: any) {
      alert(err.message);
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
            Limited Access · Exclusive Drops
          </p>
          <h1 className="font-serif font-black text-3xl md:text-4xl tracking-[0.2em] uppercase mb-4">
            Member Access
          </h1>
          <div className="w-8 h-[1px] bg-foreground/20 mx-auto mb-4" />
          <p className="text-[11px] tracking-[0.15em] text-muted-foreground">
            Members receive early access to every release.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-8 text-left">
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
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border-b border-border/60 pb-3 text-sm font-serif tracking-wide placeholder:text-muted-foreground/40 focus:outline-none focus:border-foreground transition-colors duration-300"
                placeholder="Enter password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 bottom-3 text-[10px] tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
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
            Enter
          </button>
        </form>

        {/* Footer Links */}
        <div className="mt-10 space-y-4">
          <button
            onClick={handleForgotPassword}
            className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-300"
          >
            Forgot Password?
          </button>

          <p className="text-[11px] tracking-[0.1em] text-muted-foreground">
            New here?{" "}
            <Link
              to="/register"
              className="text-foreground underline underline-offset-4 hover:text-muted-foreground transition-colors duration-300"
            >
              Join the Community
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
