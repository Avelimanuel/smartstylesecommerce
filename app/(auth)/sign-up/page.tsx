import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { APP_NAME } from "@/lib/constants";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import RegistrationForm from "@/components/registrationform.tsx";

export const metadata: Metadata = {
  title: "Register",
};
const SignUpPage = async (props: {
  searchParams: Promise<{
    callbackUrl: string;
  }>;
}) => {
  const { callbackUrl } = await props.searchParams;
  const session = await auth();
  if (session) {
    return redirect(callbackUrl || "/");
  }
  return (
    <div className="w-full max-w-md mx-auto">
      <Card>
        <CardHeader className="space-y-4">
          <Link href="/" className="flex-center">
            <Image
              src="/images/logo.svg"
              width={100}
              height={100}
              alt={`${APP_NAME}logo`}
              priority={true}
            />
          </Link>
          <CardTitle className="text-center">Sign Up Here</CardTitle>
          <CardDescription className="text-center">
            Register
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <RegistrationForm/>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUpPage;
