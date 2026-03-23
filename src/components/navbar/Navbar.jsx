"use client";
import React from "react";
import Link from "next/link";
import DarkModeToggle from "../dark mode toggle/DatkModeToggle";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
  
  const { data: session } = useSession()
  
  const pathname = usePathname();
  return (
    <div className="flex justify-between items-center text-2xl my-5 mx-auto w-341.5">
      <Link href="/">lamamia</Link>
      <div className="flex gap-5 items-center">
        <DarkModeToggle />
        <Link
          className={`${pathname === "/" ? "text-[#53c38b]" : {}}`}
          href="/"
        >
          Home
        </Link>
        <Link
          className={`${pathname === "/portfolio" ? "text-[#53c38b]" : {}}}`}
          href="/portfolio"
        >
          Portfolio
        </Link>
        <Link
          className={`${pathname === "/blog" ? "text-[#53c38b]" : {}}}`}
          href="/blog"
        >
          Blog
        </Link>
        <Link
          className={`${pathname === "/about" ? "text-[#53c38b]" : {}}}`}
          href="/about"
        >
          About
        </Link>
        <Link
          className={`${pathname === "/contact" ? "text-[#53c38b]" : {}}}`}
          href="/contact"
        >
          Contact
        </Link>
        <Link
          className={`${pathname === "/dashboard" ? "text-[#53c38b]" : {}}}`}
          href="/dashboard"
        >
          Dashboard
        </Link>
        {session && <button onClick={() => signOut()} className="p-1.5 text-white cursor-pointer rounded-md border-0 bg-[#53c38b]">
          Logout
        </button>}
      </div>
    </div>
  );
};

export default Navbar;
