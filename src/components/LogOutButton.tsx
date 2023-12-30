"use client";
import { Button } from "@nextui-org/react";
import logOut from "@/lib/firebase/auth/signout";
import { useRouter } from "next/navigation";

function LogOutButton() {
  const router = useRouter();
  const handleLogOut = async () => {
    const { result, error } = await logOut();
    if (!error) router.push("/login");
  };
  return (
    <Button color="danger" onClick={handleLogOut} size="sm">
      Log out
    </Button>
  );
}

export default LogOutButton;
