import { RouterProvider, createBrowserRouter } from "react-router-dom";
import JWTLoginPage from "./pages/jwt/JWTLoginPage";
import HomePage from "./pages/HomePage";
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <JWTLoginPage />,
  },
]);

function App() {
  return (
    <div className="container">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
