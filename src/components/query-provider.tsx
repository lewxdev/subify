import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// default to `NetworkMode: "always"`, no network calls are currently present
// see: https://tanstack.com/query/v5/docs/framework/react/guides/network-mode
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      networkMode: "always",
    },
    mutations: {
      networkMode: "always",
    },
  },
});

export function QueryProvider({ children }: React.PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
