import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";

const FIVE_MINUTES_IN_MS = 1000 * 60 * 5;
const THIRTY_MINUTES_IN_MS = 1000 * 60 * 30;

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
