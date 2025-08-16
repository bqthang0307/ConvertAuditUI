import { createBrowserRouter } from "react-router-dom";
import ICPPage from "../../pages/ICP";
export const router = createBrowserRouter([
  { path: "/", element: <ICPPage /> }, // later add more routes
]);