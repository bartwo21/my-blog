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
          width="40"
          height="40"
        />
      </Link>
      <nav>
        <ul className="flex gap-x-5 text-s items-center justify-center">
          {links.map(({ href, label }) => (
            <li key={`${href}${label}`}>
              <Link
                className={`text-xs md:text-lg ${
                  pathname === href ? "text-zinc-200" : "text-zinc-400"
                }`}
                href={href}
              >
                {label}
              </Link>
            </li>
          ))}
          {isAuth ? (
            <li className="relative" ref={dropdownRef}>
              <button
                className="text-zinc-400 flex items-center justify-center"
                onClick={toggleDropdown}
              >
                {user.picture ? (
                  user.picture.startsWith("https://gravatar.com/avatar/") ? (
                    <p className="font-semibold text-white bg-gray-500 rounded-full w-9 h-9 flex items-center justify-center mr-2 text-xs md:text-lg">
                      {user?.given_name
                        ?.split(" ")
                        .map((name: string) => name[0])
                        .join("")}
                    </p>
                  ) : (
                    <Image
                      src={user.picture}
                      alt={user.given_name}
                      width="36"
                      height="36"
                      className="rounded-full mr-2"
                    />
                  )
                ) : (
                  <p className="text-md font-semibold text-white bg-gray-500 rounded-full w-9 h-9 flex items-center justify-center mr-2 text-xs md:text-lg">
                    {user?.given_name
                      ?.split(" ")
                      .map((name: string) => name[0])
                      .join("")}
                  </p>
                )}
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
                    <LogoutLink className="block px-4 py-2 text-zinc-400 text-xs md:text-lg">
                      Logout
                    </LogoutLink>
                  </li>
                </ul>
              )}
            </li>
          ) : (
            <li>
              <LoginLink className="text-zinc-400 text-xs md:text-lg mr-4">
                Login
              </LoginLink>
              <RegisterLink className="text-zinc-400 text-xs md:text-lg">
                Register
              </RegisterLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
