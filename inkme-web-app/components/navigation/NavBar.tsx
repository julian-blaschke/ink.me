import { InstagramOutlined } from "@ant-design/icons";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "../../context/AuthContext";

const Menu = () => {
  const { user, loading } = useAuth();
  if (loading)
    return <div className="flex flex-row items-center">loading...</div>;
  if (!user)
    return (
      <a
        href="https://api.instagram.com/oauth/authorize?client_id=969419426882011&redirect_uri=https://localhost:3000/auth/sign-up/&scope=user_profile,user_media&response_type=code"
        className="flex flex-row items-center underline text-sm font-light"
      >
        <InstagramOutlined className="mr-1" />
        Sign in with Instagram
      </a>
    );
  return (
    <div className="flex flex-row items-center space-x-4">
      <ul>
        <li>{user.uid}</li>
      </ul>
    </div>
  );
};

const NavBar = () => {
  return (
    <nav className="py-2 px-4 flex flex-row w-screen justify-between shadow">
      <Link href="/">
        <a className="text-2xl font-semibold">inkme</a>
      </Link>
      <div className="flex flex-row space-x-10">
        <Menu></Menu>
        <ThemeToggle></ThemeToggle>
      </div>
    </nav>
  );
};

export default NavBar;
