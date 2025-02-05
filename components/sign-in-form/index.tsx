"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { useFormStatus } from "react-dom";
import { useActionState } from "react";
import { signInWithCredentials } from "@/lib/actions/users.actions";
import { useSearchParams } from "next/navigation";
const SignInForm = () => {
  const [data, action] = useActionState(signInWithCredentials, {
    success: false,
    message: "",
  });
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'
  const SignInButton = () => {
    const { pending } = useFormStatus();
    return (
      <Button disabled={pending} className="w-full" variant="default">
        {pending ? "Please wait..." : "Sign in"}
      </Button>
    );
  };
  return (
    <form action={action}>
        <input type="hidden" name="callbackurl" value={callbackUrl}/>
      <div className="space-y-6">
        <div>
          <Label htmlFor="email" className="text-gray-400">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
          ></Input>
        </div>
        <div>
          <Label htmlFor="email" className="text-gray-400">
            Password
          </Label>
          <Input id="password" name="password" type="password" required></Input>
        </div>
        <div>
          <SignInButton />
        </div>
        {data && !data.success && (
          <div className="text-center text-destructive">{data.message}</div>
        )}
        <div className="text-center text-small text-muted-foreground">
          Don&apos;t have an account?{""}
          <Link href="/sign-up" target="_self" className="link text-blue-500">
            Sign up
          </Link>
        </div>
      </div>
    </form>
  );
};

export default SignInForm;
