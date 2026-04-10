import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../../../services/auth.service";
import logo from "../../../assets/logo-boaz.svg";

// ------------------------------------------------------------
// Mock credentials — matches the mock profiles
// In production these would be validated by Keycloak
// ------------------------------------------------------------
const MOCK_CREDENTIALS = [
  {
    email: "admin@boaz-study.com",
    password: "admin123",
    profile: "admin" as const,
  },
  {
    email: "basic@boaz-study.com",
    password: "basic123",
    profile: "basic" as const,
  },
];

// ------------------------------------------------------------
// LoginPage — custom Keycloak login
// Design matches BOAZ-STUDY Figma charter
// ------------------------------------------------------------
export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    // Simulate network delay — realistic mock behavior
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Find matching mock credentials
    const match = MOCK_CREDENTIALS.find(
      (c) => c.email === email && c.password === password,
    );

    if (!match) {
      setError(
        "Identifiants incorrects. Vérifiez votre email et mot de passe.",
      );
      setIsLoading(false);
      return;
    }

    authService.loginWithMock(match.profile);
    navigate("/", { replace: true });
  }

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left panel — decorative, hidden on mobile */}
      {/* Left panel — dark background to highlight the two-color logo */}
      <div className="hidden lg:flex lg:w-1/2 flex-col items-center justify-center p-12 bg-[#1A1A2E] relative overflow-hidden">
        <img src={logo} alt="BOAZ-STUDY" className="w-44 mb-8 relative z-10" />

        <h2 className="text-3xl font-bold text-white text-center leading-snug relative z-10">
          Bienvenue sur
          <br />
          StudyPortal
        </h2>

        <p className="text-white/60 text-center mt-4 text-sm leading-relaxed max-w-xs relative z-10">
          Gérez vos documents, tickets et services étudiants depuis un espace
          unique et sécurisé.
        </p>

        {/* Decorative circles */}
        {/* Decorative circles */}
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-primary -translate-x-1/3 translate-y-1/3" />
        <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-secondary translate-x-1/3 -translate-y-1/3" />
      </div>

      {/* Right panel — login form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Logo — mobile only */}
          <div className="flex justify-center mb-8 lg:hidden">
            <img src={logo} alt="BOAZ-STUDY" className="h-12" />
          </div>

          {/* Card */}
          <div className="card">
            <h1 className="text-2xl font-bold text-primary mb-1">Connexion</h1>
            <p className="text-sm text-text mb-8">
              Accédez à votre espace étudiant
            </p>

            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email */}
              <div>
                <label htmlFor="email" className="label">
                  Adresse email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre@email.com"
                  required
                  className="input"
                />
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="label">
                  Mot de passe
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="input"
                />
              </div>

              {/* Error */}
              {error && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-600">
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full py-3"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Connexion en cours...
                  </>
                ) : (
                  "Se connecter"
                )}
              </button>
            </form>
          </div>

          {/* Mock credentials hint — dev mode only */}
          {import.meta.env.DEV && (
            <div className="mt-4 p-4 rounded-xl border border-secondary/30 bg-secondary/5">
              <p className="text-xs font-bold text-secondary mb-2">
                Comptes de test
              </p>
              {MOCK_CREDENTIALS.map((c) => (
                <button
                  key={c.profile}
                  type="button"
                  onClick={() => {
                    setEmail(c.email);
                    setPassword(c.password);
                  }}
                  className="block w-full text-left text-xs text-secondary py-1 hover:underline"
                >
                  {c.email} / {c.password}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
