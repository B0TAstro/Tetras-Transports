// components/layout/Navbar.tsx

"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Logo from "../../../../public/logo.png";

const smoothScroll = (event: React.MouseEvent, sectionId: string, closeMenu?: () => void) => {
  event.preventDefault();
  const element = document.getElementById(sectionId);
  if (element) {
    const offset = 140;
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: elementPosition - offset,
      behavior: "smooth",
    });
    if (closeMenu) closeMenu();
  }
};

const navLinks = [
  { text: "À propos", href: "who" },
  { text: "Nos services", href: "services" },
  { text: "Nous contacter", href: "contact" },
];

export default function Navbar() {
  console.log('Rendering Navbar')

  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full backdrop-blur z-10 flex justify-between items-center pr-5 pl-5 md:pr-20 md:pl-20 pt-6 md:pt-0">
      <Link href="/" onClick={(e) => smoothScroll(e, "top")}>
        <Image
          src={Logo}
          width={110}
          height={110}
          alt="logo"
          className="aspect-square flex-shrink-0 md:w-[140px] md:h-[140px]"
        />
      </Link>

      <nav className="hidden md:flex">
        <ul className="flex items-center gap-6">
          {navLinks.map(({ text, href }, index) => (
            <li key={index}>
              <button
                onClick={(e) => smoothScroll(e, href)}
                className="font-inter text-lg font-medium hover:text-[#1D4ED8] duration-300"
              >
                {text}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={32} /> : <Menu size={32} />}
      </button>

      <nav
        className={`fixed top-0 right-0 w-full h-screen bg-white shadow-lg transform ${isOpen ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-300 ease-in-out md:hidden`}
      >
        <button className="absolute top-16 right-5" onClick={() => setIsOpen(false)}>
          <X size={32} />
        </button>

        <ul className="flex flex-col items-center justify-center h-full space-y-4">
          {navLinks.map(({ text, href }, index) => (
            <li key={index}>
              <button
                onClick={(e) => smoothScroll(e, href, () => setIsOpen(false))}
                className="text-xl font-medium text-center duration-300 w-100 px-8 py-4 rounded-sm hover:bg-blue-600 hover:text-white"
              >
                {text}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}