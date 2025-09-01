import { NavLink, Outlet } from "react-router";
import { Button } from "./ui/button";
import { useAuth } from "./contexts/AuthContext";

const Home = () => {
  const { logout } = useAuth();
  return (
    <>
      <div className="flex flex-col items-center justify-between gap-10">
        <div className="border-2 text-4xl font-semibold shadow-2xl">
          Welcome to Home Page
        </div>
        <button onClick={logout}>Log out</button>
      </div>
    </>
  );
};

export default Home;
