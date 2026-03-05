import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useUserStore } from "@/store/user.store";
import { loginSchema } from "@/modules/user/zod-schemas/login-user.schema";
import { GoogleIcon, RedditIcon } from "@/components/icons/svgIcons";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const { login, isLoading } = useUserStore();
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    try {
      await login(email, password);
      navigate("/");
    } catch {
      setError("Invalid email or password.");
    }
  }

  return (
    <div className="min-h-screen bg-[#dae0e6] flex items-center justify-center p-4">
      <Card className="w-full max-w-sm rounded-2xl shadow-lg">
        <CardHeader className="items-center gap-2 pb-2">
          {/* Reddit logo mark */}
          <div className="flex items-center gap-2">
            <RedditIcon className="h-9 w-9" />
            <span className="text-2xl font-bold tracking-tight">reddit</span>
          </div>
          <p className="text-sm text-muted-foreground text-center">
            Log in to continue exploring Reddit
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Google OAuth placeholder */}
          <Button variant="outline" className="w-full gap-2" type="button">
            <GoogleIcon className="h-4 w-4" />
            Continue with Google
          </Button>

          <div className="flex items-center gap-3">
            <Separator className="flex-1" />
            <span className="text-xs text-muted-foreground">OR</span>
            <Separator className="flex-1" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="space-y-1.5">
              <Label htmlFor="email">Email or username</Label>
              <Input
                id="email"
                type="text"
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>

            {error && <p className="text-xs text-red-500">{error}</p>}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#ff4500] hover:bg-[#e03d00] text-white"
            >
              {isLoading ? "Logging in..." : "Log In"}
            </Button>
          </form>

          <Button
            variant="link"
            className="w-full text-xs text-muted-foreground"
            type="button"
          >
            Forgot your password?
          </Button>

          <Separator />

          <p className="text-center text-xs text-muted-foreground">
            New to Reddit?{" "}
            <a
              href="/signup"
              className="text-[#ff4500] font-semibold hover:underline"
            >
              Sign Up
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
