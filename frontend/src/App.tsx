import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppRoutes } from "./app-routes";

export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AppRoutes />
    </QueryClientProvider>
  );
}
