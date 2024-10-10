import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

window.queryClient ||= new QueryClient();

export function QueryProvider({ children }: React.PropsWithChildren) {
  if (!window.queryClient) {
    throw new Error("QueryClient is not defined");
  }

  return (
    <QueryClientProvider client={window.queryClient}>
      {children}
    </QueryClientProvider>
  );
}
