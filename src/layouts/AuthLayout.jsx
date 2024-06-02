/* eslint-disable react/no-unknown-property */
/* eslint-disable react/no-children-prop */

import { Suspense } from "react";
import {
  Await,
  Navigate,
  useLoaderData,
  useLocation,
  useOutlet,
} from "react-router-dom";
import { AuthProvider } from "../hooks/useAuth";
import logo from "../assets/logo.svg";

export const AuthLayout = () => {
  const outlet = useOutlet();
  const location = useLocation();

  const { userPromise } = useLoaderData();

  if (location.pathname === "/") {
    return <Navigate to="/sign-in" />;
  }

  return (
    <Suspense
      fallback={
        <div className="flex h-[100vh] w-full items-center justify-center">
          <img src={logo} alt="logo" className="animate-pulse" />
        </div>
      }
    >
      <Await
        resolve={userPromise}
        children={(user) => (
          <AuthProvider userData={user}>{outlet}</AuthProvider>
        )}
      />
    </Suspense>
  );
};
