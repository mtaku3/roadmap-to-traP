import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

export default function ErrorFallback() {
  const navigate = useNavigate();

  return (
    <div
      role="alert"
      className="h-screen flex flex-col justify-center items-center gap-4"
    >
      <p className="text-2xl text-red-500">Something went wrong</p>
      <Button variant="outline" onClick={() => navigate(0)}>
        リロードする
      </Button>
    </div>
  );
}
