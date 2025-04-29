import "./App.css";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Forgetpassword from "./auth/Forgotpassword";
import Resetpassword from "./auth/Resetpassword";
import VerifyEmail from "./auth/VerifyEmail";
import HeroSection from "./components/HeroSection";
import Mainlayout from "./layout/Mainlayout";
import Profile from "./components/Profile";
import SearchProfile from "./components/SearchProfile";
import RestaurantDetails from "./components/RestaurantDetails";
import Cart from "./components/Cart";
import Restaurant from "./admin/Restaurant";
import Addmenu from "./admin/AddMenu";
import Orders from "./admin/Orders";
import Success from "./components/Success";
import { useUserStore } from "./store/useUserStore";
import { useEffect } from "react";
import Loading from "./components/ui/Loading";
import { useThemeStore } from "./store/useThemeStore";

const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useUserStore();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if (!user?.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }
  return children;
};

const AuthenticatedUser = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useUserStore();
  if (isAuthenticated && user?.isVerified) {
    return <Navigate to="/" replace></Navigate>;
  }
  return children;
};
const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useUserStore();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace></Navigate>;
  }
  if (!user?.admin) {
    return <Navigate to="/" replace></Navigate>;
  }
  return children;
};
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoutes>
        <Mainlayout />
      </ProtectedRoutes>
    ),
    children: [
      {
        path: "/",
        element: <HeroSection />,
      },
      {
        path: "/profile",
        element: <Profile></Profile>,
      },
      {
        path: "/search/:text",
        element: <SearchProfile></SearchProfile>,
      },
      {
        path: "/restaurant/:id",
        element: <RestaurantDetails />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/order/status",
        element: <Success />,
      },
      // admin services start here
      {
        path: "/admin/restaurant",
        element: (
          <AdminRoute>
            <Restaurant></Restaurant>
          </AdminRoute>
        ),
      },
      {
        path: "/admin/menu",
        element: (
          <AdminRoute>
            <Addmenu />
          </AdminRoute>
        ),
      },
      {
        path: "/admin/orders",
        element: (
          <AdminRoute>
            <Orders />
          </AdminRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: (
      <AuthenticatedUser>
        <Login></Login>
      </AuthenticatedUser>
    ),
  },
  {
    path: "/signup",
    element: (
      <AuthenticatedUser>
        <Signup></Signup>
      </AuthenticatedUser>
    ),
  },
  {
    path: "/forgot-password",
    element: (
      <AuthenticatedUser>
        <Forgetpassword></Forgetpassword>
      </AuthenticatedUser>
    ),
  },
  {
    path: "/reset-password",
    element: <Resetpassword></Resetpassword>,
  },
  {
    path: "/verify-email",
    element: <VerifyEmail />,
  },
]);

function App() {
  const initializeTheme = useThemeStore((state: any) => state.initializeTheme);
  const { isCheckingAuth, checkAuthentication } = useUserStore();
  //checking auth everytime when page is load
  useEffect(() => {
    checkAuthentication();
    initializeTheme();
  }, [checkAuthentication]);
  if (isCheckingAuth) return <Loading />;
  return (
    <main>
      <RouterProvider router={appRouter}></RouterProvider>
    </main>
  );
}

export default App;
