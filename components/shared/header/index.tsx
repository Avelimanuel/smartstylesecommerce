import { UserIcon, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/lib/constants";
import ThemeToggle from "./theme-toggle";

const Header = () => {
  return (
    <header className="w-full border-b bg-white dark:bg-gray-900 shadow-sm">
      <div className="wrapper flex justify-between items-center px-4 py-3 md:px-6 lg:px-8">
        {/* Logo Section */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/images/smartstyleslogo.jpeg"
              width={40}
              height={40}
              alt={`${APP_NAME} logo`}
              priority={true}
              className="rounded-full shadow-md"
            />
            <span className="hidden lg:block text-2xl font-bold text-orange-600">
              {APP_NAME}
            </span>
          </Link>
        </div>

        {/* Actions Section */}
        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Cart Button */}
          <Button asChild variant="ghost" className="flex items-center space-x-2">
            <Link href="/cart">
              <ShoppingCart size={20} />
              <span className="hidden md:block">Cart</span>
            </Link>
          </Button>

          {/* Sign-In Button */}
          <Button asChild className="flex items-center space-x-2">
            <Link href="/sign-in">
              <UserIcon size={20} />
              <span>Sign In</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
