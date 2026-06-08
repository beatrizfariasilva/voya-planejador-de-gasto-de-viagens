'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Historico from "@/paginas/Historico/Historico"; 

const queryClient = new QueryClient();

export default function HistoricoPage() {
  return (
  <QueryClientProvider client={queryClient}>
    <Historico />
  </QueryClientProvider>
  );
}