"use client";

import "../app/globals.css";

import Image from "next/image";
import Link from "next/link";
import { HomeIcon, PersonIcon } from "@radix-ui/react-icons";
import { CgProfile } from "react-icons/cg";
import { useSession, signIn, signOut } from "next-auth/react";
import { TfiTicket } from "react-icons/tfi";

const Header = () => {
  const { data: session } = useSession();

  return (
    <nav className="drop-shadow-2xl flex items-center justify-between p-3 border-b bg-slate-100 h-24">
      
      {/* LOGO */}
      <Link href="/events" className="relative w-[90px] h-[90px]">
        <Image
          src="/images/logo.png"
          alt="Logo"
          fill
          className="object-contain"
        />
      </Link>

      {/* NAV LINKS */}
      <div className="flex items-center gap-6 font-semibold max-md:hidden">

        <Link href="/" className="flex gap-2 items-center hover:text-primary">
          <HomeIcon />
          Home
        </Link>

        <Link href="/events" className="flex gap-2 items-center hover:text-primary">
          <CgProfile />
          Events
        </Link>

        <Link href="/artists" className="flex gap-2 items-center hover:text-primary">
          <PersonIcon />
          Artists
        </Link>

        <Link href="/tags" className="flex gap-2 items-center hover:text-primary">
          <TfiTicket />
          Tags
        </Link>

        {/* SHOW ONLY WHEN LOGGED IN */}
        {session && (
          <Link
            href="/create-event"
            className="px-4 py-2 rounded-md bg-blue-600 text-white hover:opacity-80"
          >
            Create Event
          </Link>
        )}
      </div>

      {/* AUTH BUTTONS */}
      <div>
        {!session ? (
          <button
            onClick={() => signIn("google")}
            className="bg-gradient-to-r from-orange-400 to-teal-600 text-white px-4 py-2 rounded-md font-medium hover:opacity-70"
          >
            Log in
          </button>
        ) : (
          <button
            onClick={() => signOut()}
            className="bg-gradient-to-r from-red-500 to-red-700 text-white px-4 py-2 rounded-md font-medium hover:opacity-70"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Header;
