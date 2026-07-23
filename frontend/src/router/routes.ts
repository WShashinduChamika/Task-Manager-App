/** Strongly typed route path constants — import these instead of hardcoding strings */
export const ROUTES = {
  LOGIN: "/",
  REGISTER: "/register",
  DASHBOARD: "/dashboard",
} as const;

export type RouteKey = keyof typeof ROUTES;
export type RoutePath = (typeof ROUTES)[RouteKey];
