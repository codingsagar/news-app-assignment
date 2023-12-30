"use client";
import { useEffect } from "react";
import useAuthStore from "../../store";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebase_app from "@/lib/firebase/firebase-config";
import LogOutButton from "./LogOutButton";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from "@nextui-org/react";
import Link from "next/link";

import { ImNewspaper } from "react-icons/im";

export default function Nav() {
  const { isAuthenticated, setUser, user }: any = useAuthStore();
  const auth = getAuth(firebase_app);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (newUser) => {
      setUser(newUser);
    });

    return () => {
      unsubscribe();
    };
  }, [auth, setUser]);
  return (
    <Navbar isBordered className="z-10">
      <NavbarBrand>
        <Link href="/" className="text-white flex items-center">
          <ImNewspaper />
          <p className="font-bold text-inherit mx-1">QuickNews</p>
        </Link>
      </NavbarBrand>
      {isAuthenticated ? (
        <>
          <NavbarItem className="hidden lg:flex text-primary-500">
            <Link
              href={{
                pathname: "/savedArticles",
                query: { uid: user.uid },
              }}
            >
              Saved Articles
            </Link>
          </NavbarItem>
          <LogOutButton />
        </>
      ) : (
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex text-primary-500">
            <Link href="/login">Login</Link>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} color="primary" href="/signup" variant="flat">
              Sign Up
            </Button>
          </NavbarItem>
        </NavbarContent>
      )}
    </Navbar>
  );
}
