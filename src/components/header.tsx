"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LoginLink,
  LogoutLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs";
import { useState, useEffect, useRef } from "react";

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

export default function Header({
  isAuth,
  user,
}: {
  isAuth: boolean;
  user: any;
}) {
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
            <li className="relative" ref={dropdownRef}>
              <button
                className="text-zinc-400 flex items-center"
                onClick={toggleDropdown}
              >
                {user.given_name}
                <svg
                  className={`w-4 h-4 ml-1 transition-transform ${
                    dropdownOpen ? "transform rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>
              {dropdownOpen && (
                <ul className="absolute right-0 mt-2 w-48 border bg-black border-zinc-800 rounded-md shadow-xl">
                  <li>
                    <LogoutLink className="block px-4 py-2 text-zinc-400">
                      Logout
                    </LogoutLink>
                  </li>
                </ul>
              )}
            </li>
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
