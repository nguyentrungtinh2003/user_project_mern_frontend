import { NavLink } from "react-router";
import { Button } from "./ui/button";

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-5 text-center font-semibold">
      <h1 className="text-4xl">Not found page</h1>
      <div className="text-8xl text-gray-400">404</div>
      <Button variant="link" className="text-blue-500 hover:text-blue-700">
        <NavLink to="/">Back home</NavLink>
      </Button>
    </div>
  );
};

export default NotFound;
