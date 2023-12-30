"use client";
import React, { FormEvent } from "react";
import signUp from "@/lib/firebase/auth/signup";
import { useRouter } from "next/navigation";
import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import { toast } from "sonner";
import useAuthStore from "../../../store";

function Signup() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const router = useRouter();

  const handleForm = async (event: FormEvent) => {
    event.preventDefault();

    const { result, error } = await signUp(email, password);
    
    if (error) {
      return toast.error(`${error}`);
    }

    toast.success("Account created successfully !")
    useAuthStore.getState().setUser(result?.user);

    return router.push("/");
  };
  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col ">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-gray-950 px-6 py-8 rounded shadow-md text-white w-full border border-gray-400">
          <h1 className="mb-8 text-3xl text-center">Sign up</h1>
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

            <Button type="submit" color="success" isDisabled={email.length == 0 || password.length == 0}>
              Create Account
            </Button>
          </form>
        </div>

        <div className="text-grey-dark mt-6">
          Already have an account ?
          <Link
            href="/login"
            className="text-primary-500 mx-1 font-bold underline"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
