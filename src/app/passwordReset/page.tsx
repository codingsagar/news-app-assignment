"use client";
import passwordReset from "@/lib/firebase/auth/passwordReset";
import { Input, Button } from "@nextui-org/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

function PasswordReset() {
  const router = useRouter();
  const handlePasswordReset = async (email: string) => {
    const { result, error } = await passwordReset(email);
    setEmail("");
    if (!error) router.push("/login");
  };
  const [email, setEmail] = useState<string>("");

  return (
    <div className="bg-grey-lighter min-h-svh flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center">
        <div className="bg-gray-950 px-6 py-4 rounded shadow-md text-white w-full border border-gray-400 flex flex-col gap-y-5">
          <h1 className="text-2xl text-center font-bold">
            Reset your password
          </h1>
          <Input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            label="Email"
            color="primary"
            placeholder="Enter your email"
          />

          <Button
            type="submit"
            color="success"
            isDisabled={email.length == 0}
            onClick={() => handlePasswordReset(email)}
          >
            Send reset link
          </Button>
        </div>
      </div>
    </div>
  );
}

export default PasswordReset;
