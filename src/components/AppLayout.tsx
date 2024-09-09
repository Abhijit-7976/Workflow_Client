import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { clearUser } from "@/features/auth/authSlice";
import { ThemeType, updateTheme } from "@/features/theme/themeSlice";
import { User } from "@/lib/types";
import { AppDispatch, RootState } from "@/store";
import { Blocks, Play } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

const BASE_NAV_BUTTON_STYLES =
  "h-10 w-10 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ";

const classNameFunc: (props: { isActive: boolean; isPending: boolean; isTransitioning: boolean }) => string | undefined = ({ isActive }) => {
  return isActive
    ? BASE_NAV_BUTTON_STYLES + "bg-primary text-primary-foreground hover:bg-primary/90"
    : BASE_NAV_BUTTON_STYLES + "hover:bg-accent hover:text-accent-foreground";
};

const AppLayout = () => {
  const user = useSelector<RootState, User | null>(state => state.auth.user);
  const navigate = useNavigate();
  const theme = useSelector<RootState, ThemeType>(state => state.theme.type);
  const dispatch = useDispatch<AppDispatch>();

  const isDarkMode = theme === "dark";

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [navigate, user]);

  if (!user) return null;

  return (
    <div className="flex flex-col h-screen w-screen">
      <div className="w-full h-fit border-b flex justify-between items-center p-4">
        <span className="scroll-m-20 text-2xl font-semibold tracking-tight">Workflow</span>
        {isDarkMode ? (
          <button
            className="scroll-m-20 text-2xl font-semibold tracking-tight"
            onClick={() => dispatch(updateTheme("light"))}>
            🌞
          </button>
        ) : (
          <button
            className="scroll-m-20 text-2xl font-semibold tracking-tight"
            onClick={() => dispatch(updateTheme("dark"))}>
            🌚
          </button>
        )}
        <div className="flex items-center gap-4">
          <span className="scroll-m-20 text-2xl font-semibold tracking-tight">Hi ({user.username}) </span>
          <Button
            variant="destructive"
            onClick={() => dispatch(clearUser())}>
            Logout
          </Button>
        </div>
      </div>
      <div className="flex w-full h-full">
        <aside className="flex flex-col border-r p-2 gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <NavLink
                  to="/"
                  className={classNameFunc}
                  aria-label="Builder">
                  <Blocks className="size-5" />
                </NavLink>
              </TooltipTrigger>
              <TooltipContent
                side="right"
                sideOffset={5}>
                Builder
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger>
                <NavLink
                  to="/run"
                  className={classNameFunc}
                  aria-label="Run">
                  <Play className="size-5" />
                </NavLink>
              </TooltipTrigger>
              <TooltipContent
                side="right"
                sideOffset={5}>
                Run
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </aside>
        <main className="relative flex-1 flex justify-center items-center">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
