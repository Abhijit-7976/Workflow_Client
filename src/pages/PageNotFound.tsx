import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="h-dvh flex gap-2 bg-background justify-center items-center w-dvw ">
        <div className="space-y-16 text-foreground w-[30vw] text-center">
          <div className="space-y-3">
            <h1 className="text-[8rem] font-bold lg:text-[11rem] leading-none tracking-wide">404</h1>
            <h3 className="text-2xl font-semibold lg:text-3xl">Page Not Found</h3>
            <p className="text-lg lg:text-xl">We can't seem to find the page you're looking for.</p>
          </div>
          <Button
            className="uppercase"
            onClick={() => {
              navigate("/", { replace: true });
            }}>
            <Home className="size-5 mr-2" />
            Go to home
          </Button>
        </div>
      </div>
    </>
  );
};

export default PageNotFound;
