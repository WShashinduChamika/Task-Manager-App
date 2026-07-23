/** Strongly typed route path constants — import these instead of hardcoding strings */
export const ROUTES = {
  LOGIN: "/login",
  REGISTER: "/register",
  DASHBOARD: "/",
} as const;

export type RouteKey = keyof typeof ROUTES;
export type RoutePath = (typeof ROUTES)[RouteKey];
