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
          <img
            src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=22`}
            alt="logo"
            className="animate-heartBeat"
          />
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
