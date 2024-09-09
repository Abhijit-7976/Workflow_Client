import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import reactLogo from "./assets/react.svg";
import AppLayout from "./components/AppLayout";
import { Toaster } from "./components/ui/toaster";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import SignUp from "./pages/SignUp";
import WorkflowBuilder from "./pages/WorkflowBuilder";
import WorkflowRun from "./pages/WorkflowRun";
// import viteLogo from "/vite.svg";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <WorkflowBuilder /> },
      { path: "run", element: <WorkflowRun /> },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;
