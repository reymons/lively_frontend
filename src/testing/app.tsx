import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { MemoryRouter } from "react-router";

export { MemoryRouter as Router, Routes, Route } from "react-router";

type AppProviderProps = {
    children: React.ReactNode;
    queryClient?: QueryClient;
};

export const AppProvider = ({ children, queryClient }: AppProviderProps) => {
    queryClient = useState(() => queryClient ?? new QueryClient())[0];

    return (
        <MemoryRouter>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </MemoryRouter>
    );
};
