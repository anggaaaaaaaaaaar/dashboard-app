import { DashboardScreen, LoginScreen, TicketScreen } from "./pages";

export const unprotectedRoute = [
  { path: "/", element: "" },
  { path: "/sign-in", element: LoginScreen },
];

export const protectedRoute = [
  { path: "/overview", element: DashboardScreen },
  { path: "/tickets", element: TicketScreen.List },
];
