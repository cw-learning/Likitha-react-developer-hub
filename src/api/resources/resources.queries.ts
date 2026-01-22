import { useQuery } from "@tanstack/react-query";
import { resourcesApi } from "./resources.api";
import { resourceQueryKeys } from "./resources.keys";
import type { ResourceFilters } from "./resources.types";

export function useAllResources() {
	return useQuery({
		queryKey: resourceQueryKeys.allResources(),
		queryFn: resourcesApi.fetchAllResources,
	});
}

export function useResourceById(resourceId: string) {
	return useQuery({
		queryKey: resourceQueryKeys.resourceById(resourceId),
		queryFn: () => resourcesApi.fetchResourceById(resourceId),
		enabled: Boolean(resourceId),
	});
}

export function useFilteredResources(filters: ResourceFilters) {
	return useQuery({
		queryKey: resourceQueryKeys.filteredResources(filters),
		queryFn: () => resourcesApi.fetchResourcesByFilters(filters),
	});
}
