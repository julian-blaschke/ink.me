import { InstagramOutlined } from "@ant-design/icons";
import Link from "next/link";
import { auth } from "../../firebase";
import ThemeToggle from "./ThemeToggle";

const NavBar = () => {
  return (
    <nav className="py-2 px-4 flex flex-row w-screen justify-between shadow">
      <Link href="/">
        <a className="text-2xl font-semibold">ink.me</a>
      </Link>
      <div className="flex flex-row items-center space-x-4">
        {!auth.currentUser && (
          <a
            href="https://api.instagram.com/oauth/authorize?client_id=969419426882011&redirect_uri=https://localhost:3000/auth/sign-up/&scope=user_profile,user_media&response_type=code"
            className="flex flex-row items-center underline"
          >
            <InstagramOutlined className="mr-1" />
            Sign in with Instagram
          </a>
        )}
        <ThemeToggle></ThemeToggle>
      </div>
    </nav>
  );
};

export default NavBar;
