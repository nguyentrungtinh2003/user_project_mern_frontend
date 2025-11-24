import { Link, useNavigate } from "react-router";
import { Button } from "../components/ui/button";

const NotFound = () => {
  const navigate = useNavigate()
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-5 text-center font-semibold">
      <h1 className="text-4xl">Not found page</h1>
      <div className="text-8xl text-gray-400">404</div>
      {navigate(-1) ? (
        <Button variant="link" className="text-blue-500 hover:text-blue-700" onClick={() => navigate(-1)}>
          Go back
        </Button>
      ) : (
        <Button variant="link" className="text-blue-500 hover:text-blue-700">
          <Link to="/">Back home</Link>
        </Button>
      )}

    </div>
  );
};

export default NotFound;
