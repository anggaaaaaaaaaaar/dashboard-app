import {
  AgentsScreen,
  ArticlesScreen,
  ContactsScreen,
  DashboardScreen,
  IdeasScreen,
  LoginScreen,
  SettingsScreen,
  SubscriptionsScreen,
  TicketScreen,
} from "./pages";

export const unprotectedRoute = [
  { path: "/", element: "" },
  { path: "/sign-in", element: LoginScreen },
];

export const protectedRoute = [
  { path: "/overview", element: DashboardScreen },
  { path: "/tickets", element: TicketScreen.List },
  { path: "/tickets/detail/:id", element: TicketScreen.Detail },
  { path: "/tickets/create", element: TicketScreen.Detail },
  { path: "/ideas", element: IdeasScreen },
  { path: "/contacts", element: ContactsScreen },
  { path: "/agents", element: AgentsScreen },
  { path: "/articles", element: ArticlesScreen },
  { path: "/settings", element: SettingsScreen },
  { path: "/subscription", element: SubscriptionsScreen },
];
