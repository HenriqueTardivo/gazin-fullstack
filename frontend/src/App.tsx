import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppRoutes } from "./app-routes";
import { Toaster } from "./components/ui/toaster";

export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AppRoutes />
      <Toaster />
    </QueryClientProvider>
  );
}
