"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { APP_NAME } from "@/lib/constants";
const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Image
        src="/images/smartstyleslogo.jpeg"
        width={48}
        height={48}
        alt={`${APP_NAME} logo`}
        priority={true}
      />
      <div className="rounded-lg text-center shadow-md p-6 w-1/3">
        <h1 className="font-bold text-3xl mb-4">Page Not found</h1>
        <p className="text-destructive">Could not find the requested page</p>
        <Button
          
          className="mt-4 ml-2"
          onClick={() => (window.location.href = "/")}
        >Back home</Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
