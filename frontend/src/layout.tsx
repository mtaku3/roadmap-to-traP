import { Outlet } from "react-router-dom";
import useUserMe from "./api/useUserMe";
import { LoaderIcon } from "lucide-react";
import { User } from "./models/user";
import { Avatar, AvatarImage } from "./components/ui/avatar";
// import { LogInIcon } from "lucide-react";

export default function Layout() {
  const { user, error, isLoading } = useUserMe();

  if (error != null) {
    throw new Error("Failed to fetch user data from traq api");
  }

  return (
    <div className="flex flex-col">
      <div className="px-10 py-4 h-20 flex gap-4 items-center border-b-4 border-zinc-200">
        <h1 className="text-3xl font-bold">roadmaP</h1>
        <div className="ml-auto">
          {isLoading ? (
            <LoaderIcon className="animate-spin" />
          ) : user == null ? (
            <LogInBtn />
          ) : (
            <UserAvatar user={user} />
          )}
        </div>
      </div>
      <Outlet />
    </div>
  );
}

function LogInBtn() {
  return <></>;
  // return (
  //   <Button variant="outline" size="sm">
  //     <LogInIcon className="h-4 w-4" />
  //   </Button>
  // );
}

function UserAvatar({ user }: { user: User }) {
  return (
    <Avatar>
      <AvatarImage
        src={`https://q.trap.jp/api/v3/public/icon/${user.trap_name}`}
      />
    </Avatar>
  );
}
