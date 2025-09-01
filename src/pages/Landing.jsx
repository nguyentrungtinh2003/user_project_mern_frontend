import { NavLink } from "react-router";
import { Button } from "./ui/button";

const Landing = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-10">
        <div className="border-2 text-4xl font-semibold shadow-2xl">
          Text Page
        </div>
        <div className="flex flex-row gap-3">
          <Button>
            <NavLink to="auth/login">Login</NavLink>
          </Button>
          <Button>
            <NavLink to="auth/register">Register</NavLink>
          </Button>
          <Button>
            <NavLink to="/">Back</NavLink>
          </Button>
        </div>
      </div>
    </>
  );
};

export default Landing;
