"use client";
import React, { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import signIn from "@/lib/firebase/auth/signin";
import { toast } from "sonner";
import useAuthStore from "../../../store";

function Signup() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const router = useRouter();

  const handleForm = async (event: FormEvent) => {
    event.preventDefault();

    const { result, error } = await signIn(email, password);

    if (error) {
      return toast.error(`${error}`);
    }

    toast.success("Logged in successfully");

    useAuthStore.getState().setUser(result?.user);

    return router.push("/");
  };
  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col ">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-gray-950 px-6 py-8 rounded shadow-md text-white w-full border border-gray-400">
          <h1 className="mb-8 text-3xl text-center">Log in</h1>
          <form onSubmit={handleForm} className="flex flex-col gap-y-5">
            <Input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              label="Email"
              placeholder="Enter your email"
            />
            <Input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              label="Password"
              placeholder="Enter your password"
            />

            <Button
              type="submit"
              color="success"
              isDisabled={email.length == 0 || password.length == 0}
            >
              Login
            </Button>
          </form>
        </div>

        <div className="text-grey-dark mt-6">
          Don&#39;t have an account ?
          <Link
            href="/signup"
            className="text-primary-500 mx-1 font-bold underline"
          >
            Signup
          </Link>
        </div>
        <div className="text-grey-dark mt-6">
          <Link
            href="/passwordReset"
            className="text-primary-400 mx-1 font-medium underline"
          >
            Forgot password?
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
