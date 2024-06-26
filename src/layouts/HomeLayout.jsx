import { Fragment } from "react";
import useAuth from "../hooks/useAuth";
import { Navigate, useOutlet } from "react-router-dom";

export const HomeLayout = () => {
  const { user } = useAuth();
  const outlet = useOutlet();

  if (user?.token) {
    return (
      <Navigate to={user.role === "admin" ? "/overview" : "/tickets"} replace />
    );
  }

  return <Fragment>{outlet}</Fragment>;
};
