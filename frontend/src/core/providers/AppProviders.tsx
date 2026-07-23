import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { AppRouter } from "@router/index";
import { hydrateAuthAction } from "@modules/auth/store/auth.actions";
import { applyThemeToDocument, getInitialTheme } from "@core/hooks/useTheme";

// Hydrate auth and theme from localStorage on app bootstrap
hydrateAuthAction();
applyThemeToDocument(getInitialTheme());

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 min
    },
  },
});

export const AppProviders = () => {
  useEffect(() => {
    applyThemeToDocument(getInitialTheme());
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-right" richColors />
      <AppRouter />
    </QueryClientProvider>
  );
};


