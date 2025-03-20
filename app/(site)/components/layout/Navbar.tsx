// app/components/layout/navbar

"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Logo from "../../../../public/logo.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full backdrop-blur z-10 flex justify-between items-center pr-20 pl-20 md:px-20">
      <Link href="/">
        <Image src={Logo} width={140} height={140} alt="logo" className="aspect-square flex-shrink-0" />
      </Link>

      <nav className="hidden md:flex">
        <ul className="flex items-center gap-6">
          {["À propos", "Nos services", "Nous contacter"].map((text, index) => (
            <li key={index}>
              <Link href="/" className="font-inter text-lg font-medium hover:text-[#1D4ED8] duration-300">
                {text}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={32} /> : <Menu size={32} />}
      </button>
      <nav
        className={`fixed top-0 right-0 h-full w-3/4 bg-white shadow-lg transform ${isOpen ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-300 ease-in-out md:hidden`}
      >
        <button className="absolute top-4 right-4" onClick={() => setIsOpen(false)}>
          <X size={32} />
        </button>
        <ul className="flex flex-col items-center justify-center h-full space-y-6">
          {["À propos", "Nos services", "Nous contacter"].map((text, index) => (
            <li key={index}>
              <Link href="/" onClick={() => setIsOpen(false)} className="text-xl font-medium hover:text-[#1D4ED8]">
                {text}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}