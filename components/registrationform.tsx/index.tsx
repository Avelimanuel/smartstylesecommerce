"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { useFormStatus } from "react-dom";
import { useActionState } from "react";
import { signUpUser } from "@/lib/actions/users.actions";
import { useSearchParams } from "next/navigation";

const RegistrationForm = () => {
  const [data, action] = useActionState(signUpUser, {
    success: false,
    message: "",
  });
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const RegisterButton = () => {
    const { pending } = useFormStatus();
    return (
      <Button disabled={pending} className="w-full" variant="default">
        {pending ? "Please wait..." : "Register"}
      </Button>
    );
  };

  return (
    <form
      action={action}
      className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm mx-auto"
    >
      <input type="hidden" name="callbackurl" value={callbackUrl} />

      <div className="space-y-4">
        <div>
          <Label htmlFor="name" className="text-gray-500 text-sm">
            Name
          </Label>
          <Input id="name" name="name" type="text" required className="h-9" />
        </div>

        <div>
          <Label htmlFor="email" className="text-gray-500 text-sm">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="h-9"
          />
        </div>

        <div>
          <Label htmlFor="password" className="text-gray-500 text-sm">
            Password
          </Label>
          <Input
            id="password"
            name="password"
            type="password"
            required
            className="h-9"
          />
        </div>

        <div>
          <Label htmlFor="confirmPassword" className="text-gray-500 text-sm">
            Confirm Password
          </Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
            className="h-9"
          />
        </div>

        <RegisterButton />

        {data && !data.success && (
          <div className="text-center text-sm text-red-500">{data.message}</div>
        )}

        <div className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link href="/sign-in" className="text-blue-500 font-medium">
            Sign in
          </Link>
        </div>
      </div>
    </form>
  );
};

export default RegistrationForm;
