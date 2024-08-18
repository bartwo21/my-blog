"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LoginLink,
  LogoutLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs";

const links = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/posts",
    label: "Posts",
  },
  {
    href: "/create-post",
    label: "Create Post",
  },
];

export default function Header({ isAuth }: { isAuth: boolean }) {
  const pathname = usePathname();
  return (
    <header className="flex justify-between items-center py-4 px-7 border-b border-zinc-700">
      <Link href="/">
        <Image
          src="https://bytegrad.com/course-assets/youtube/example-logo.png"
          alt="Bartu Logo"
          width="50"
          height="50"
        />
      </Link>
      <nav>
        <ul className="flex gap-x-5 text-s">
          {links.map(({ href, label }) => (
            <li key={`${href}${label}`}>
              <Link
                className={` ${
                  pathname === href ? "text-zinc-200" : "text-zinc-400"
                }`}
                href={href}
              >
                {label}{" "}
              </Link>
            </li>
          ))}
          {isAuth ? (
            <LogoutLink className="text-zinc-400">Logout</LogoutLink>
          ) : (
            <>
              <LoginLink className="text-zinc-400">Login</LoginLink>
              <RegisterLink className="text-zinc-400">Register</RegisterLink>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
