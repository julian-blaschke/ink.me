import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

const NavBar = () => {
  return (
    <nav className="py-2 px-4 flex flex-row w-screen justify-between shadow">
      <Link href="/">
        <a className="text-2xl font-semibold">ink.me</a>
      </Link>
      <ThemeToggle></ThemeToggle>
    </nav>
  );
};

export default NavBar;
