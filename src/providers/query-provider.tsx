import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";
import { FIVE_MINUTES_IN_MS, THIRTY_MINUTES_IN_MS } from "../constants/query";

const defaultQueryClientConfig = {
	defaultOptions: {
		queries: {
			staleTime: FIVE_MINUTES_IN_MS,
			gcTime: THIRTY_MINUTES_IN_MS,
			retry: 1,
			refetchOnWindowFocus: false,
		},
	},
};

type QueryProviderProps = {
	children: ReactNode;
};

export function QueryProvider({ children }: QueryProviderProps) {
	const [queryClient] = useState(
		() => new QueryClient(defaultQueryClientConfig),
	);

	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
}
