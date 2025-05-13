import Image from "next/image";
import Link from "next/link";
import Logo from "../../../public/logo.png";

export default function Footer() {
  return (
    <footer className="flex flex-col md:flex-row justify-center md:justify-between items-center pr-5 pl-5 md:pr-20 md:pl-20  pb-15 md:pb-0 gap-6 md:gap-0">
      <div className="flex flex-col gap-6 justify-center shrink-0 items-start md:items-center order-1 md:order-none"> 
        <ul className="flex flex-col justify-center items-center md:items-start self-stretch text-center gap-2">
          <li>
            <Link href="/mention" className="font-inter text-[16px] font-medium hover:text-[#1D4ED8] duration-300 text-center md:text-left">
                Mentions légales
            </Link>
          </li>
          <li>
            <Link href="/" className="font-inter text-[16px] font-medium hover:text-[#1D4ED8] duration-300 text-center md:text-left">
                Politique de confidentialité et protection des données
            </Link>
          </li>
          <li className="font-inter text-[16px] font-medium text-center md:text-left">
            Copyright © {new Date().getFullYear()} TetrasTransports. Tous droits réservés.
          </li>
        </ul>
      </div>
      <Link href="/" className="order-none md:order-1">
        <Image src={Logo} width={150} height={150} alt="logo" className="aspect-square flex-shrink-0 md:w-[250px] md:h-[250px]" />
      </Link>
    </footer>
  );
}