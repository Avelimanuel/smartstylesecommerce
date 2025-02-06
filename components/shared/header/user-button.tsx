import Link from "next/link";
import { signOutUser } from "@/lib/actions/users.actions";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuLabel,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { UserIcon } from "lucide-react";
const UserButtton = async () => {
  const session = await auth();
  

  if (!session) {
    return (
      <Button asChild className="flex items-center space-x-2">
        <Link href="/sign-in">
          <UserIcon size={20} />
          <span>Sign In</span>
        </Link>
      </Button>
    );
  }

  const firstUsernameInitial = session.user?.email?.charAt(0).toUpperCase() ?? "profile"
    

  return (
    <div className="flex gap-2 items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center">
            <Button
              variant="ghost"
              className="relative justify-center w-8 h-8 rounded-full ml-2 flex items-center bg-gray-200"
            >
              {firstUsernameInitial}
            </Button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                    <div className="text-muted-foreground font-medium leading-none">
                        {session.user?.email}
                    </div>
                </div>

            </DropdownMenuLabel>
            <DropdownMenuItem className="p-0 mb-1">
                <form action={signOutUser} className="w-full">
                    <Button className="w-ful py-4 px-2 h-4 justify-center bg-red-400" variant='ghost'>
                        Sign Out
                    </Button>
                </form>
            </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserButtton;
