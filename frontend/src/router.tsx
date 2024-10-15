import { createBrowserRouter } from "react-router-dom";
import Root from "./pages/root";
import Layout from "./layout";
import ErrorFallback from "./components/ErrorFallback";

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <ErrorFallback />,
    children: [
      {
        path: "/",
        element: <Root />,
      },
    ],
  },
]);

export default router;
