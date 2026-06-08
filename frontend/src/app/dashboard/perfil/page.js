'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Perfil from "@/paginas/Perfil/Perfil"; 

const queryClient = new QueryClient();

export default function PerfilPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <Perfil />;
    </QueryClientProvider>
  );
}