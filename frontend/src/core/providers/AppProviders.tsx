import { useState } from "react"; // Documented exception: single QueryClient lifecycle
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { AppRouter } from "@router/index";
import { hydrateAuthAction } from "@modules/auth/store/auth.actions";

// Hydrate auth from localStorage on app bootstrap
hydrateAuthAction();

export const AppProviders = () => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: 1,
            staleTime: 5 * 60 * 1000, // 5 min
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-right" richColors theme="dark" />
      <AppRouter />
    </QueryClientProvider>
  );
};

