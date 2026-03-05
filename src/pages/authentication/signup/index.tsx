import { GoogleIcon, RedditIcon } from "@/components/icons/svgIcons";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useUserStore } from "@/store/user.store";
import { useState } from "react";
import { useNavigate } from "react-router";

const Gender = {
  MEN: "MEN",
  WOMEN: "WOMEN",
} as const;

type Gender = (typeof Gender)[keyof typeof Gender];

export const SignupPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState<Gender | "">("");
  const [birthdate, setBirthdate] = useState("");
  const [error, setError] = useState<string | null>(null);

  const { isLoading, signup } = useUserStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!gender) {
      setError("Please select a gender.");
      return;
    }

    const data = {
      firstName,
      lastName,
      email,
      password,
      gender: gender as Gender,
      bithdate: birthdate.toString(),
    };

    try {
      await signup(data);
      navigate("/login");
    } catch {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#dae0e6] flex items-center justify-center p-4">
      <Card className="w-full max-w-sm rounded-2xl shadow-lg">
        <CardHeader className="items-center gap-2 pb-2">
          <div className="flex items-center gap-2">
            <RedditIcon className="h-9 w-9" />
            <span className="text-2xl font-bold tracking-tight">reddit</span>
          </div>
          <p className="text-sm text-muted-foreground text-center">
            Sign up to continue exploring Reddit
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
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
            <div className="flex gap-2">
              <div className="space-y-1.5 flex-1">
                <Label htmlFor="firstName">First name</Label>
                <Input
                  id="firstName"
                  type="text"
                  autoComplete="given-name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>
              <div className="space-y-1.5 flex-1">
                <Label htmlFor="lastName">Last name</Label>
                <Input
                  id="lastName"
                  type="text"
                  autoComplete="family-name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
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
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="gender">Gender</Label>
              <select
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value as Gender)}
                disabled={isLoading}
                className="w-full h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring disabled:opacity-50"
              >
                <option value="" disabled>
                  Select gender
                </option>
                <option value={Gender.MEN}>Men</option>
                <option value={Gender.WOMEN}>Women</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="birthdate">Birthdate</Label>
              <Input
                id="birthdate"
                type="date"
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
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
              {isLoading ? "Signing up..." : "Sign Up"}
            </Button>
          </form>

          <Separator />

          <p className="text-center text-xs text-muted-foreground">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-[#ff4500] font-semibold hover:underline"
            >
              Log In
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
