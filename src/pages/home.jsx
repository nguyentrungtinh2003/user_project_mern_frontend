import { NavLink, Outlet } from "react-router";
import { Button } from "./ui/button";
import { useAuth } from "./contexts/AuthContext";

const Home = () => {
  const { logout } = useAuth();
  return (
    <>
      <div className="container mx-auto max-w-2xl">
        <div className="border-2 text-center text-4xl font-semibold shadow-2xl">
          Welcome to Home Page
        </div>
        <div className="flex cursor-pointer justify-center">
          <Button variant="outline" onClick={logout}>
            Log out
          </Button>
        </div>
      </div>
    </>
  );
};

export default Home;
